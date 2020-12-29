<template>
  <div class="">

    <q-splitter
      v-model="splitter"
      unit="px"
      :horizontal="$q.screen.xs"
      emit-immediately
    >
      <template v-slot:before>
        <coadmin-tree
          ref="tree"
          class="q-mr-sm"
          style="background-color:var(--q-color-table-bg)"
          node-key="id"
          label-key="label"
          :nodes="treeDatas"
          filter-key-like="nameLetter"
          filter-key-equal="id"
          :selected.sync="treeNodeSelected"
          selected-color="purple"
          selectable
        >
          <template v-slot:default-header="prop">
            <div :class="{'text-weight-bold':treeNodeSelected==prop.key}">{{ prop.node.label }}</div>
          </template>
        </coadmin-tree>
      </template>

      <template v-if="$q.screen.xs" v-slot:separator>
        <q-avatar color="primary" text-color="white" size="35px" icon="height" />
      </template>

      <template v-slot:after>
          <coadmin-tree-markup-table
            class="q-ml-sm"
            style="background-color:var(--q-color-table-bg)"
            :columns="columns"
            :data="treeDatasSelected"/>
      </template>
    </q-splitter>

  </div>
</template>

<script>
import depts from '../data/depts.js'
import CoadminTree from 'components/CoadminTree.vue'
import CoadminTreeMarkupTable from 'components/CoadminTreeMarkupTable.vue'

export default {
  name: 'PageTreeMarkupTable',
  components: {
    CoadminTree,
    CoadminTreeMarkupTable
  },
  data () {
    return {
      splitter: 250,
      treeNodeSelected: null,
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
    }
  }
}
</script>
