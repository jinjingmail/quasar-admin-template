<!--
  增加插槽：
  增加属性：
    tree-table          启用树表
    tree-children-key   树表children字段，默认'children'
    expand-key          树表展开按钮所在字段
    extand-width        树表展开按钮的宽度
    extand-size         树表展开按钮的大小：xs、sm、md、lg、xl
    extand-flat         树表展开按钮
    expand-style        树表展开按钮style
    expand-icon         树表展开按钮的图标
    expand-icon-fold    树表折叠按钮的图标
    expand-without-label 点击文字不展开树表

    color
    dense
    dark
    flat
    square
    bordered
    table-style
    table-class
    table-header-style
    table-header-class
    card-container-style
    card-container-class
    card-style
    card-class
    title-class

    sticky-header
    sticky-first-column
    sticky-last-column

    loading
    loading-delay       多少ms后开始显示 loading 状态
    loading-spinner     '', 'cycle', 'gears', 'ios', 'ball', 'dots' 【提示：loading-spinner=''，则使用q-table默认loading】
  局限：
    通过下面slot自定义的列，不能作为 expand-key
      slot:body-cell-[name]
    树表不能包含如下的slot
      slot:body slot:body-cell
-->
<template>
  <q-table
    ref="table"
    v-bind="$attrs"
    v-on="listeners"
    class="co-table"
    :class="computedClass"
    :card-class="'custom-table-bg ' + cardClass"
    :color="color"
    :dense="_dense()"
    :style="computedStyle"
    :row-key="rowKey"
    :data="computedTreeTableData"
    :columns="columns"
    :visible-columns="visibleColumns"
    :loading="showLoading"
    :fullscreen="isFullscreen"
    :virtual-scroll="computedVirtualScroll"
    :rows-per-page-options="rowsPerPageOptions"
    :no-data-label="noDataLabel"
    :no-results-label="noResultsLabel"
    :selected-rows-label="selectedRowsLabel"
    :separator="computedSeparator"
    :expanded.sync="treeExpandedKeys"
  >

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <template v-if="treeTable" v-slot:body="props">
      <q-tr :props="props" @click="evt => _treeTableRowClick(evt, props)" :class="$listeners['row-click']?'cursor-pointer':''">
        <q-td v-if="$attrs.selection">
          <q-checkbox :dense="props.dense" v-model="props.selected"/>
        </q-td>

        <template v-for="col in props.cols">
          <template v-if="$scopedSlots['body-cell-' + col.name]">
            <slot :name="'body-cell-' + col.name" v-bind="props"/>
          </template>
          <q-td v-else :key="col.name" :props="props">
            <template v-if="_isExpandColumn(col.name)">
              <span :style="_expandSpaceStyle(props)" style="display:inline-block" />
              <q-btn
                v-if="props.row.__has_child"
                :dense="_dense()"
                padding="none"
                style="margin-top:-3px; margin-right:0px;"
                :style="expandStyle"
                :size="expandSize"
                :flat="expandFlat"
                @click.stop="props.expand = !props.expand"
                :icon="props.expand ? expandIconFold : expandIcon" />
                <span @click.stop="(expandWithoutLabel || !props.row.__has_child)?'':props.expand = !props.expand" :class="(expandWithoutLabel || !props.row.__has_child)?'':'cursor-pointer'">{{col.value}}</span>
            </template>
            <template v-else>
              {{col.value}}
            </template>
          </q-td>
        </template>
      </q-tr>
    </template>

    <!-- loadingSpinner 明确为空或者自定义了slot:loading，则忽略 -->
    <template v-slot:loading v-if="showLoading && loadingSpinner && !$slots['loading']">
      <q-inner-loading showing color="primary" style="z-index:5">
        <q-spinner-gears v-if="loadingSpinner === 'gears'" size="60px" color="primary" />
        <q-spinner-ios   v-else-if="loadingSpinner === 'ios'" size="60px" color="primary" />
        <q-spinner       v-else-if="loadingSpinner === 'cycle'" size="60px" color="primary" />
        <q-spinner-ball  v-else-if="loadingSpinner === 'ball'" size="60px" color="primary" />
        <q-spinner-dots  v-else-if="loadingSpinner === 'dots'" size="60px" color="primary" />
        <q-spinner-gears v-else size="60px" color="primary" />
      </q-inner-loading>
    </template>

  </q-table>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Setting from '@/default-setting'

