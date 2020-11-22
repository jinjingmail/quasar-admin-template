<!--
  增加插槽：
  增加属性：
    sticky-header
    sticky-first-column
    sticky-last-column

-->
<template>
  <q-table
    ref="table"
    v-bind="$attrs"
    v-on="listeners"
    class="coadmin-table"
    :class="computedClass"
    :style="computedStyle"
    :fullscreen="isFullscreen"
    :virtual-scroll="computedVirtualScroll"
    :rows-per-page-options="rowsPerPageOptions"
    :no-data-label="noDataLabel"
    :filter="filter"
  >
    <template v-slot:no-data="prop">
      <div class="full-width row flex-center q-gutter-sm">
        <q-icon size="1.4em" :name="prop.filter ? 'filter_b_and_w' : prop.icon" />
        <span style="font-size:1.4em">
          {{ prop.message }}
        </span>
      </div>
    </template>

    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>

    <template v-slot:pagination>
      <q-input placeholder="过滤" dense outlined v-model="filter"/>
      <slot name="pagination"/>
    </template>

    <template v-slot:loading>
      <slot name="loading">
        <q-inner-loading showing color="primary" style="z-index:5">
          <q-spinner-gears size="60px" color="primary" />
        </q-inner-loading>
      </slot>
    </template>

  </q-table>
</template>

<script>
export default {
  name: 'CoadminTable',
  inheritAttrs: false,
  props: {
    rowsPerPageOptions: {
      type: Array,
      default: () => [0]
    },
    virtualScroll: Boolean,
    fullscreen: Boolean,
    noDataLabel: {
      type: String,
      default: '无数据'
    },
    stickyHeader: {
      type: Boolean,
      default: false
    },
    stickyFirstColumn: {
      type: Boolean,
      default: false
    },
    stickyLastColumn: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFullscreen: this.fullscreen,
      filter: ''
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    computedVirtualScroll () {
      let vs = this.virtualScroll
      if (this.$q.screen.gt.xs) {
        if (this.stickyHeader) {
          vs = true
        }
      } else {
        // 当前在ios手机测试，虚拟滚动有bug
        vs = false
      }
      console.log('computedVirtualScroll=', vs)
      return vs
    },
    computedClass () {
      let cls = ''
      if (this.stickyHeader && this.stickyFirstColumn && this.stickyLastColumn) {
        cls = 'coadmin-table-sticky-header-and-first-last-column'
      } else if (this.stickyHeader && this.stickyFirstColumn) {
        cls = 'coadmin-table-sticky-header-and-first-column'
      } else if (this.stickyHeader && this.stickyLastColumn) {
        cls = 'coadmin-table-sticky-header-and-last-column'
      } else if (this.stickyFirstColumn && this.stickyLastColumn) {
        cls = 'coadmin-table-sticky-first-and-last-column'
      } else if (this.stickyHeader) {
        cls = 'coadmin-table-sticky-header'
      } else if (this.stickyFirstColumn) {
        cls = 'coadmin-table-sticky-first-column'
      } else if (this.stickyLastColumn) {
        cls = 'coadmin-table-sticky-last-column'
      }
      console.log('computedcss=', cls)
      return cls
    },
    computedStyle () {
      let height = 'auto'
      if (this.computedVirtualScroll) {
        if (this.$q.screen.gt.xs) {
          if (this.isFullscreen) {
            height = '100vh'
          } else {
            height = 'calc(100vh - 50px - 42px)'
          }
        }
      }
      console.log('computedStyle.height=', height)
      return {
        height: height
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
          'update:fullscreen': function (value) {
            vm.isFullscreen = value
            vm.$emit('update:fullscreen', value)
          }
        }
      )
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
</style>
