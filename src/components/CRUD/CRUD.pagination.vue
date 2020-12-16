<template>
  <div class="row">
    <slot name="left" />
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
      input
      @input="crud.pageChangeHandler"
    >
    </q-pagination>
    <q-select
      class="col-auto"
      dense options-dense borderless
      flat
      :value="page.size"
      :options="sizePerPageOptions"
      emit-value
      map-options
      @input="crud.sizeChangeHandler"
    />
    <slot name="right" />
  </div>
</template>

<script>
import { pagination } from './crud'
export default {
  mixins: [pagination()],
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
  computed: {
    pageMax () {
      const p = parseInt(this.page.total / this.page.size)
      if (p * this.page.size === this.page.total) {
        return p
      } else {
        return p + 1
      }
    }
  }
}
</script>
