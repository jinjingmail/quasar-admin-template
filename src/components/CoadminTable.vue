<!--
  增加插槽：
  增加属性：
    sticky-header
    sticky-first-column
    sticky-last-column
    loading-delay        多少ms后开始显示 loading 状态
    loading-spinner      '', 'cycle', 'gears', 'ios', 'ball', 'dots' 【提示：loading-spinner=''，则使用q-table默认loading】
-->
<template>
  <q-table
    ref="table"
    class="coadmin-table"
    :class="computedClass"
    card-class="custom-table-bg"
    :style="computedStyle"
    v-bind="$attrs"
    v-on="listeners"
    :loading="showLoading"
    :fullscreen="isFullscreen"
    :virtual-scroll="computedVirtualScroll"
    :rows-per-page-options="rowsPerPageOptions"
    :no-data-label="noDataLabel"
    :no-results-label="noResultsLabel"
    :selected-rows-label="selectedRowsLabel"
    :separator="computedSeparator"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <!-- 添加pagination slot，以便页面没有分页时q-table显示默认的分页信息 -->
    <template v-slot:pagination>
      <slot name="pagination"/>
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
import { mapGetters } from 'vuex'
import Setting from '@/default-setting'

export default {
  name: 'CoadminTable',
  inheritAttrs: false,
  props: {
    rowsPerPageOptions: {
      type: Array,
      default: () => [0]
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
    }
  },
  data () {
    return {
      isFullscreen: undefined,
      showLoading: this.loading
    }
  },
  created () {
    this.isFullscreen = this.fullscreen
  },
  mounted () {
  },
  watch: {
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
        cls += ' coadmin-table-sticky-header-and-first-last-column'
      } else if (this.stickyHeader && this.stickyFirstColumn) {
        cls += ' coadmin-table-sticky-header-and-first-column'
      } else if (this.stickyHeader && this.stickyLastColumn) {
        cls += ' coadmin-table-sticky-header-and-last-column'
      } else if (this.stickyFirstColumn && this.stickyLastColumn) {
        cls += ' coadmin-table-sticky-first-and-last-column'
      } else if (this.stickyHeader) {
        cls += ' coadmin-table-sticky-header'
      } else if (this.stickyFirstColumn) {
        cls += ' coadmin-table-sticky-first-column'
      } else if (this.stickyLastColumn) {
        cls += ' coadmin-table-sticky-last-column'
      }
      return cls
    },
    computedStyle () {
      let height = 'auto'
      if (this.computedVirtualScroll) {
        if (this.isFullscreen) {
          height = '100vh'
        } else {
          let sub = '- 50px ' //q-page
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
    }
  },
  methods: {
    _contains (string, strArray) {
      if (string) {
        for (const str of strArray) {
          if (string.includes(str)) {
            return true
          }
        }
      }
      return false
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
