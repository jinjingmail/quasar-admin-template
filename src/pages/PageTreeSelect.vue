<template>
  <div class="">
    <q-card class="q-pa-md q-gutter-sm">
      <coadmin-tree-select
        placeholder="leaf"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="popupTreeTicked"
        :expanded.sync="popupTreeExpanded"
        tick-strategy="leaf"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />

      <coadmin-tree-select
        placeholder="strict"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked1"
        :expanded.sync="tree.expanded1"
        tick-strategy="strict"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-style="width:350px; max-height:60vh;"
        tree-class="q-pa-sm"
        clearable
      />
      <coadmin-tree-select
        placeholder="leaf-any-with-parent"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked2"
        :expanded.sync="tree.expanded2"
        tick-strategy="leaf-any-with-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
        no-ticked-expand
      />

      <coadmin-tree-select
        placeholder="leaf-all-only-parent"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked3"
        :expanded.sync="tree.expanded3"
        tick-strategy="leaf-all-only-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />

      <coadmin-tree-select
        placeholder="leaf-all-with-parent"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked4"
        :expanded.sync="tree.expanded4"
        tick-strategy="leaf-all-with-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />

      <coadmin-tree-select
        placeholder="select"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :expanded.sync="tree.expanded4"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
        selectable
      />

    </q-card>
  </div>
</template>

<script>
import depts from '../data/depts.js'

export default {
  name: 'PageTreeSelect',
  data () {
    return {
      popupTreeExpanded: [],
      popupTreeTicked: [],
      tree: {}
    }
  },
  mounted () {
  },
  computed: {
    treeDatas () {
      return depts.content
    }
  },
  watch: {
    popupTreeExpanded (val) {
      console.log('pageTreeSelect.popupTreeExpanded', this.popupTreeExpanded)
    },
    popupTreeTicked (val) {
      console.log('pageTreeSelect.popupTreeTicked', this.popupTreeTicked)
    }
  },
  methods: {
  }
}
</script>
