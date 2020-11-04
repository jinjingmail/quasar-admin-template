function cssPath (el) {
  if (!(el instanceof Element)) {
    return
  }
  var path = []
  while (el.nodeType === Node.ELEMENT_NODE) {
    var selector = el.nodeName.toLowerCase()
    if (el.id) {
      selector += '#' + el.id
      path.unshift(selector)
      break
    } else {
      var sib = el, nth = 1
      sib = sib.previousElementSibling
      while (sib) {
        if (sib.nodeName.toLowerCase() === selector) {
          nth++
        }
        sib = sib.previousElementSibling
      }
      if (nth !== 1) {
        selector += ':nth-of-type(' + nth + ')'
      }
    }
    path.unshift(selector)
    el = el.parentNode
  }
  return path.join(' > ')
}

/*
https://stackoverflow.com/questions/3620116/get-css-path-from-dom-element
Doing a reverse CSS selector lookup is an inherently tricky thing. I've generally come across two types of solutions:

Go up the DOM tree to assemble the selector string out of a combination of element names, classes, and the id or name attribute. The problem with this method is that it can result in selectors that return multiple elements, which won't cut it if we require them to select only one unique element.

Assemble the selector string using nth-child() or nth-of-type(), which can result in very long selectors. In most cases the longer a selector is the higher specificity it has, and the higher the specificity the more likely it will break when the DOM structure changes.

The solution below is an attempt at tackling both of these issues. It is a hybrid approach that outputs a unique CSS selector (i.e., document.querySelectorAll(getUniqueSelector(el)) should always return a one-item array). While the returned selector string is not necessarily the shortest, it is derived with an eye towards CSS selector efficiency while balancing specificity by prioritizing nth-of-type() and nth-child() last.

You can specify what attributes to incorporate into the selector by updating the aAttr array. The minimum browser requirement is IE 9.
*/
function getUniqueSelector (elSrc) {
  if (!(elSrc instanceof Element)) return
  var sSel,
    aAttr = ['name', 'value', 'title', 'placeholder', 'data-*'], // Common attributes
    aSel = [],
    // Derive selector from element
    getSelector = function (el) {
      // 1. Check ID first
      // NOTE: ID must be unique amongst all IDs in an HTML5 document.
      // https://www.w3.org/TR/html5/dom.html#the-id-attribute
      if (el.id) {
        aSel.unshift('#' + el.id)
        return true
      }
      aSel.unshift(sSel = el.nodeName.toLowerCase())
      // 2. Try to select by classes
      if (el.className) {
        aSel[0] = sSel += '.' + el.className.trim().replace(/ +/g, '.')
        if (uniqueQuery()) return true
      }
      // 3. Try to select by classes + attributes
      for (var i = 0; i < aAttr.length; ++i) {
        if (aAttr[i] === 'data-*') {
          // Build array of data attributes
          var aDataAttr = [].filter.call(el.attributes, function (attr) {
            return attr.name.indexOf('data-') === 0
          })
          for (var j = 0; j < aDataAttr.length; ++j) {
            aSel[0] = sSel += '[' + aDataAttr[j].name + '="' + aDataAttr[j].value + '"]'
            if (uniqueQuery()) return true
          }
        } else if (el[aAttr[i]]) {
          aSel[0] = sSel += '[' + aAttr[i] + '="' + el[aAttr[i]] + '"]'
          if (uniqueQuery()) return true
        }
      }
      // 4. Try to select by nth-of-type() as a fallback for generic elements
      var elChild = el
      // sChild,
      var n = 1
      elChild = elChild.previousElementSibling
      while (elChild) {
        if (elChild.nodeName === el.nodeName) {
          ++n
        }
        elChild = elChild.previousElementSibling
      }
      aSel[0] = sSel += ':nth-of-type(' + n + ')'
      if (uniqueQuery()) return true
      // 5. Try to select by nth-child() as a last resort
      elChild = el
      n = 1
      elChild = elChild.previousElementSibling
      while (elChild) {
        ++n
        elChild = elChild.previousElementSibling
      }
      aSel[0] = sSel = sSel.replace(/:nth-of-type\(\d+\)/, n > 1 ? ':nth-child(' + n + ')' : ':first-child')
      if (uniqueQuery()) return true
      return false
    },
    // Test query to see if it returns one element
    uniqueQuery = function () {
      return document.querySelectorAll(aSel.join('>') || null).length === 1
    }
  // Walk up the DOM tree to compile a unique selector
  while (elSrc.parentNode) {
    if (getSelector(elSrc)) return aSel.join(' > ')
    elSrc = elSrc.parentNode
  }
}

