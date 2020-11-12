<!--
  增加插槽：
  增加属性：
    tickedAutoExpand: 自动展开ticked的节点
    tickStrategy: 新增
        leaf-and-parent : 子节点跟父节点同时返回
        leaf-else-parent: 如果parent节点子节点全部ticked，只取parent，去掉子节点
    参考 props 定义
-->
<template>
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
  >
  </q-tree>
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
    ticked: {
      type: Array,
      default: null
    },
    expanded: {
      type: Array,
      default: null
    },
    tickStrategy: {
      type: String,
      default: 'none' // none strict leaf leaf-filtered leaf-and-parent leaf-else-parent
    },
    tickedAutoExpand: {
      type: Boolean,
      default: false
    },
    keyToLabel: {
      type: String
    }
  },
  data () {
    return {
      tickedSync: [],
      expandedSync: []
    }
  },
  mounted () {
    this.tickedSync = this.calcTicked()
    this.expandedSync = this.calcExpanded()
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
      if (this.tickStrategy === 'leaf-and-parent') {
        this.$emit('update:ticked', this.queryTickedLeafAndParent())
      } else if (this.tickStrategy === 'leaf-else-parent') {
        this.$emit('update:ticked', this.queryTickedLeafElseParent())
      } else {
        this.$emit('update:ticked', [...this.tickedSync])
      }
    }
  },
  computed: {
    tickStrategyComputed () {
      if (this.tickStrategy === 'leaf-and-parent' || this.tickStrategy === 'leaf-else-parent') {
        return 'leaf-filtered'
      } else {
        return this.tickStrategy
      }
    }
  },
  methods: {
    calcExpanded () {
      if (!this.tickedAutoExpand) {
        return []
      }
      // 指定了展开项，则不自动展开ticked项
      if (this.expanded && this.expanded.length > 0) {
        return [...this.expanded]
      }
      // 找到父节点（总共向上找3级）
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
      if (this.tickStrategy === 'leaf-else-parent') {
        // 把子节点给勾上
        const keys = new Set()
        for (const key of this.ticked) {
          const node = this.findTreeNode(key)
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
      if (children && children.length > 0) {
        for (const n of children) {
          if (this.hasChildren(n)) {
            this.fillLeaf(keys, n[this.childrenKey])
          } else {
            keys.add(n[this.nodeKey])
          }
        }
      }
    },
    // 如果子节点全选中，则增加父节点
    queryTickedLeafAndParent () {
      const keys = [...this.tickedSync]
      for (const t of this.nodes) {
        if (this.hasChildren(t)) {
          if (this.isAllChildTicked(keys, t, t[this.childrenKey])) {
            keys.unshift(t[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    hasChildren (node) {
      if (node && node[this.childrenKey] && node[this.childrenKey].length > 0) {
        return true
      } else {
        return false
      }
    },
    // 如果子节点全选中，则增加父节点，去掉子节点
    queryTickedLeafElseParent () {
      const keys = [...this.tickedSync]
      for (const t of this.nodes) {
        if (this.hasChildren(t)) {
          if (this.isAllChildTicked_parentOnly(keys, t, t[this.childrenKey])) {
            keys.push(t[this.nodeKey])
          }
        }
      }
      return [...new Set(keys)]
    },
    isAllChildTicked (keys, parent, children) {
      let allTicked = true
      for (const t of children) {
        if (this.hasChildren(t)) {
          if (this.isAllChildTicked(keys, t, t.children)) {
            keys.unshift(t.id)
          } else {
            allTicked = false
          }
        } else {
          if (allTicked) {
            if (!this.tickedContains(t.id)) {
              allTicked = false
            }
          }
        }
      }
      return allTicked
    },
    isAllChildTicked_parentOnly (keys, parent, children) {
      let allTicked = true
      for (const t of children) {
        if (this.hasChildren(t)) {
          if (this.isAllChildTicked_parentOnly(keys, t, t.children)) {
            keys.push(t.id)
          } else {
            allTicked = false
          }
        } else {
          if (allTicked) {
            if (!this.tickedContains(t.id)) {
              allTicked = false
            }
          }
        }
      }
      if (allTicked) {
        for (const t of children) {
          this.arrayRemove(keys, t.id)
        }
      }
      return allTicked
    },
    arrayRemove (array, val) {
      if (array && array.length > 0 && val !== undefined) {
        const idx = array.indexOf(val)
        if (idx !== -1) {
          array.splice(idx, 1)
        }
      }
    },
    tickedContains (key) {
      if (this.tickedSync && this.tickedSync.length > 0) {
        return this.tickedSync.includes(key)
      } else {
        return false
      }
    },
    findParentNode (key, parent, children) {
      for (const t of children) {
        if (t.id === key) {
          return parent
        }
        if (t.hasChildren) {
          const node = this.findParentNode(key, t, t.children)
          if (node != null) {
            return node
          }
        }
      }
      return null
    },
    findTreeNode (key) {
      if (this.nodes) {
        for (const node of this.nodes) {
          if (node.id === key) {
            return node
          } else if (node.hasChildren) {
            const node2 = this.findTreeNode2(key, node.children)
            if (node2) {
              return node2
            }
          }
        }
      }
      return null
    },
    findTreeNode2 (key, nodeList) {
      for (const node of nodeList) {
        if (node.id === key) {
          return node
        } else if (node.hasChildren) {
          const node2 = this.findTreeNode2(key, node.children)
          if (node2) {
            return node2
          }
        }
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
