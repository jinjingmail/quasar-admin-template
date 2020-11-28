<template>
  <div class="coadmin-page q-pa-sm q-gutter-sm">

    <q-splitter
      v-model="splitter"
      unit="px"
      :horizontal="$q.screen.xs"
      emit-immediately
    >
      <template v-slot:before>
        <div class="q-pa-xs">
          <coadmin-tree
            ref="tree"
            node-key="id"
            label-key="label"
            :nodes="treeDatas"
            :filter="treeDatasFilter"
            :filter-method="treeDatasFilterMethod"
            :selected.sync="treeNodeSelected"
            selected-color="purple"
            selectable
          >
            <template v-slot:toolbar>
              <q-toolbar flat>
                <div class="row full-width">
                  <q-input
                    ref="filter"
                    dense
                    v-model="treeDatasFilter"
                    label="Filter..."
                    class="col-8"
                  >
                    <template v-slot:append>
                      <q-icon v-if="treeDatasFilter !== ''" name="clear" class="cursor-pointer" @click="treeDatasFilterReset" />
                    </template>
                  </q-input>

                  <q-space/>

                  <q-btn class="col-auto"
                    dense
                    :icon="treeDatasExpanded?'unfold_more':'unfold_less'"
                    @click="(treeDatasExpanded=!treeDatasExpanded)?$refs.tree.collapseAll():$refs.tree.expandAll()"
                  />
                </div>
              </q-toolbar>
            </template>
            <template v-slot:default-header="prop">
              <div :class="{'text-weight-bold':treeNodeSelected==prop.key}">{{ prop.node.label }}</div>
            </template>
          </coadmin-tree>
        </div>
      </template>

      <template v-if="$q.screen.xs" v-slot:separator>
        <q-avatar color="primary" text-color="white" size="35px" icon="height" />
      </template>

      <template v-slot:after>
        <div class="q-pa-sm">
          <coadmin-tree-table :columns="columns" :data="treeDatasSelected"/>
        </div>
      </template>
    </q-splitter>

  </div>
</template>

<script>
import depts from '../data/depts.js'
import CoadminTree from 'components/CoadminTree.vue'
import CoadminTreeTable from 'components/CoadminTreeTable.vue'

export default {
  name: 'PageTreeTable2',
  components: {
    CoadminTree,
    CoadminTreeTable
  },
  data () {
    return {
      splitter: 250,
      treeNodeSelected: null,
      treeDatasFilter: '',
      treeDatasExpanded: true,

      text: '',
      textSearch: '',
      currentPage: 1,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogData: false,
      dialogFullscreen: false,
      selected: [],
      visibleColumns: ['id', 'name', 'sort', 'enabled'],
      columns: [
        { name: 'id', label: 'ID', field: 'id', sortable: true },
        { name: 'pid', label: 'PID', field: 'pid', sortable: true },
        {
          name: 'name',
          field: 'name',
          required: true,
          label: '名称',
          align: 'left',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'sort', field: 'sort', label: 'sort' },
        { name: 'enabled', field: 'enabled', label: 'enabled' },
        { name: 'treeNames', field: 'treeNames', label: 'treeNames', align: 'left' }
      ]
    }
  },
  mounted () {
    // const a = [8, 21]
    // this.popupTreeTicked = [...a]
  },
  watch: {
    '$q.screen.gt.xs' (val) {
      console.log('$q.screen.gt.xs=' + this.$q.screen.gt.xs + ', val=' + val)
    }
  },
  computed: {
    treeDatas () {
      return depts.content
    },
    treeDatasSelected () {
      const a = this.getTreeDatasByPid(this.treeDatas, this.treeNodeSelected)
      return a || []
    }
  },
  methods: {
    treeDatasFilterReset () {
      this.treeDatasFilter = ''
      this.$refs.filter.focus()
    },
    treeDatasFilterMethod (node, filter) {
      const filt = filter.toLowerCase()
      return (node.name && node.name.toLowerCase().indexOf(filt) > -1) || (node.nameLetter && node.nameLetter.toLowerCase().indexOf(filt) > -1)
    },
    getTreeDatasByPid (treeDataList, pid) {
      if (!treeDataList) {
        return null
      }
      if (pid == null || pid === undefined) {
        return treeDataList
      }
      let filterList = treeDataList.filter(node => {
        return node.pid === pid
      })
      if (filterList && filterList.length > 0) {
        return filterList
      }
      for (const node of treeDataList) {
        if (node.children && node.children.length > 0) {
          filterList = this.getTreeDatasByPid(node.children, pid)
          if (filterList && filterList.length > 0) {
            return filterList
          }
        }
      }
      return null
    },
    rowViewClick (row) {
      this.dialogData = true
    },
    rowLooooooongButtonClick () {
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  }
}
</script>