export default {
  name: 'CoTable',
  inheritAttrs: false,
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    data: {
      type: Array,
      required: true
    },
    columns: Array,
    visibleColumns: Array,

    cardClass: {
      type: String,
      default: ''
    },
    rowsPerPageOptions: {
      type: Array,
      default: () => [0]
    },
    color: {
      type: String,
      default: 'primary'
    },
    dense: {
      type: Boolean,
      default: undefined
    },
    separator: String,
    virtualScroll: Boolean,
    fullscreen: Boolean,
    noDataLabel: {
      type: String,
      default: '无数据'
    },
    noResultsLabel: {
      type: String,
      default: '无结果'
    },
    selectedRowsLabel: {
      type: Function,
      default: (numberOfRows) => numberOfRows + ' 已选'
    },
    stickyHeader: Boolean,
    stickyFirstColumn: Boolean,
    stickyLastColumn: Boolean,

    loading: Boolean,
    loadingSpinner: {
      type: String,
      default: 'gears',
      validator: v => ['', 'cycle', 'gears', 'ios', 'ball', 'dots'].includes(v)
    },
    loadingDelay: {
      type: Number,
      default: 300
    },

    treeTable: Boolean,
    treeChildrenKey: {
      type: String,
      default: 'children'
    },
    expandKey: String,
    expandWidth: {
      type: Number,
      default: 0
    },
    expandSize: {
      type: String,
      default: 'sm',
      validator: val => ['xs', 'sm', 'md', 'lg', 'xl'].includes(val)
    },
    expandFlat: Boolean,
    expandStyle: String,
    expandIcon: {
      type: String,
      default: 'keyboard_arrow_right'
    },
    expandIconFold: {
      type: String,
      default: 'keyboard_arrow_down'
    },
    expandWithoutLabel: Boolean,
    expanded: Array
  },
  data () {
    return {
      isFullscreen: undefined,
      showLoading: false,
      treeExpandedKeys: []
    }
  },
  created () {
    this.showLoading = this.loading
    this.isFullscreen = this.fullscreen
    if (this.expanded && this.expanded.length && this.expanded.length > 0) {
      Object.assign(this.treeExpandedKeys, this.expanded)
    }
    if (!this.columns || this.columns.length === 0) {
      console.error('*** co-table tree-table mode must set columns!!')
    }
  },
  watch: {
    expanded (valNew) {
      if (this.expanded && this.expanded.length && this.expanded.length > 0) {
        this.treeExpandedKeys = [...this.expanded]
      } else {
        this.treeExpandedKeys = []
      }
    },
    loading (valNew) {
      this.showLoading = false
      if (valNew) {
        if (this.loadingDelay <= 0) {
          this.showLoading = this.loading
        } else {
          setTimeout(() => {
            this.showLoading = this.loading
          }, this.loadingDelay)
        }
      }
    }
  },
  computed: {
    ...mapGetters('settings', [
      'tagsView'
    ]),
    computedSeparator () {
      return this.separator
    },
    settingPageClass () {
      if (this.$q.screen.gt.xs) {
        return Setting.pageClass
      } else {
        return Setting.pageClassMobile
      }
    },
    settingTableClass () {
      if (this.$q.screen.gt.xs) {
        return Setting.tableClass
      } else {
        return Setting.tableClassMobile
      }
    },
    settingTableStyle () {
      if (this.$q.screen.gt.xs) {
        return Setting.tableStyle
      } else {
        return Setting.tableStyleMobile
      }
    },
    computedVirtualScroll () {
      let vs = this.virtualScroll
      if (this.stickyHeader) {
        vs = true
      }
      return vs
    },
    computedClass () {
      let cls = this.settingTableClass
      if (this.stickyHeader && this.stickyFirstColumn && this.stickyLastColumn) {
        cls += ' co-table-sticky-header-and-first-last-column'
      } else if (this.stickyHeader && this.stickyFirstColumn) {
        cls += ' co-table-sticky-header-and-first-column'
      } else if (this.stickyHeader && this.stickyLastColumn) {
        cls += ' co-table-sticky-header-and-last-column'
      } else if (this.stickyFirstColumn && this.stickyLastColumn) {
        cls += ' co-table-sticky-first-and-last-column'
      } else if (this.stickyHeader) {
        cls += ' co-table-sticky-header'
      } else if (this.stickyFirstColumn) {
        cls += ' co-table-sticky-first-column'
      } else if (this.stickyLastColumn) {
        cls += ' co-table-sticky-last-column'
      }
      return cls
    },
    computedStyle () {
      let height = 'auto'
      if (this.computedVirtualScroll) {
        if (this.isFullscreen) {
          height = '100vh'
        } else {
          let sub = '- 42px ' //q-page
          if (this.tagsView) {
            sub += '- 40px '
          } else {
            sub += '- 2px '
          }
          // TODO 这段代码需要使用自动计算dom高度的方法来代替
          if (this._contains(this.settingPageClass, ['q-pa-xs', 'q-ma-xs', 'q-py-xs', 'q-my-xs'])) {
            sub += '- 5px '
          } else if (this._contains(this.settingPageClass, ['q-pt-xs', 'q-pb-xs', 'q-mt-xs', 'q-mb-xs'])) {
            sub += '- 2px '
          } else if (this._contains(this.settingPageClass, ['q-pa-sm', 'q-ma-sm', 'q-py-sm', 'q-my-sm'])) {
            sub += '- 13px '
          } else if (this._contains(this.settingPageClass, ['q-pt-sm', 'q-pb-sm', 'q-mt-sm', 'q-mb-sm'])) {
            sub += '- 6px '
          } else if (this._contains(this.settingPageClass, ['q-pa-md', 'q-ma-md', 'q-py-md', 'q-my-md'])) {
            sub += '- 30px '
          } else if (this._contains(this.settingPageClass, ['q-pt-md', 'q-pb-md', 'q-mt-md', 'q-mb-md'])) {
            sub += '- 15px '
          } else if (this._contains(this.settingPageClass, ['q-pa-lg', 'q-ma-lg', 'q-py-lg', 'q-my-lg'])) {
            sub += '- 45px '
          } else if (this._contains(this.settingPageClass, ['q-pt-lg', 'q-pb-lg', 'q-mt-lg', 'q-mb-lg'])) {
            sub += '- 23px '
          } else if (this._contains(this.settingPageClass, ['q-pa-xl', 'q-ma-xl', 'q-py-xl', 'q-my-xl'])) {
            sub += '- 93px '
          } else if (this._contains(this.settingPageClass, ['q-pt-xl', 'q-pb-xl', 'q-mt-xl', 'q-mb-xl'])) {
            sub += '- 47px '
          }
          height = 'calc(100vh ' + sub + ')'
        }
      }
      return 'height:' + height + ';' + this.settingTableStyle
    },
    listeners: function () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          'update:fullscreen': function (value) {
            vm.isFullscreen = value
            vm.$emit('update:fullscreen', value)
          }
        }
      )
    },
    computedTreeTableData () {
      if (!this.treeTable) {
        return this.data
      }
      const deep = 0
      const result = []
      for (const dd of this.data) {
        const d = { ...dd }
        result.push(d)
        const children = d[this.treeChildrenKey]
        d.__deep = deep
        d.__has_child = !!children && !!children.length && children.length > 0
        if (d.__has_child && this.treeExpandedKeys.includes(d[this.rowKey])) {
          this._deepTreeData(result, children, deep + 1)
        }
      }
      return result
    }
  },
  methods: {
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    },
    _calcExpandSizeToWidth () {
      switch (this.expandSize) {
        case 'xs': return 14
        case 'sm': return 18
        case 'md': return 25
        case 'lg': return 35
        case 'xl': return 42
        default: return 18
      }
    },
    _expandSpaceStyle (props) {
      const userWidth = this.expandWidth ? this.expandWidth : 0
      const width = 'width:' + (props.row.__deep * this._calcExpandSizeToWidth() + (props.row.__has_child ? 0 : this._calcExpandSizeToWidth()) + userWidth * props.row.__deep) + 'px;'
      if (props.row.__has_child) {
        return width
      } else {
        return width + this.expandStyle
      }
    },
    /*
     * slot:body-cell-[name] 的列不能作为可扩展按钮位置
     */
    _isExpandColumn (columnName) {
      if (!this.columns || this.columns.length === 0) {
        return false
      }
      /*
       * 因为 这些slot内部实现了 q-td，所以没有办法插入expand按钮
       */
      if (this.$scopedSlots['body-cell']) {
        return false
      }
      if (this.$scopedSlots['body-cell-' + columnName]) {
        return false
      }

      const vColumns = this._visibleColumns()

      if (this.expandKey && vColumns.includes(this.expandKey)) {
        if (this.expandKey === columnName) {
          for (const column of this.columns) {
            // 被选做扩展按钮的列，强制为左对齐，否则看不出树形效果
            if (column.name === this.expandKey && column.align !== 'left') {
              Vue.set(column, 'align', 'left')
            }
          }
          return true
        } else if (!this.$scopedSlots['body-cell-' + this.expandKey]) {
          return false
        }
      }

      for (const column of this.columns) {
        if (vColumns.includes(column.name)) {
          if (column.name === columnName) {
            if (this.$scopedSlots['body-cell-' + column.name]) {
              continue
            }
            // 被选做扩展按钮的列，强制为左对齐，否则看不出树形效果
            if (column.align !== 'left') {
              Vue.set(column, 'align', 'left')
            }
            return true
          } else {
            if (this.$scopedSlots['body-cell-' + column.name]) {
              continue
            }
            return false
          }
        }
      }
      return false
    },
    _visibleColumns () {
      if (this.visibleColumns && this.visibleColumns.length > 0) {
        return this.visibleColumns
      }
      const vcols = []
      if (this.columns && this.columns.length > 0) {
        for (const c of this.columns) {
          if (c.required) {
            vcols.push(c.name)
          }
        }
      }
      return vcols
    },
    _deepTreeData (result, children1, deep) {
      for (const dd of children1) {
        const d = { ...dd }
        result.push(d)
        const children = d[this.treeChildrenKey]
        d.__deep = deep
        d.__has_child = !!children && !!children.length && children.length > 0
        if (d.__has_child && this.treeExpandedKeys.includes(d[this.rowKey])) {
          this._deepTreeData(result, children, deep + 1)
        }
      }
    },
    _contains (string, strArray) {
      return strArray.includes(string)
    },
    _treeTableRowClick (evt, props) {
      if (this.$listeners['row-click']) {
        this.$emit('row-click', evt, props.row, props.rowIndex)
      }
    },

    /**  q-table 自带方法 begin */
    toggleFullscreen () {
      this.$refs.table.toggleFullscreen()
    },
    setFullscreen () {
      this.$refs.table.setFullscreen()
    },
    exitFullscreen () {
      this.$refs.table.exitFullscreen()
    },
    requestServerInteraction (props) {
      this.$refs.table.requestServerInteraction(props)
    },
    setPagination (pagination, forceServerRequest) {
      this.$refs.table.setPagination(pagination, forceServerRequest)
    },
    firstPage () {
      this.$refs.table.firstPage()
    },
    prevPage () {
      this.$refs.table.prevPage()
    },
    nextPage () {
      this.$refs.table.nextPage()
    },
    lastPage () {
      this.$refs.table.lastPage()
    },
    isRowSelected (key) {
      return this.$refs.table.isRowSelected(key)
    },
    clearSelection () {
      this.$refs.table.clearSelection()
    },
    isRowExpanded (key) {
      return this.$refs.table.isRowExpanded(key)
    },
    setExpanded (expended) {
      this.$refs.table.setExpanded(expended)
    },
    sort (col) {
      this.$refs.table.sort(col)
    },
    resetVirtualScroll () {
      this.$refs.table.resetVirtualScroll()
    },
    scrollTo (index) {
      this.$refs.table.scrollTo(index)
    }
    /**  q-table 自带方法 end */
  }
}
</script>
