<!--
  初值：
  新增插槽：
  新增prop：
      见prop定义
  返回值：
-->
<template>
  <coadmin-input
    :value="computedInputValue"
    ref="input"
    v-on="listenersOfInput"
    v-bind="$attrs"
    :disable="disable"
    :readonly="computedReadonly"
    :no-clear-focus="noClearFocus"
    @input="inputMethod"
  >
    <q-popup-proxy
      ref="popupTree"
    >
      <coadmin-tree
        :class="treeClass"
        :style="treeStyle"
        :disable="disable"
        :readonly="readonly"
        :nodes="nodes"
        :node-key="nodeKey"
        :label-key="labelKey"
        :children-key="childrenKey"
        :selectable="selectable"
        :selected.sync="popupTreeSelected"
        :expanded.sync="popupTreeExpanded"
        :ticked.sync="popupTreeTicked"
        :no-ticked-expand="noTickedExpand"
        :tick-strategy="tickStrategy"
        :filter-key-like="filterKeyLike"
        :filter-key-equal="filterKeyEqual"
        :no-connectors="noConnectors"
        :accordion="accordion"
        :selected-color="selectedColor"
        @ticked-label="labels => popupTreeTickedLabels=labels"
        @selected-label="label => popupTreeSelectedLabel=label"
      >
      </coadmin-tree>
    </q-popup-proxy>

    <!--
    <template v-slot:append v-if="!noIcons">
      <q-icon name="event" />
    </template>
    -->

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>

  </coadmin-input>
</template>

<script>
// import formMixin from './formMixin.js'
export default {
  name: 'CoadminTreeSelect',
  inheritAttrs: false,
  // mixins: [formMixin],
  props: {
    disable: Boolean,
    readonly: Boolean,
    useInput: Boolean,
    noClearFocus: {
      type: Boolean,
      default: true
    },

    treeClass: String,
    treeStyle: {
      type: String,
      default: 'width:350px; max-height:65vh;'
    },
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
    selected: {}, // sync
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
    }
  },
  data () {
    return {
      popupTreeSelected: null,
      popupTreeSelectedLabel: null,
      popupTreeExpanded: [],
      popupTreeTicked: [],
      popupTreeTickedLabels: null
    }
  },
  created () {
    this.popupTreeSelected = this.selectable ? (this.selected ? this.selected : null) : null
    this.popupTreeExpanded = this.expanded
    this.popupTreeTicked = this.ticked

    this.popupTreeSelectedLabel = this.keyToLabel(this.popupTreeSelected)
    this.popupTreeTickedLabels = this.keysToLabels(this.popupTreeTicked)
  },
  watch: {
    selected (newVal) {
      if (this.disable) {
        return
      }
      this.popupTreeSelected = newVal
    },
    ticked (newVal, oldVal) {
      if (this.disable) {
        return
      }
      if ((!newVal || newVal.length === 0) && (oldVal && oldVal.length > 0)) {
        this.popupTreeTicked = []
        this.popupTreeExpanded = []
        this.popupTreeTickedLabels = null
      }
    },
    expanded (newVal) {
      this.popupTreeExpanded = newVal
    },
    popupTreeSelected (val) {
      if (!val) {
        this.popupTreeSelectedLabel = null
      }
      if (this.$listeners['selected-label']) this.$emit('selected-label', this.popupTreeSelectedLabel)
      this.$emit('update:selected', val)
    },
    popupTreeExpanded (newVal, oldVal) {
      this.$emit('update:expanded', newVal)
    },
    popupTreeTicked (newVal, oldVal) {
      if (this.tickStrategy !== 'none') {
        this.$emit('update:ticked', newVal)
        if (this.$listeners['ticked-label']) this.$emit('ticked-label', this.popupTreeTickedLabels)
      }
    }
  },
  computed: {
    computedReadonly () {
      if (!this.useInput || this.readonly) {
        return true
      } else {
        return false
      }
    },
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
            if (!vm.disable) {
              vm.$emit('input', value)
            }
          }
        }
      )
    }
  },
  methods: {
    inputMethod (value) {
      if (!value) {
        this.popupTreeSelected = null
        this.popupTreeTicked = []
        this.popupTreeExpanded = []
        this.popupTreeTickedLabels = null
      }
    },
    keysToLabels (keys) {
      if (!keys || keys.length === 0) {
        return null
      }
      if (!this.labelKey) {
        return null
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
    keyToLabel (key) {
      if (!key) {
        return ''
      }
      if (!this.labelKey) {
        return ''
      }
      const node = this.findTreeNode(key, this.nodes)
      if (node && node[this.labelKey]) {
        return node[this.labelKey]
      }
      return ''
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
<style lang="scss" scoped>
@import './form.scss'
</style>
