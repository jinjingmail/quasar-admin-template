<template>
  <q-page class="coadmin-page q-pa-sm q-gutter-sm">

    <q-splitter
      v-model="splitter"
      unit="px"
      :horizontal="$q.screen.xs"
      emit-immediately
    >
      <template v-slot:before>
        <div class="q-pa-xs">
          <q-toolbar>
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

          <q-tree
            ref="tree"
            node-key="id"
            label-key="name"
            :nodes="treeDatas"
            no-connectors
            :filter="treeDatasFilter"
            :filter-method="treeDatasFilterMethod"
            :selected.sync="treeNodeSelected"
            selected-color="purple"
            no-nodes-label="无数据"
            no-results-label="无数据"
          >
            <template v-slot:default-header="prop">
              <div :class="{'text-weight-bold':treeNodeSelected==prop.key}">{{ prop.node.label }}</div>
            </template>
          </q-tree>
        </div>
      </template>

      <template v-if="$q.screen.xs" v-slot:separator>
        <q-avatar color="primary" text-color="white" size="35px" icon="height" />
      </template>

      <template v-slot:after>
        <div class="q-pa-xs">
          <q-table
            class="coadmin-table"
            flat
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
                <q-select v-model="popupTreeTickedComputed" class="col-xs-6 col-sm-5 col-md-4 col-lg-3" @click.native="treeSelectClicked()" dense placeholder="机构"
                  multiple
                >
                  <q-popup-proxy>
                    <q-card class="q-pa-sm">
                      <q-card-section>
                        <q-toolbar>
                          <div class="row full-width">
                            <q-input
                              ref="popupFilter"
                              dense
                              v-model="popupTreeDatasFilter"
                              label="Filter..."
                              class="col-8"
                            >
                              <template v-slot:append>
                                <q-icon v-if="popupTreeDatasFilter !== ''" name="clear" class="cursor-pointer" @click="popupTreeDatasFilterReset" />
                              </template>
                            </q-input>

                            <q-space/>

                            <q-btn class="col-auto"
                              dense
                              :icon="popupTreeDatasExpanded?'unfold_more':'unfold_less'"
                              @click="(popupTreeDatasExpanded = !popupTreeDatasExpanded)?$refs.popupTree.collapseAll():$refs.popupTree.expandAll()"
                            />
                          </div>
                        </q-toolbar>
                      </q-card-section>
                      <q-tree
                        ref="popupTree"
                        node-key="id"
                        label-key="name"
                        :nodes="treeDatas"
                        no-connectors
                        :filter="popupTreeDatasFilter"
                        :filter-method="popupTreeDatasFilterMethod"
                        :expanded.sync="popupTreeExpanded"
                        :ticked.sync="popupTreeTicked"
                        tick-strategy="strict"
                        selected-color="purple"
                        no-nodes-label="无数据"
                        no-results-label="无数据"
                        class="bg-light"
                        style="min-width:250px"
                      >
                      </q-tree>
                    </q-card>
                  </q-popup-proxy>
                </q-select>
                <q-select v-model="selectInputs" class="col-xs-6 col-sm-5 col-md-4 col-lg-3" dense placeholder="姓名"
                  use-chips
                  use-input
                  multiple
                  new-value-mode="add-unique"
                />
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
                        <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                      </div>
                    </div>
                  </q-btn-dropdown>
                </q-btn-group>

              </q-toolbar>
            </template>

            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn-dropdown label="" dense flat>
                  <q-list>
                    <q-item clickable v-close-popup dense @click="rowViewClick(props.row)">
                      <q-item-section>
                        <q-item-label>查看</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup dense>
                      <q-item-section>
                        <q-item-label>修改</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup dense>
                      <q-item-section>
                        <q-item-label>删除</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-item clickable v-close-popup dense @click="rowLooooooongButtonClick()">
                      <q-item-section>
                        <q-item-label>一个长长的按钮</q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-btn-dropdown>
              </q-td>
            </template>

            <template v-slot:no-data="{ icon, message, filter }">
              <div class="full-width row flex-center text-accent q-gutter-sm">
                <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
                <span style="font-size:2em">
                  {{ message }}
                </span>
              </div>
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
          </q-table>
        </div>
      </template>
    </q-splitter>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="fabPos">
      <q-btn fab-mini icon="keyboard_arrow_up" color="primary" v-touch-pan.capture="moveFab" v-touch-pan.prevent.mouse="moveFab" :disable="draggingFab"/>
    </q-page-scroller>

  </q-page>
</template>

<script>
import depts from '../data/depts.js'

export default {
  name: 'PageTreeTable',
  data () {
    return {
      splitter: 250,
      treeNodeSelected: null,
      treeDatasFilter: '',
      treeDatasExpanded: true,

      selectInputs: null,
      poppTreeNodeSelected: null,
      popupTreeDatasFilter: '',
      popupTreeDatasExpanded: true,
      popupTreeExpanded: [],
      popupTreeTicked: [],

      text: '',
      textSearch: '',
      currentPage: 1,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogData: false,
      dialogFullscreen: false,
      fabPos: [8, 68],
      draggingFab: false,
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
    console.log(depts)
    const a = [8, 21]
    this.popupTreeTicked = [...a]
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
    },
    popupTreeTickedComputed () {
      const a = []
      this.popupTreeTicked.forEach(id => {
        const node = this.findTreeNode(id)
        if (node && node.name) {
          a.push(node.name)
        }
      })
      return a
    }
  },
  methods: {
    treeSelectClicked () {
      // 找到父节点（总共向上找两级）
      const newArray = []
      for (const b of this.popupTreeTicked) {
        const node = this.findTreeNode(b)
        if (node && node.pid) newArray.push(node.pid)
      }
      for (const b of [...newArray]) {
        const node = this.findTreeNode(b)
        if (node && node.pid) newArray.push(node.pid)
      }
      this.popupTreeExpanded = [...this.popupTreeTicked, ...newArray]
    },
    findTreeNode (id) {
      if (this.treeDatas) {
        for (const node of this.treeDatas) {
          if (node.id === id) {
            return node
          } else if (node.hasChildren) {
            const node2 = this.findTreeNode2(id, node.children)
            if (node2) {
              return node2
            }
          }
        }
      }
      return null
    },
    findTreeNode2 (id, nodeList) {
      for (const node of nodeList) {
        if (node.id === id) {
          return node
        } else if (node.hasChildren) {
          const node2 = this.findTreeNode2(id, node.children)
          if (node2) {
            return node2
          }
        }
      }
    },
    treeDatasFilterReset () {
      this.treeDatasFilter = ''
      this.$refs.filter.focus()
    },
    treeDatasFilterMethod (node, filter) {
      const filt = filter.toLowerCase()
      return (node.name && node.name.toLowerCase().indexOf(filt) > -1) || (node.nameLetter && node.nameLetter.toLowerCase().indexOf(filt) > -1)
    },
    popupTreeDatasFilterReset () {
      this.popupTreeDatasFilter = ''
      this.$refs.popupFilter.focus()
    },
    popupTreeDatasFilterMethod (node, filter) {
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
