<!--
  crud/crud.js 自定义用法：搜索框放到表格正上方
-->
<template>
  <div >
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
          <co-field dense class="col-12" form-label="ID" :value="form.id" v-if="form.id" borderless/>
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
      class="q-pa-sm"
      flat
      sticky-last
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
            <q-checkbox dense v-model="labelTop" label="label-top" />
            <co-input dense outlined v-model.lazy="labelStyle" placeholder="form-label-style" style="width:280px"/>
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

        <co-form class='row q-gutter-sm q-px-xs q-py-sm'
          :label-top="labelTop"
          :label-align="labelAlign"
          :label-width="labelWidth"
          :form-label-style="labelStyle"
        >
          <co-input form-label="ID" label="ID" v-model="query.id" content-style="width:200px" dense outlined clearable no-clear-focus/>
          <co-input form-label="名称" label="名称" v-model="query.name" content-style="width:200px" dense outlined clearable/>
          <co-date-select
            content-style="width:200px"
            form-label="日期范围"
            label="日期范围"
            v-model="query.dateRange"
            clearable
            range
            />
          <template v-if="crud.props.queryMore">
            <co-date-select
              class=""
              content-style="width:100px"
              placeholder="日期"
              v-model="query.dateSingle"
              clearable
            />
            <co-input class="" content-style="width:200px" placeholder="Fat" v-model="query.fat" dense outlined clearable>
              <template v-slot:append>
                <q-icon name="add" />
              </template>
            </co-input>
            <co-input class="" content-style="width:200px" placeholder="Calories" v-model="query.calories" dense outlined />
            <co-tree-select
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
            </co-tree-select>
            <co-select
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
            <co-select
              v-model="query.selectSingle"
              :options="listOptions"
              clearable
              placeholder="选择巨头"
              content-style="width:100px"
              hide-dropdown-icon
            />
          </template>
          <co-btn :label="crud.props.queryMore?'«更少':'更多»'" flat @click="crud.props.queryMore = !crud.props.queryMore"/>
          <co-btn label="重置" flat @click="crud.resetQuery()" />
          <co-btn icon="search" color="primary" @click="crud.toQuery" />
        </co-form>

        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <crud-operation :permission="permission" no-label/>
          <div class="col-auto">
            <co-btn-dropdown color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
              <crud-more :tableSlotTopProps="props" />
            </co-btn-dropdown>
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
import { listOptions, mapOptions } from '@/data/options.js'

import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrudCustom3',
  components: { CrudOperation, CrudMore, CrudPagination, CrudRow },
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
