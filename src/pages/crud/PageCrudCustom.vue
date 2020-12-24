<!--
  CRUD/crud.js 自定义用法（覆盖一些默认值）
-->
<template>
  <div >
    <coadmin-dialog title="查找" no-max seamless ref="search" @before-hide="filterTable=''">
      <q-input placeholder="在当前页查找" dense outlined v-model="filterTable" clearable class="q-ml-sm q-mr-sm q-mt-none q-mb-sm"/>
    </coadmin-dialog>

    <coadmin-dialog
      ref="formDialog"
      :value="crud.status.cu > 0"
      :title="crud.status.title"
      no-backdrop-dismiss
      @before-hide="crud.cancelCU"
      content-style="width:800px; max-width:95vw;"
    >
      <coadmin-form ref="form" label-width="small" label-position="center" class="q-pa-md">
        <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
          <coadmin-form-item class="col-12" form-label="ID">
            <q-field dense borderless>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{form.id}}</div>
              </template>
            </q-field>
          </coadmin-form-item>
          <coadmin-input class="col-12 col-sm-6" form-label="name" v-model="form.name" :disable="!!crud.status.view" :rules="[
              val => (val && val.length >= 3) || '请输入3个以上字符'
              ]">
            <template v-slot:append>
              <q-icon name="title" />
            </template>
          </coadmin-input>
          <coadmin-input class="col-12 col-sm-6" form-label="fat" v-model="form.fat" :disable="!!crud.status.view" />
        </div>
      </coadmin-form>
      <q-card-actions class="q-pa-md" align="right">
        <q-btn label="取消" flat v-close-popup/>
        <q-btn label="保存" icon="check" color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
      </q-card-actions>
    </coadmin-dialog>

    <coadmin-table
      ref="table"
      row-key="id"
      class="q-pt-sm"
      sticky-last-column
      sticky-header
      flat
      dense
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      selection="multiple"
      :selected.sync="crud.selections"
      :filter="filterTable"
      :selected-rows-label="numOfRows => '选了 ' + numOfRows"
      @row-click="(evt, row, index) => crud.selections = [row]"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <crud-operation :permission="permission"
            label-del=""
            icon-view=""
            no-edit
            outline
            >
            <template v-slot:end>
              <q-btn dense label="导出" outline/>
            </template>
          </crud-operation>
          <coadmin-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" clearable filled placeholder="查询"
                input-class="text-center" @clear="crud.resetQuery()">
            <template v-slot:after>
              <q-btn dense color="primary" icon="search" label="查询" @click="crud.toQuery"/>
              <q-btn-dropdown dense color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
                <crud-more :tableSlotTopProps="props">
                  <template v-slot:start>
                    <q-btn flat align="left" label="在当前页查找" icon="find_in_page" @click.native="$refs.search.show()" />
                    <q-separator/>
                  </template>
                </crud-more>
              </q-btn-dropdown>
            </template>
            <coadmin-dialog ref="searchPopup"
              seamless content-style="width:700px; max-width:95vw;">
              <coadmin-form ref="searchform" label-width="small" label-position="right" class="q-pa-md">
                <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                  <coadmin-input class="col-12 col-sm-6" form-label="名字" v-model="query.name" />
                  <coadmin-date-select
                    class="col-12 col-sm-6"
                    form-label="date"
                    placeholder="日期单选"
                    clearable
                    v-model="query.dateSingle"
                  >
                    <template v-slot:append>
                      <q-icon name="event" />
                    </template>
                  </coadmin-date-select>
                  <coadmin-tree-select
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
                </div>
              </coadmin-form>
              <q-card-actions class="q-pa-md" align="center">
                <q-btn label="查询(不关闭)" color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
                <q-btn label="查询" v-close-popup color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
                <q-btn label="关闭" flat v-close-popup />
              </q-card-actions>
            </coadmin-dialog>
          </coadmin-input>
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
            icon-del="delete_sweep"
            no-view
            tooltip
            msg="真的删？">
            <template v-slot:end>
              <q-btn dense label="导出" />
            </template>
          </crud-row>
        </q-td>
      </template>

      <template v-slot:pagination>
        <crud-pagination input />
      </template>

    </coadmin-table>
  </div>
</template>

<script>
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import crudPagination from '@crud/CRUD.pagination'
import crudRow from '@crud/CRUD.row'
import crudMore from '@crud/CRUD.more'
import crudDemo from '@/api/demo.js'

import depts from '@/data/depts.js'
import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrudCustom',
  components: { crudOperation, crudMore, crudPagination, crudRow },
  cruds() {
    // * 默认查询参数：query
    return CRUD({ query: { name: 'nnn' }, columns, visibleColumns, idField: 'id', title: '演示', sort: ['name,asc', 'id,desc'], url: 'api/demo', crudMethod: { ...crudDemo } })
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
      treeData: depts.content
    }
  },
  created () {
    // 动态初始化参数初始化（比如通过URL携带来的参数）
    /* 提示：如果需要指定页面的初始查询参数，还需要在上面的 cruds() 中初始化 query: {name} */
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
  }
}
</script>
