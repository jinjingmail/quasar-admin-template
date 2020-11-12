<!--
  增加插槽：
  增加属性：
    tickedExpandAuto: 自动展开ticked的节点
    tickStrategy: 新增
        leaf-and-parent : 叶子跟父节点同时返回
        leaf-else-parent: 如果parent节点子节点全部ticked，只返回parent
    参考 props 定义
-->
<template>
  <q-tree
      ref="tree"
      v-bind="$attrs"
      v-on="$listeners"
      :nodes="nodes"
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
      default: function () {
        return []
      }
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
    tickedExpandAuto: {
      type: Boolean,
      default: true
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
        this.$emit('update:ticked', this.popupTreeTickedWithParentComputed())
      } else if (this.tickStrategy === 'leaf-else-parent') {
        this.$emit('update:ticked', this.popupTreeTickedParentOnlyComputed())
      } else {
        this.$emit('update:ticked', [...this.tickedSync])
      }
    }
  },
  computed: {
    tickStrategyComputed () {
      if (this.tickStrategy === 'leaf-and-parent' || this.tickStrategy === 'leaf-else-parent' || this.tickStrategy === 'parent-only') {
        return 'leaf'
      } else {
        return this.tickStrategy
      }
    }
  },
  methods: {
    calcExpanded () {
      console.log('calcExpanded')
      // if (!this.expanded || this.expanded.length === 0) {
      //  return []
      // }
      // 明确指定了展开项，则不自动展开ticked项
      if (this.expanded && this.expanded.length > 0) {
        return [...this.expanded]
      }
      if (!this.tickedExpandAuto) {
        return []
      }
      // 找到父节点（总共向上找两级）
      const set = new Set()
      for (const key of this.tickedSync) {
        const node = this.findTreeNode(key)
        if (node && node.pid) set.add(node.pid)
      }
      for (const key of set) {
        const node = this.findTreeNode(key)
        if (node && node.pid) set.add(node.pid)
      }
      console.log('calcExpanded:', set)
      return [...set]
    },
    calcTicked () {
      console.log('calcTicked')
      if (!this.ticked || this.ticked.length === 0) {
        return []
      }
      if (this.tickStrategy === 'none') {
        return []
      }
      if (this.tickStrategy === 'leaf-else-parent') {
        // 把子节点给勾上
        const keys = []
        for (const key of this.ticked) {
          const node = this.findTreeNode(key)
          if (node && node.children && node.children.length > 0) {
            this.fillLeaf(keys, node.children)
          } else {
            keys.push(key)
          }
        }
        return keys
      }
      return [...this.ticked]
    },
    fillLeaf (keys, children) {
      if (children && children.length > 0) {
        for (const n of children) {
          if (n.children && n.children.length > 0) {
            this.fillLeaf(keys, n.children)
          } else {
            keys.push(n.id)
          }
        }
      }
    },
    // 如果叶子节点全选中，则同时返回父节点
    popupTreeTickedWithParentComputed () {
      const tickedWithParent = [...this.tickedSync]
      for (const t of this.nodes) {
        if (t.hasChildren) {
          if (this.isAllChildTicked(tickedWithParent, t, t.children)) {
            tickedWithParent.unshift(t.id)
          }
        }
      }
      // return this.treeKeyToLabel(tickedWithParent)
      return tickedWithParent
    },
    // 如果叶子节点全选中，则只返回父节点
    popupTreeTickedParentOnlyComputed () {
      const tickedWithParent = [...this.tickedSync]
      for (const t of this.nodes) {
        if (t.hasChildren) {
          if (this.isAllChildTicked_forParentOnly(tickedWithParent, t, t.children)) {
            tickedWithParent.push(t.id)
          }
        }
      }
      // return this.treeKeyToLabel(tickedWithParent)
      return tickedWithParent
    },
    isAllChildTicked (tickedWithParent, parent, nodes) {
      if (!nodes || nodes.length === 0) {
        return this.tickedContains(parent.id)
      }
      let allTicked = true
      for (const t of nodes) {
        if (t.hasChildren) {
          if (this.isAllChildTicked(tickedWithParent, t, t.children)) {
            tickedWithParent.unshift(t.id)
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
    isAllChildTicked_forParentOnly (tickedWithParent, parent, nodes) {
      if (!nodes || nodes.length === 0) {
        return this.tickedContains(parent.id)
      }
      let allTicked = true
      for (const t of nodes) {
        if (t.hasChildren) {
          if (this.isAllChildTicked_forParentOnly(tickedWithParent, t, t.children)) {
            tickedWithParent.push(t.id)
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
        for (const t of nodes) {
          this.arrayRemove(tickedWithParent, t.id)
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
