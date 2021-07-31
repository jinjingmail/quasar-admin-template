<!--
  初值：
  新增插槽：
  新增prop：
      见prop定义
  返回值：
-->
<template>
  <co-input
    ref="input"
    v-on="listenersOfInput"
    v-bind="$attrs"
    :value="computedInputValue"
    :readonly="readonly"
    :disable="disable"
    :no-clear-focus="noClearFocus"
    @clear="_clearInput"
  >
    <q-popup-proxy
      ref="popupTree"
    >
      <co-tree
        :class="treeClass"
        :style="treeStyle"
        :disable="disable"
        :readonly="readonly"
        :nodes="nodes"
        :node-key="nodeKey"
        :label-key="labelKey"
        :children-key="childrenKey"
        :selectable="selectable"
        :selected="popupTreeSelected"
        :expanded="popupTreeExpanded"
        :ticked="popupTreeTicked"
        :no-ticked-expand="noTickedExpand"
        :tick-strategy="tickStrategy"
        :filter-key-like="filterKeyLike"
        :filter-key-equal="filterKeyEqual"
        :filter-placeholder="filterPlaceholder"
        :no-connectors="noConnectors"
        :accordion="accordion"
        :selected-color="selectedColor"
        @ticked-label="_popupTickedLabel"
        @selected-label="_popupSelectedLabel"
        @update:selected="selectedKey => _updateSelected(selectedKey)"
        @update:ticked="tickedNodeKeys => _updateTicked(tickedNodeKeys)"
        @update:expanded="nodeKeys => _updateExpanded(nodeKeys)"
      >
      </co-tree>
    </q-popup-proxy>

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>

  </co-input>
</template>

<script>
export default {
  name: 'CoTreeSelect',
  inheritAttrs: false,
  props: {
    disable: Boolean,
    readonly: Boolean,
    noClearFocus: {
      type: Boolean,
      default: true
    },

    treeClass: String,
    treeStyle: String,
    nodes: {
      type: Array,
      required: true
    },
    nodeKey: {
      type: String,
      required: true
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    labelSeparator: {
      type: String,
      default: ', '
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    noConnectors: {
      type: Boolean,
      default: true
    },
    accordion: Boolean,
    selectedColor: {
      type: String,
      default: 'primary'
    },
    selectable: Boolean, // 是否可以使用 selected.sync 属性
    selected: {
      type: [Number, String],
      default: null
    }, // sync
    ticked: Array, // sync
    expanded: Array, // sync
    tickStrategy: {
      type: String,
      default: 'none'
    },
    noTickedExpand: Boolean,
    filterKeyLike: {
      type: String,
      default: null
    },
    filterKeyEqual: {
      type: String,
      default: null
    },
    filterPlaceholder: String
  },
  data () {
    return {
      popupTreeSelected: null,
      popupTreeExpanded: [],
      popupTreeTicked: [],

      popupTreeSelectedLabel: null,
      popupTreeTickedLabels: null
    }
  },
  created () {
    this.popupTreeSelected = this.selectable ? (this.selected ? this.selected : null) : null
    this.popupTreeExpanded = this.expanded
    this.popupTreeTicked = this.ticked
  },
  mounted () {
    /*
     * 调用 popupTree.show() 触发一次事件发送
     */
    console.log('tree-select.selected=' + this.selected + ', this.computedInputValue=' + this.computedInputValue)
    if ((this.selectable && this.selected != null) || (Array.isArray(this.ticked) && this.ticked.length > 0)) {
      this.$refs.popupTree.show()
      this.$nextTick(() => {
        this.$refs.popupTree.hide()
      })
    }
  },
  watch: {
    selected: {
      immediate: false,
      handler (newVal, oldVal) {
        if (!this.disable) {
          this.popupTreeSelected = newVal
        }
      }
    },
    ticked: {
      immediate: false,
      handler (newVal, oldVal) {
        if (!this.disable) {
          this.popupTreeTicked = newVal
        }
      }
    },
    expanded (newVal) {
      this.popupTreeExpanded = newVal
    }
  },
  computed: {
    computedInputValue () {
      if (this.selectable) {
        return this.popupTreeSelectedLabel
      } else {
        if (this.popupTreeTickedLabels) {
          return this.popupTreeTickedLabels.join(this.labelSeparator)
        }
        return ''
      }
    },
    listenersOfInput: function () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (value) {
          }
        }
      )
    }
  },
  methods: {
    _popupTickedLabel(labels) {
      this.popupTreeTickedLabels = labels
      this.$emit('ticked-label', labels)
    },
    _popupSelectedLabel(label) {
      this.popupTreeSelectedLabel = label
      this.$emit('selected-label', label)
    },
    _updateSelected (nodeKey) {
      this.$emit('update:selected', nodeKey)
    },
    _updateExpanded (nodeKeys) {
      this.$emit('update:expanded', nodeKeys)
    },
    _updateTicked (nodeKeys) {
      if (this.disable) {
        console.warn('disabled=true donot sent update:ticked')
        return
      }
      this.$emit('update:ticked', nodeKeys)
    },
    _clearInput () {
      this.popupTreeTickedLabels = ''
      this.popupTreeSelectedLabel = ''
      this.popupTreeSelected = null
      this.popupTreeTicked = []
      this.popupTreeExpanded = []
      if (this.selectable) {
        this.$emit('update:selected', null)
      } else {
        this.$emit('update:ticked', [])
      }
    },

    resetValidation () {
      this.$refs.input.resetValidation()
    },
    validate (value) {
      return this.$refs.input.validate(value)
    },
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    },
    select () {
      this.$refs.input.select()
    }
  }
}
</script>
