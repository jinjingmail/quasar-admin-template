<!--
  增加插槽：
    toolbar:         过滤界面
  增加属性：
    no-filter：     是否显示过滤输入框
    no-expand-btn： 是否显示展开按钮
    expand-btn-icon-more 展开按钮图标
    expand-btn-icon-less 展开按钮图标
    filter-key-like   过滤条件相似比较
    filter-key-equal  过滤条件等于比较
    filter-placeholder
    ticked-expand-auto: 自动展开ticked的节点
    tick-strategy:
        原有：
        none strict leaf leaf-filtered
        新增：
        leaf-any-with-parent : 子节点大于0个ticked，则增加父节点
        leaf-all-with-parent : 子节点全部ticked，则增加父节点
        leaf-all-only-parent : 子节点全部ticked，则只取父节点，去掉子节点
  增加事件：
    @ticked-label -> function(labels)：以label数组的形式输出ticked的数据
-->
<template>
  <q-card flat>
    <slot name="toolbar">
      <q-toolbar v-if="!noFilter || !noExpandBtn">
        <div class="row full-width">
          <q-input v-if="!noFilter"
            ref="filter"
            dense
            v-model="filterInput"
            :placeholder="filterPlaceholder"
            class="col-8"
          >
            <template v-slot:append>
              <q-icon v-if="filterInput !== ''" name="clear" class="cursor-pointer" @click="filterReset" />
            </template>
          </q-input>

          <q-space/>

          <q-btn v-if="!noExpandBtn"
            class="col-auto"
            dense
            :icon="filterExpanded?expandBtnIconMore:expandBtnIconLess"
            @click="(filterExpanded = !filterExpanded)?$refs.tree.collapseAll():$refs.tree.expandAll()"
          />
        </div>
      </q-toolbar>
    </slot>
    <q-tree
        ref="tree"
        v-bind="$attrs"
        v-on="$listeners"
        :nodes="nodes"
        :node-key="nodeKey"
        :label-key="labelKey"
        :children-key="childrenKey"
        :expanded.sync="expandedSync"
        :ticked.sync="tickedSync"
        :tick-strategy="tickStrategyComputed"
        :no-nodes-label="noNodesLabel"
        :no-results-label="noResultsLabel"
        :filter="filterComputed"
        :filter-method="filterMethodComputed"
    >
      <template v-if="$scopedSlots['default-header']" v-slot:default-header="prop">
        <slot name="default-header" v-bind="prop"/>
      </template>
      <template v-if="$scopedSlots['default-body']" v-slot:default-body="prop">
        <slot name="default-body" v-bind="prop"/>
      </template>
      <template v-slot:[slotName]="prop" v-for="slotName in computedDynamicSlotNames">
        <slot :name="slotName" v-bind="prop"/>
      </template>
    </q-tree>
  </q-card>
</template>

