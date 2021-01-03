<template>
  <div class="">
    <q-card class="q-ma-sm q-pa-md q-gutter-md">
      <coadmin-input v-model="query.model" placeholder="输入值" clearable
        @inputx="_input"
        @clear="_clear"/>
      <div>Input 当前值：{{query.model}}</div>
    </q-card>
    <q-card class="q-ma-sm q-pa-md q-gutter-md">
      <coadmin-select v-model="query.modelMapOptionGroup" clearable
        emit-value
        map-options
        xmultiple
        option-value="value"
        option-label="label"
        :options="labelValueMapOptions"
        @input="_inputSelect"
        @clear="_clearSelect"
        @value-label="labels => $set(query, 'modelMapSelectLabels', labels)"
      />
      <div>select 当前值：{{query.modelMapOptionGroup}}</div>
      <div>select 当前label：{{query.modelMapSelectLabels}}</div>
    </q-card>
    <q-card class="q-ma-sm q-pa-md q-gutter-md">
      <coadmin-option-group v-model="query.modelMapOptionGroup"
        inline
        xtype="checkbox"
        option-value="value"
        option-label="label"
        :options="labelValueMapOptions"
        @input="_inputOptionGroup"
        @value-label="labels => $set(query, 'modelMapOptionGroupLabels', labels)"
      />
      <div>option-group 当前值：{{query.modelMapOptionGroup}}</div>
      <div>option-group 当前label：{{query.modelMapOptionGroupLabels}}</div>
    </q-card>
    <q-card class="q-ma-sm q-pa-md q-gutter-md">
      <coadmin-tree
        square
        node-key="id"
        label-key="name"
        children-key="children"
        tick-strategy="leaf-all-only-parent"
        :nodes="treeDatas"
        :ticked.sync="query.modelTreeTicked"
        @xupdate:ticked="_updateTreeTicked"
        @ticked-label="labels => $set(query, 'modelTreeTickedLabels', labels)"
      />
      <div>tree 当前值：{{query.modelTreeTicked}}</div>
      <div>tree 当前label：{{query.modelTreeTickedLabels}}</div>
    </q-card>
  </div>
</template>

<script>
import depts from '@/data/depts.js'

export default {
  name: 'PageInput',
  data () {
    return {
      query: { modelMapOptionGroup: 2, modelTreeTicked: [45] },
      labelValueMapOptions: [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 },
        { label: 'label3', value: 3 },
        { label: 'label4', value: 4 }
      ],
      treeDatas: depts.content
    }
  },
  mounted () {
    setTimeout(() => {
      this.$set(this.query, 'model', 559)
    }, 2000)
  },
  computed: {
  },
  watch: {
    'query.model': {
      immediate: true,
      handler (newVal, old) {
        console.log('watch input model: new=' + newVal + ', old=' + old)
      }
    },
    'query.modelMapSelect': {
      immediate: true,
      handler (newVal, old) {
        console.log('watch select model: new=' + newVal + ', old=' + old)
      }
    }
  },
  methods: {
    _input(value) {
      console.log('input:', value)
    },
    _clear(old) {
      console.log('clear:', old)
    },
    _inputSelect(value) {
      console.log('select input:', value)
    },
    _clearSelect(old) {
      console.log('select clear:', old)
    },
    _inputOptionGroup(value) {
      console.log('option-group input:', value)
    },
    _updateTreeTicked(keys) {
      console.log('_updateTreeTicked:', keys)
    }
  }
}
</script>
