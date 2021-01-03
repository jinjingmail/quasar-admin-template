<template>
  <div class="">
    <coadmin-card class="row q-ma-none q-pa-md q-gutter-md">
      <coadmin-tree-select
        placeholder="leaf（只有叶子节点）"
        class="col-5"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="popupTreeTicked"
        :expanded.sync="popupTreeExpanded"
        @ticked-label="labels => popupTreeTickedLabels = labels"
        tick-strategy="leaf"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />
      <div class="col-3">{{popupTreeTicked}}</div>
      <div class="col-3">{{popupTreeTickedLabels}}</div>

      <coadmin-tree-select
        class="col-5"
        placeholder="strict（选谁是谁）"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked1"
        @ticked-label="labels => $set(tree,'ticked1Labels', labels)"
        tick-strategy="strict"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-style="width:350px; max-height:60vh;"
        tree-class="q-pa-sm"
        clearable
      />
      <div class="col-3">{{tree.ticked1}}</div>
      <div class="col-3">{{tree.ticked1Labels}}</div>

      <coadmin-tree-select
        class="col-5"
        placeholder="leaf-any-with-parent（任意叶子节点选中就包含父节点）"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked2"
        @ticked-label="labels => $set(tree,'ticked2Labels', labels)"
        tick-strategy="leaf-any-with-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
        no-ticked-expand
      />
      <div class="col-3">{{tree.ticked2}}</div>
      <div class="col-3">{{tree.ticked2Labels}}</div>

      <coadmin-tree-select
        class="col-5"
        placeholder="leaf-all-only-parent（选中所有叶子节点就只包含父节点）"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked3"
        @ticked-label="labels => $set(tree,'ticked3Labels', labels)"
        tick-strategy="leaf-all-only-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />
      <div class="col-3">{{tree.ticked3}}</div>
      <div class="col-3">{{tree.ticked3Labels}}</div>

      <coadmin-tree-select
        class="col-5"
        placeholder="leaf-all-with-parent（选中所有叶子节点就包含父节点）"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :ticked.sync="tree.ticked4"
        @ticked-label="labels => $set(tree,'ticked4Labels', labels)"
        tick-strategy="leaf-all-with-parent"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
      />
      <div class="col-3">{{tree.ticked4}}</div>
      <div class="col-3">{{tree.ticked4Labels}}</div>

      <coadmin-tree-select
        class="col-5"
        placeholder="（单选）"
        node-key="id"
        label-key="name"
        :nodes="treeDatas"
        :selected.sync="tree.selected1"
        @selected-label="label => $set(tree, 'selected1Label', label)"
        filter-key-like="nameLetter"
        filter-key-equal="id"
        tree-class="q-pa-sm"
        clearable
        selectable
      />
      <div class="col-3">{{tree.selected1}}</div>
      <div class="col-3">{{tree.selected1Label}}</div>

    </coadmin-card>
  </div>
</template>

<script>
import depts from '../data/depts.js'

export default {
  name: 'PageTreeSelect',
  data () {
    return {
      popupTreeExpanded: [],
      popupTreeTicked: [46],
      popupTreeTickedLabels: null,
      tree: { ticked1: [46], selected1: 45 }
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
