<!--
  crud/crud.js 自定义用法（覆盖一些默认值）
-->
<template>
  <div >
    <co-dialog title="查找" no-max seamless ref="search" @before-hide="filterTable=''">
      <q-input placeholder="在当前页查找" dense outlined v-model="filterTable" clearable class="q-ml-sm q-mr-sm q-mt-none q-mb-sm"/>
    </co-dialog>

    <q-dialog title="导出" v-model="showExportDialog">
      <q-card style="width:400px; height: 200px; max-width:95vw;">
        <p>导出</p>
      </q-card>
    </q-dialog>

    <co-dialog
      ref="formDialog"
      :value="crud.status.cu > 0"
      :title="crud.status.title"
      no-backdrop-dismiss
      @before-hide="crud.cancelCU"
      card-style="width:800px; max-width:95vw;"
    >
      <co-form ref="form"
        label-width="small"
        label-align="center"
        class="q-px-lg q-my-none row q-col-gutter-x-xl q-col-gutter-y-md">
          <co-field dense class="col-12" form-label="ID" :value="form.id" v-if="form.id" readonly borderless/>
          <co-input dense outlined class="col-12 col-sm-6" form-label="name" v-model="form.name" :disable="!!crud.status.view" :rules="[
              val => (val && val.length >= 3) || '请输入3个以上字符'
              ]">
            <template v-slot:append>
              <q-icon name="title" />
            </template>
          </co-input>
          <co-input dense outlined class="col-12 col-sm-6" form-label="fat" v-model="form.fat" :disable="!!crud.status.view" />
      </co-form>
      <q-card-actions class="q-px-lg q-pt-lg q-pb-md" align="right">
        <co-btn label="取消" flat v-close-popup/>
        <co-btn label="保存"  color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
      </q-card-actions>
    </co-dialog>

    <co-table
      ref="table"
      row-key="id"
      sticky-last
      sticky-header
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      selection="single"
      tree-table
      :selected.sync="crud.selections"
      :filter="filterTable"
      :selected-rows-label="numOfRows => '选了 ' + numOfRows"
      @row-click="(evt, row, index) => crud.selections = [row]"
      @row-dblclick="(evt, row, index) => crud.toView(row)"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <crud-operation :permission="permission"
            label-del=""
            icon-view=""
            no-edit
            >
            <template v-slot:end>
              <co-btn label="导出" @click="doExport"/>
            </template>
          </crud-operation>
          <co-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" clearable placeholder="查询"
                input-class="text-center" @clear="crud.resetQuery()">
            <template v-slot:after>
              <co-btn color="primary" icon="search" label="查询" @click="crud.toQuery"/>
              <co-btn-dropdown color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
                <crud-more :tableSlotTopProps="props">
                  <template v-slot:start>
                    <co-btn flat align="left" label="在当前页查找" icon="find_in_page" @click.native="$refs.search.show()" />
                    <q-separator/>
                  </template>
                </crud-more>
              </co-btn-dropdown>
            </template>
            <co-dialog ref="searchPopup"
              seamless card-style="width:700px; max-width:95vw;">
              <co-form ref="searchform"
                label-width="small"
                label-align="right"
                class="q-pa-md row q-col-gutter-x-lg q-col-gutter-y-md">
                  <co-input class="col-12 col-sm-6" form-label="名字" v-model="query.name" />
                  <co-date-select
                    class="col-12 col-sm-6"
                    form-label="date"
                    placeholder="日期单选"
                    clearable
                    v-model="query.dateSingle"
                  >
                    <template v-slot:append>
                      <q-icon name="event" />
                    </template>
                  </co-date-select>
                  <co-tree-select
                    class="col-12"
                    form-label="Tree"
                    placeholder="Tree多选"
                    :nodes="treeData"
                    node-key="id"
                    label-key="name"
                    :ticked.sync="query.ticked"
                    @ticked-label="labels => queryTickedLabels = labels"
                    tick-strategy="leaf-all-only-parent"
                    tree-class="q-pa-sm"
                    clearable
                  />
              </co-form>
              <q-card-actions class="q-pa-md" align="center">
                <co-btn label="关闭" flat v-close-popup />
                <co-btn label="查询(不关闭)" color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
                <co-btn label="查询" v-close-popup color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
              </q-card-actions>
            </co-dialog>
          </co-input>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row no-wrap
            :data="props.row"
            :type="$q.screen.gt.xs?'button':'menu'"
            :permission="permission"
            color-edit='green'
            label-del="删"
            :msg-del="'真的删 ' + props.row.name + ' ?'"
            icon-del="delete_sweep"
            no-add
            no-icon
            :action-start="[
              {permission: ['admin', 'user:add'], label:'导出', color:'accent', click: clickExport},
              {permission: ['admin', 'user:add'], label:'导出2', click: clickExport}
            ]"
            action-end-menu
            action-end-menu-label='更多'
            action-end-menu-color='warning'
            :action-end="[
              {permission: ['admin', 'user:add'], label:'导出3', color:'accent', click: clickExport},
              {permission: ['admin', 'user:add'], label:'导出4', click: clickExport}
            ]"
            tooltip/>
        </q-td>
      </template>

      <template v-slot:pagination>
        <crud-pagination input />
      </template>

    </co-table>
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import CrudOperation from '@crud/crud-operation'
import CrudPagination from '@crud/crud-pagination'
import CrudRow from '@crud/crud-row'
import CrudMore from '@crud/crud-more'
import crudDemo from '@/api/demo.js'

import depts from '@/data/depts.js'
import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrudCustom',
  components: { CrudOperation, CrudMore, CrudPagination, CrudRow },
  cruds() {
    // * 默认查询参数：query
    return CRUD({ columns, visibleColumns, idField: 'id', title: '演示', sort: ['name,asc', 'id,desc'], url: 'api/demo', crudMethod: { ...crudDemo } })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data () {
    return {
      permission: {
        add: ['admin', 'user:add'],
        edit: ['admin', 'user:edit'],
        del: ['admin', 'user:del']
      },
      filterTable: '',
      querysLabel: '',
      queryTickedLabels: null,
      treeData: depts.content,
      showExportDialog: false
    }
  },
  created () {
    // 动态初始化参数初始化（比如通过URL携带来的参数）
    //this.$set(this.query, 'name', 'Demo')
    this.query.name = 'Demo'
  },
  mounted () {
    this.$refs.searchPopup.show()
    this.$nextTick(function () {
      this.$refs.searchPopup.hide()
    })
  },
  computed: {
    queryModel: {
      get () {
        const labels = []
        for (const key of Object.keys(this.query)) {
          if (key === 'ticked') {
            if (this.queryTickedLabels) labels.push('[' + this.queryTickedLabels.join(',') + ']')
          } else {
            const v = this.query[key]
            if (v) labels.push(v)
          }
        }
        return labels.join(', ')
      },
      set (val) {
        if (!val) {
          this.queryTickedLabels = null
        }
      }
    }
  },
  methods: {
    clickExport() {
      console.log('clicked export')
    },
    doExport() {
      this.showExportDialog = true
    }
  }
}
</script>
