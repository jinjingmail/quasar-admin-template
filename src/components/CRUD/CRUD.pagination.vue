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
    no-persistence-page-size
-->
<template>
  <div class="row">
    <slot name="start" />
    <q-field dense borderless class="col-auto">
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">共{{page.total}}条</div>
      </template>
    </q-field>
    <q-pagination
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
      :size="dense?undefined:'18px'"
    >
    </q-pagination>
    <q-select
      class="col-auto"
      standout
      :dense="dense"
      :options-dense="dense"
      :value="page.size"
      :options="sizePerPageOptions"
      emit-value
      map-options
      @input="pageSizeChange"
      :hide-dropdown-icon="!$q.screen.gt.xs"
      :borderless="!$q.screen.gt.xs"
    />
    <slot name="end" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import { pagination } from './crud'
export default {
  mixins: [pagination()],
  props: {
    dense: {
      type: Boolean,
      default: true
    },
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
    noPersistencePageSize: Boolean
  },
  data () {
    return {
      sizePerPageOptions: [
        { label: '3 条/页', value: 3 },
        { label: '5 条/页', value: 5 },
        { label: '10 条/页', value: 10 },
        { label: '12 条/页', value: 12 },
        { label: '14 条/页', value: 14 },
        { label: '16 条/页', value: 16 },
        { label: '18 条/页', value: 18 },
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
    pageSizeChange (value) {
      if (!this.noPersistencePageSize) {
        this.changeSetting({ key: 'pageSize', value: value })
      }
      this.crud.sizeChangeHandler(value)
    }
  }
}
</script>
