<!--
  CRUD/crud.js 自定义用法：搜索框放到表格正上方
-->
<template>
  <div >
    <coadmin-dialog
      ref="formDialog"
      :value="crud.status.cu > 0"
      :title="crud.status.title"
      no-backdrop-dismiss
      @before-hide="crud.cancelCU"
      card-style="width:800px; max-width:95vw;"
    >
      <coadmin-form ref="form"
        label-width="small"
        label-align="center"
        class="q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md">
          <coadmin-form-item class="col-12" form-label="ID" v-if="form.id">
            <div class="q-mt-xs">{{form.id}}</div>
          </coadmin-form-item>
          <coadmin-input class="col-12 col-sm-6" form-label="name" v-model="form.name" :disable="!!crud.status.view" :rules="[
              val => (val && val.length >= 3) || '请输入3个以上字符'
              ]">
            <template v-slot:append>
              <q-icon name="title" />
            </template>
          </coadmin-input>
          <coadmin-input class="col-12 col-sm-6" form-label="fat" v-model="form.fat" :disable="!!crud.status.view" />
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
      class="q-pa-sm"
      flat
      sticky-last-column
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      selection="multiple"
      :selected.sync="crud.selections"
    >
      <template v-slot:top="props">
        <div class="q-ma-none">
          <div class="row q-gutter-sm">
            <q-checkbox v-model="labelTop" label="label-top" />
            <q-input dense outlined v-model.lazy="labelStyle" placeholder="label-style" style="width:280px"/>
          </div>
          <div class="q-gutter-sm">
            <q-radio v-model="labelAlign" val="auto" label="auto" />
            <q-radio v-model="labelAlign" val="left" label="left" />
            <q-radio v-model="labelAlign" val="center" label="center" />
            <q-radio v-model="labelAlign" val="right" label="right" />
          </div>
          <div class="q-gutter-sm">
            <q-radio v-model="labelWidth" val="fit-content" label="fit-content" />
            <q-radio v-model="labelWidth" val="xsmall" label="xsmall" />
            <q-radio v-model="labelWidth" val="small" label="small" />
            <q-radio v-model="labelWidth" val="medium" label="medium" />
            <q-radio v-model="labelWidth" val="large" label="large" />
            <q-radio v-model="labelWidth" val="xlarge" label="xlarge" />
            <q-radio v-model="labelWidth" val="xxlarge" label="xxlarge" />
          </div>
        </div>
        <q-separator />

        <coadmin-form class='row q-gutter-sm q-px-xs q-py-sm'
          :label-top="labelTop"
          :label-align="labelAlign"
          :label-width="labelWidth"
          :label-style="labelStyle"
        >
          <coadmin-input class=""
            placeholder="ID" v-model="query.id" content-style="width:200px" clearable no-clear-focus/>
          <coadmin-input form-label="名称" placeholder="名称" v-model="query.name" content-style="width:200px" clearable/>
          <coadmin-date-select
            content-style="width:200px"
            form-label="日期范围"
            placeholder="日期范围"
            v-model="query.dateRange"
            clearable
            range
            />
          <template v-if="crud.props.queryMore">
            <coadmin-date-select
              class=""
              content-style="width:100px"
              placeholder="日期"
              v-model="query.dateSingle"
              clearable
            />
            <coadmin-input class="" content-style="width:200px" placeholder="Fat" v-model="query.fat" clearable>
              <template v-slot:append>
                <q-icon name="add" />
              </template>
            </coadmin-input>
            <coadmin-input class="" content-style="width:200px" placeholder="Calories" v-model="query.calories" />
            <coadmin-tree-select
              placeholder="Tree多选"
              :nodes="treeData"
              node-key="id"
              label-key="name"
              :ticked.sync="query.ticked"
              tick-strategy="leaf-all-only-parent"
              tree-class="q-pa-sm"
              clearable
              content-style="width:200px"
              no-input
            >
              <template v-slot:append>
                <q-icon name="add" />
              </template>
            </coadmin-tree-select>
            <coadmin-select
              v-model="query.selectSingle"
              :options="listOptions"
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              placeholder="选择巨头"
              content-style="width:200px"
            />
            <coadmin-select
              v-model="query.selectSingle"
              :options="listOptions"
              clearable
              placeholder="选择巨头"
              content-style="width:200px"
            />
          </template>
          <q-btn dense label="查询" padding="xs sm" color="primary" @click="crud.toQuery" />
          <q-btn dense label="重置" flat @click="crud.resetQuery()" />
          <q-btn dense :label="crud.props.queryMore?'更少..':'更多..'" flat @click="crud.props.queryMore = !crud.props.queryMore"/>
        </coadmin-form>

        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <crud-operation :permission="permission" no-label/>
          <div class="col-auto">
            <q-btn-dropdown dense color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
              <crud-more :tableSlotTopProps="props" />
            </q-btn-dropdown>
          </div>

          <q-space />

          <crud-pagination v-if="$q.screen.gt.xs"/>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row :data="props.row"
          no-add
          :type="$q.screen.gt.xs?'button':'menu'"
          :permission="permission"/>
        </q-td>
      </template>

      <template v-slot:pagination>
        <crud-pagination />
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
import { listOptions, mapOptions } from '@/data/options.js'

import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrudCustom3',
  components: { crudOperation, crudMore, crudPagination, crudRow },
  cruds() {
    return CRUD({ columns, visibleColumns, idField: 'id', title: '演示', url: 'api/demo', crudMethod: { ...crudDemo } })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data () {
    return {
      labelTop: false,
      labelAlign: 'right',
      labelWidth: 'medium',
      labelStyle: '',
      permission: {
        add: ['admin', 'user:add'],
        edit: ['admin', 'user:edit'],
        del: ['admin', 'user:del']
      },
      treeData: depts.content,
      listOptions,
      mapOptions
    }
  },
  created () {
    this.crud.updateProp('queryMore', false)
  },
  mounted () {
  },
  methods: {
    [CRUD.HOOK.beforeRefresh] () {
      console.log('pageCrud CRUD.HOOK.beforeRefresh')
    }
  }
}
</script>
