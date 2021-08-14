<!--
  插槽：
    start
    end
  属性：
    dense
    icon-prev
    icon-next
    input
    max-pages
    no-persistence-page-size  不持久存储pagesize到浏览器缓存
    no-page-if-only-one-page  拢共只有一页时就不显示分页栏了
-->
<template>
  <div class="row inline no-wrap items-center">
    <slot name="start" />
    <co-field borderless :outlined="false" class="col-auto">
      <template v-slot:control>
        共 {{page.total}} 条
      </template>
    </co-field>
    <co-pagination v-if="!computedNoPageIfOnlyOnePage"
      :value="page.page"
      class="col-auto"
      :max="pageMax"
      :direction-links="true"
      :boundary-links="false"
      :input='input || !$q.screen.gt.xs'
      @input="crud.pageChangeHandler"
      :icon-prev="iconPrevPage"
      :icon-next="iconNextPage"
      :max-pages="$q.screen.gt.xs?maxPages:5"
      :size="size?size:(_dense()?'13px':'16px')"
      :dense="_dense()"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </co-pagination>
    <co-select v-if="!computedNoPageIfOnlyOnePage"
      class="col-auto"
      :value="page.size"
      :options="sizePerPageOptions"
      emit-value
      map-options
      borderless
      @input="pageSizeChange"
      :hide-dropdown-icon="!$q.screen.gt.xs"
    />
    <slot name="end" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Setting from '@/default-setting'

import { pagination } from './crud'
export default {
  mixins: [pagination()],
  props: {
    dense: {
      type: Boolean,
      default: undefined
    },
    size: String,
    iconPrevPage: {
      type: String,
      default: 'chevron_left'
    },
    iconNextPage: {
      type: String,
      default: 'chevron_right'
    },
    input: Boolean,
    maxPages: {
      type: Number,
      default: 6
    },
    noPersistencePageSize: Boolean,
    noPageIfOnlyOnePage: Boolean
  },
  data () {
    return {
      sizePerPageOptions: [
        { label: '1 条/页', value: 1 },
        { label: '2 条/页', value: 2 },
        { label: '3 条/页', value: 3 },
        { label: '5 条/页', value: 5 },
        { label: '10 条/页', value: 10 },
        { label: '15 条/页', value: 15 },
        { label: '20 条/页', value: 20 },
        { label: '25 条/页', value: 25 },
        { label: '30 条/页', value: 30 },
        { label: '40 条/页', value: 40 },
        { label: '50 条/页', value: 50 },
        { label: '100 条/页', value: 100 }
      ]
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters('settings', [
      'pageSize'
    ]),
    computedNoPageIfOnlyOnePage () {
      if (this.noPageIfOnlyOnePage) {
        // 有一种情况：后台返回的数据，大于 page.size
        if (this.page.size >= this.page.total || (this.crud.data && this.crud.data.length >= this.page.total)) {
          return true
        }
      }
      return false
    },
    pageMax () {
      const p = parseInt(this.page.total / this.page.size)
      if (p * this.page.size === this.page.total) {
        return p
      } else {
        return p + 1
      }
    }
  },
  methods: {
    ...mapActions('settings', [
      'changeSetting'
    ]),
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    },
    pageSizeChange (value) {
      if (!this.noPersistencePageSize) {
        this.changeSetting({ key: 'pageSize', value: value })
      }
      this.crud.sizeChangeHandler(value)
    }
  }
}
</script>
