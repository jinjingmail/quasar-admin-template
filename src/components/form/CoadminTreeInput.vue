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
    v-on="listeners"
    v-bind="$attrs"
    :disable="disable"
    readonly
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
        :ticked-expand-auto="tickedExpandAuto"
        :ticked.sync="popupTreeTicked"
        :tick-strategy="tickStrategy"
        :filter-key-like="filterKeyLike"
        :filter-key-equal="filterKeyEqual"
        :no-connectors="noConnectors"
        :accordion="accordion"
        :selected-color="selectedColor"
        @ticked-label="labels => popupTreeTickedLabel=labels"
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
  name: 'CoadminTreeInput',
  inheritAttrs: false,
  // mixins: [formMixin],
  props: {
    disable: Boolean,
    readonly: Boolean,

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
      default: 'purple'
    },
    selectable: Boolean,
    selected: {}, // sync
    ticked: Array, // sync
    expanded: Array, // sync
    tickStrategy: {
      type: String,
      default: 'none'
    },
    tickedExpandAuto: {
      type: Boolean,
      default: false
    },
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
      popupTreeTickedLabel: []
    }
  },
  created () {
    this.popupTreeSelected = this.selectable ? (this.selected ? this.selected : null) : null
    this.popupTreeExpanded = this.expanded
    this.popupTreeTicked = this.ticked
  },
  mounted () {
  },
  watch: {
    selected (newVal) {
      this.popupTreeSelected = newVal
    },
    popupTreeSelected (val) {
      this.$emit('update:selected', val)
      if (!val) {
        this.popupTreeSelectedLabel = null
      }
      this.$emit('selected-label', this.popupTreeSelectedLabel)
    },
    ticked (newVal) {
      if (!newVal) {
        this.popupTreeTicked = []
        this.popupTreeExpanded = []
        this.popupTreeTickedLabel = []
      }
    },
    expanded (newVal) {
      this.popupTreeExpanded = newVal
    },
    popupTreeExpanded (newVal, oldVal) {
      this.$emit('update:expanded', newVal)
    },
    popupTreeTicked (newVal, oldVal) {
      if (this.tickStrategy !== 'none') {
        this.$emit('update:ticked', newVal)
      }
    }
  },
  computed: {
    computedInputValue () {
      if (this.selectable) {
        return this.popupTreeSelectedLabel
      } else {
        return this.popupTreeTickedLabel.join(this.labelSeparator)
      }
    },
    listeners: function () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (value) {
            // if (!vm.disable && !vm.readonly) {
            //   vm.$emit('input', value)
            // }
          }
        }
      )
    }
  },
  methods: {
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