<script>
export default {
  name: 'CoadminTree',
  inheritAttrs: false,
  props: {
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
    childrenKey: {
      type: String,
      default: 'children'
    },
    ticked: Array, // sync
    expanded: Array, // sync
    tickStrategy: {
      type: String,
      default: 'none',
      validator: v => ['none', 'strict', 'leaf', 'leaf-filtered', 'leaf-all-with-parent', 'leaf-all-only-parent', 'leaf-any-with-parent'].includes(v)
    },
    tickedExpandAuto: {
      type: Boolean,
      default: false
    },
    filter: {
      type: String
    },
    filterMethod: { // (node, filter) => Boolean
      type: Function
    },
    filterKeyLike: {
      type: String,
      default: null
    },
    filterKeyEqual: {
      type: String,
      default: null
    },
    filterPlaceholder: {
      type: String,
      default: 'Filter...'
    },
    noFilter: {
      type: Boolean,
      default: false
    },
    expandBtnIconMore: {
      type: String,
      default: 'unfold_more'
    },
    expandBtnIconLess: {
      type: String,
      default: 'unfold_less'
    },
    noExpandBtn: {
      type: Boolean,
      default: false
    },
    noNodesLabel: {
      type: String,
      default: '无数据'
    },
    noResultsLabel: {
      type: String,
      default: '无数据'
    }
  },
  data () {
    return {
      tickedSync: [],
      expandedSync: [],
      filterInput: '',
      filterExpanded: true,
      dynamicSlotNameHeaders: [],
      dynamicSlotNameBodys: []
    }
  },
  mounted () {
    this.tickedSync = this.calcTicked()
    this.expandedSync = this.calcExpanded()
    console.log('$slots=', this.$scopedSlots)
  },
  created () {
  },
  watch: {
    expandedSync (val) {
      if (!this.expanded) {
        return
      }
      this.$emit('update:expanded', [...this.expandedSync])
    },
    tickedSync (val) {
      if (!this.ticked) {
        return
      }
      if (this.tickStrategy === 'leaf-all-with-parent') {
        const tickedKeys = this.queryTickedLeafAllWithParent()
        this.$emit('update:ticked', tickedKeys)
        this.$emit('ticked-label', this.keysToLabels(tickedKeys))
      } else
      if (this.tickStrategy === 'leaf-all-only-parent') {
        const tickedKeys = this.queryTickedLeafAllOnlyParent()
        this.$emit('update:ticked', tickedKeys)
        this.$emit('ticked-label', this.keysToLabels(tickedKeys))
      } else
      if (this.tickStrategy === 'leaf-any-with-parent') {
        const tickedKeys = this.queryTickedLeafAnyWithParent()
        this.$emit('update:ticked', tickedKeys)
        this.$emit('ticked-label', this.keysToLabels(tickedKeys))
      } else {
        this.$emit('update:ticked', [...this.tickedSync])
        this.$emit('ticked-label', this.keysToLabels(this.tickedSync))
      }
    }
  },
  computed: {
    computedDynamicSlotNames () {
      const names = new Set()
      for (const key in this.$scopedSlots) {
        if (key.includes('header-') || key.includes('body-')) names.add(key)
      }
      console.log('names=', names)
      return names
    },
    tickStrategyComputed () {
      if (this.tickStrategy === 'leaf-all-only-parent' || this.tickStrategy === 'leaf-any-with-parent' || this.tickStrategy === 'leaf-all-with-parent') {
        return 'leaf-filtered'
      } else {
        return this.tickStrategy
      }
    },
    filterComputed () {
      if (this.filter) {
        return this.filter
      } else {
        return this.filterInput
      }
    },
    filterMethodComputed () {
      if (this.filterMethod) {
        return this.filterMethod
      } else {
        return this.filterMethodDefault
      }
    }
  },
  methods: {
    filterReset () {
      if (this.noFilter) {
        return
      }
      this.filterInput = ''
      this.$refs.filter.focus()
    },
    filterMethodDefault (node, filter) {
      if (!node) {
        return false
      }
      const filt = filter.toLowerCase()
      let second = false
      if (this.filterKeyLike) {
        second = node[this.filterKeyLike] && (node[this.filterKeyLike].toString().toLowerCase().indexOf(filt) > -1)
      }
      let third = false
      if (this.filterKeyEqual) {
        third = node[this.filterKeyEqual] && (node[this.filterKeyEqual].toString() === filt)
      }
      return (node[this.labelKey] && node[this.labelKey].toLowerCase().indexOf(filt) > -1) || second || third
    },
    keysToLabels (keys) {
      if (!this.labelKey) {
        return []
      }
      const labels = []
      keys.forEach(key => {
        const node = this.findTreeNode(key, this.nodes)
        if (node && node[this.labelKey]) {
          labels.push(node[this.labelKey])
        }
      })
      return labels
    },
    calcExpanded () {
      if (!this.tickedExpandAuto) {
        return []
      }
      // 指定了展开项，则不自动展开ticked项
      if (this.expanded && this.expanded.length > 0) {
        return [...this.expanded]
      }
      // 找到父节点（总共向上找3级） TODO 改为递归
      const set = new Set()
      for (const key of this.tickedSync) {
        const node = this.findParentNode(key, null, this.nodes)
        if (node && node[this.nodeKey]) set.add(node[this.nodeKey])
      }
      for (const key of set) {
        const node = this.findParentNode(key, null, this.nodes)
        if (node && node[this.nodeKey]) set.add(node[this.nodeKey])
      }
      for (const key of set) {
        const node = this.findParentNode(key, null, this.nodes)
        if (node && node[this.nodeKey]) set.add(node[this.nodeKey])
      }
      return [...set]
    },
    calcTicked () {
      if (!this.ticked || this.ticked.length === 0) {
        return []
      }
      if (this.tickStrategy === 'none') {
        return []
      }
      if (this.tickStrategy === 'leaf-all-only-parent') {
        // 把子节点给勾上
        const keys = new Set()
        for (const key of this.ticked) {
          const node = this.findTreeNode(key, this.nodes)
          if (this.hasChildren(node)) {
            this.fillLeaf(keys, node[this.childrenKey])
          } else {
            keys.add(key)
          }
        }
        return [...keys]
      }
      return [...this.ticked]
    },
    fillLeaf (keys, children) {
      for (const child of children) {
        if (this.hasChildren(child)) {
          this.fillLeaf(keys, child[this.childrenKey])
        } else {
          keys.add(child[this.nodeKey])
        }
      }
    },
    // 如果子节点选中大于0个，则增加父节点
    queryTickedLeafAnyWithParent () {
      if (!this.tickedSync || this.tickedSync.length === 0) {
        return []
      }
      const keys = [...this.tickedSync]
      for (const node of this.nodes) {
        if (this.hasChildren(node)) {
          if (this.isAnyChildTicked(keys, node[this.childrenKey])) {
            keys.unshift(node[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    // 如果子节点全选中，则增加父节点
    queryTickedLeafAllWithParent () {
      if (!this.tickedSync || this.tickedSync.length === 0) {
        return []
      }
      const keys = [...this.tickedSync]
      for (const node of this.nodes) {
        if (this.hasChildren(node)) {
          if (this.isAllChildTicked(keys, node[this.childrenKey])) {
            keys.unshift(node[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    // 如果子节点全选中，则增加父节点，去掉子节点
    queryTickedLeafAllOnlyParent () {
      if (!this.tickedSync || this.tickedSync.length === 0) {
        return []
      }
      const keys = [...this.tickedSync]
      for (const node of this.nodes) {
        if (this.hasChildren(node)) {
          if (this.isAllChildTicked_OnlyParent(keys, node[this.childrenKey])) {
            keys.push(node[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    isAnyChildTicked (keys, children) {
      let anyTicked = false
      for (const child of children) {
        if (this.hasChildren(child)) {
          if (this.isAnyChildTicked(keys, child[this.childrenKey])) {
            keys.unshift(child[this.nodeKey])
            anyTicked = true
          }
        } else {
          if (!anyTicked) {
            if (this.arrayContains(this.tickedSync, child[this.nodeKey])) {
              anyTicked = true
            }
          }
        }
      }
      return anyTicked
    },
    isAllChildTicked (keys, children) {
      let allTicked = true
      for (const child of children) {
        if (this.hasChildren(child)) {
          if (this.isAllChildTicked(keys, child[this.childrenKey])) {
            keys.unshift(child[this.nodeKey])
          } else {
            allTicked = false
          }
        } else {
          if (allTicked) {
            if (!this.arrayContains(this.tickedSync, child[this.nodeKey])) {
              allTicked = false
            }
          }
        }
      }
      return allTicked
    },
    isAllChildTicked_OnlyParent (keys, children) {
      let allTicked = true
      for (const child of children) {
        if (this.hasChildren(child)) {
          if (this.isAllChildTicked_OnlyParent(keys, child[this.childrenKey])) {
            keys.push(child[this.nodeKey])
          } else {
            allTicked = false
          }
        } else {
          if (allTicked) {
            if (!this.arrayContains(this.tickedSync, child[this.nodeKey])) {
              allTicked = false
            }
          }
        }
      }
      if (allTicked) {
        for (const child of children) {
          this.arrayRemove(keys, child[this.nodeKey])
        }
      }
      return allTicked
    },
    findParentNode (key, parent, children) {
      for (const child of children) {
        if (child[this.nodeKey] === key) {
          return parent
        }
        if (this.hasChildren(child)) {
          const node = this.findParentNode(key, child, child[this.childrenKey])
          if (node != null) {
            return node
          }
        }
      }
      return null
    },
    findTreeNode (key, nodes) {
      if (this.nodes) {
        for (const node of nodes) {
          if (node[this.nodeKey] === key) {
            return node
          } else if (this.hasChildren(node)) {
            const node2 = this.findTreeNode2(key, node[this.childrenKey])
            if (node2) {
              return node2
            }
          }
        }
      }
      return null
    },
    findTreeNode2 (key, nodes) {
      for (const node of nodes) {
        if (node[this.nodeKey] === key) {
          return node
        } else if (this.hasChildren(node)) {
          const node2 = this.findTreeNode2(key, node[this.childrenKey])
          if (node2) {
            return node2
          }
        }
      }
    },
    hasChildren (node) {
      if (node && node[this.childrenKey] && node[this.childrenKey].length > 0) {
        return true
      } else {
        return false
      }
    },
    arrayRemove (array, val) {
      if (array && array.length > 0 && val !== undefined) {
        const idx = array.indexOf(val)
        if (idx !== -1) {
          array.splice(idx, 1)
        }
      }
    },
    arrayContains (array, key) {
      if (array && array.length > 0) {
        return array.includes(key)
      } else {
        return false
      }
    },

    getNodeByKey (key) {
      return this.$refs.tree.getNodeByKey(key)
    },
    getTickedNodes () {
      return this.$refs.tree.getTickedNodes()
    },
    getExpandedNodes () {
      return this.$refs.tree.getExpandedNodes()
    },
    isExpanded (key) {
      return this.$refs.tree.isExpanded(key)
    },
    expandAll () {
      this.$refs.tree.expandAll()
    },
    collapseAll () {
      this.$refs.tree.collapseAll()
    },
    setExpanded (key, state) {
      this.$refs.tree.setExpanded(key, state)
    },
    isTicked (key) {
      return this.$refs.tree.isTicked(key)
    },
    setTicked (key, state) {
      this.$refs.tree.setTicked(key, state)
    }
  }
}
</script>