/*
 * 20201103 修改自github项目 Vue-DragDrag
 */
export default {
  inserted: function (el, binding) {
    console.log('drag.el=', el)
    console.log('drag.binding=', binding)
    console.log('cssPath=' + cssPath(el))
    console.log('cssPath2=' + getUniqueSelector(el))
    // 拖拽时的手势
    el.style.cursor = binding.value && binding.value.cursor ? binding.value.cursor : 'default'

    // 如果拖动元素非元素本身（el），传入id
    var cssPa = cssPath(el)
    var moveEl = binding.value && binding.value.selectorTrim ? (document.querySelector(cssPa.substring(0, cssPa.length - binding.value.selectorTrim.length))) : el
    moveEl = binding.value && binding.value.moveElId ? document.getElementById(binding.value.moveElId) : moveEl
    // 为拖动元素添加绝对定位
    moveEl.style.position = 'absolute'

    // 如果容器为设置position属性，默认为 position = 'relative'
    if (getComputedStyle(moveEl.parentNode, null).position === 'static') {
      moveEl.parentNode.style.position = 'relative'
    }

    var mouseDownFn = function (e) {
      // .shaow---------- 复制节点，并且插入容器中原来位置
      if (binding.modifiers.shaow) {
        var newNode = moveEl.cloneNode(true)
        moveEl.style.opacity = '0.5'
        moveEl.parentNode.appendChild(newNode)
      }
      // ----------

      var disX, disY
      if (!binding.modifiers.dragY) disX = (e.touches ? e.touches[0].clientX : e.clientX) - moveEl.offsetLeft
      if (!binding.modifiers.dragX) disY = (e.touches ? e.touches[0].clientY : e.clientY) - moveEl.offsetTop
      var mouseMoveFn = function (e) {
        if (!e.touches) {
          e.preventDefault()
        }
        var left = (e.touches ? e.touches[0].clientX : e.clientX) - disX
        var top = (e.touches ? e.touches[0].clientY : e.clientY) - disY

        // 可以拖出去的元素的剩余宽度
        // dragOutX
        var limitWidth = binding.value && binding.value.dragOutX ? moveEl.offsetWidth - binding.value.dragOutX : 0
        // dragOutY
        var limitHeigth = 0
        var limitHeigthTop = 0
        if (binding.value && binding.value.dragOutY) {
          limitHeigth = moveEl.offsetHeight - binding.value.dragOutY
          // 防止可拖拽区域被拖出容器区域
          // 拖拽元素在顶部
          limitHeigthTop = el.offsetHeight - binding.value.dragOutY
        }

        if (left < 0 - limitWidth) {
          left = 0 - limitWidth
        } else if (left > moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth) {
          left = moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth
        }

        if (top < 0 - limitHeigthTop) {
          top = 0 - limitHeigthTop
        } else if (top > moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth) {
          top = moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth
        }
        moveEl.style.left = left + 'px'
        moveEl.style.top = top + 'px'

        // 拖拽事件
        if (binding.value && binding.value.ondrag) {
          if (typeof binding.value.ondrag !== 'function') { // throw 'ondrag: should be a function'
            console.log('ondrag: should be a function')
            return
          }
          binding.value.ondrag(e, { left: left, top: top })
        }
      }
      // mousemove
      if (e.touches) {
        document.addEventListener('touchmove', mouseMoveFn)
      } else {
        document.addEventListener('mousemove', mouseMoveFn)
      }

      var mouseUpFn = function () {
        // 移除临时shaow节点
        if (newNode) {
          moveEl.style.opacity = '1'
          newNode.parentNode.removeChild(newNode)
        }
        document.removeEventListener('touchend', mouseUpFn)
        document.removeEventListener('touchmove', mouseMoveFn)
        document.removeEventListener('mousemove', mouseMoveFn)
        document.removeEventListener('mouseup', mouseUpFn)
      }
      //  mouseup
      if (e.touches) {
        document.addEventListener('touchend', mouseUpFn)
      } else {
        document.addEventListener('mouseup', mouseUpFn)
      }
    }

    // mousedown
    el.addEventListener('touchstart', mouseDownFn)
    el.addEventListener('mousedown', mouseDownFn)
  }
}
