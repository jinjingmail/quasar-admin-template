<template>
  <div class="">

    <q-splitter
      v-model="splitter"
      unit="px"
      :horizontal="$q.screen.xs"
      emit-immediately
    >
      <template v-slot:before>
          <co-tree
            ref="tree"
            class=" custom-table-bg"
            :class="$q.screen.gt.xs?'q-mr-sm':''"
            node-key="id"
            label-key="label"
            :nodes="treeDatas"
            :no-connectors="false"
            filter-key-like="nameLetter"
            filter-key-equal="id"
            :selected.sync="treeNodeSelected"
            selected-color="purple"
            selectable
          >
            <template v-slot:default-header="prop">
              <div :class="{'text-weight-bold':treeNodeSelected==prop.key}">{{ prop.node.label }}</div>
            </template>
          </co-tree>
      </template>

      <template v-if="$q.screen.xs" v-slot:separator>
        <q-avatar color="primary" text-color="white" size="35px" icon="height" />
      </template>

      <template v-slot:after>
          <co-table
            :class="$q.screen.gt.xs?'q-ml-sm':''"
            flat
            tree-table
            tree-children-key="children"
            expand-flat
            :wrap-cells="false"
            :data="treeDatasSelected"
            :columns="columns"
            row-key="id"
            :visible-columns="visibleColumns"
            separator="horizontal"
            :hide-pagination="false"
            :rows-per-page-options="[0]"
            no-data-label="无数据"
            selection="multiple"
            :selected.sync="selected"
            :loading="loading"
          >
            <template v-slot:top="props">
              <div class='row q-col-gutter-x-md q-col-gutter-y-xs' style="width:100%;">
                <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
                <template v-if="searchToggle" >
                  <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
                  <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
                  <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
                </template>
                <q-btn-group outline class="col">
                  <q-btn dense outline color="primary" label="查询"/>
                  <q-separator vertical />
                  <q-btn dense outline color="primary" label="Reset"/>
                </q-btn-group>
              </div>
              <q-toolbar class="no-padding">
                <q-btn-group flat rounded class="q-mr-sm">
                  <q-btn color="grey-3" text-color="primary" icon="add" @click="rowViewClick" />
                  <q-btn color="grey-3" text-color="warning" icon="edit" />
                  <q-btn color="grey-3" text-color="red" icon="delete" />
                </q-btn-group>

                <q-space />

                <q-btn-group outline>
                  <q-btn dense :outline="!searchToggle" color="primary" icon="search" @click="searchToggle = !searchToggle"/>
                  <q-separator vertical />
                  <q-btn dense outline color="primary" icon="autorenew" @click="loading = !loading"/>
                  <q-separator vertical/>
                  <q-btn dense outline color="primary" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click="props.toggleFullscreen"/>
                  <q-separator vertical/>
                  <q-btn-dropdown auto-close outline dense no-icon-animation class="btn-dropdown-hide-droparrow" color="primary" icon="apps">
                    <div class="row no-wrap q-pa-sm">
                      <div class="column">
                        <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" :disable="item.required"/>
                      </div>
                    </div>
                  </q-btn-dropdown>
                </q-btn-group>

              </q-toolbar>
            </template>

            <template v-slot:pagination>
              <q-pagination
                v-model="currentPage"
                :max="50"
                :direction-links="true"
                :boundary-links="false"
                input
                input-class="text-orange-10"
              />
              <q-select
                dense options-dense outlined
                v-model="numberPerPage"
                :options="numberPerPageOptions"
                emit-value
                map-options
              />

            </template>

            <template v-slot:loading>
              <q-inner-loading showing color="primary" />
            </template>
          </co-table>
      </template>
    </q-splitter>

  </div>
</template>

<script>
import depts from '../data/depts.js'
import CoTree from 'components/co-tree.vue'

export default {
  name: 'PageTreeTable',
  components: {
    CoTree
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
      visibleColumns: ['name', 'sort', 'enabled', 'action'],
      columns: [
        { name: 'id', label: 'ID', field: 'id', sortable: true, align: 'left' },
        { name: 'pid', label: 'PID', field: 'pid', sortable: true, align: 'left' },
        {
          name: 'name',
          field: 'name',
          required: true,
          label: '名称',
          align: 'left',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'sort', field: 'sort', label: 'sort', align: 'left' },
        { name: 'enabled', field: 'enabled', label: 'enabled', align: 'left' },
        { name: 'treeNames', field: 'treeNames', label: 'treeNames', align: 'left' },
        { name: 'action', field: 'action', label: 'action', align: 'center' }
      ]
    }
  },
  mounted () {
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
    fff (props) {
      console.log('props=', props)
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
    }
  }
}
</script>
