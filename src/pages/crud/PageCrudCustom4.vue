<!--
  CRUD/crud.js 自定义用法：搜索框放到表格右上角
-->
<template>
  <div >
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
      class="q-pt-none"
      flat
      sticky-last-column
      :title="crud.status.title"
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      :selected.sync="crud.selections"
      selection="multiple"
      @row-click="(evt, row, index) => crud.selections = [row]"
    >
      <template v-slot:top-right="props">

        <div class='row q-col-gutter-x-sm q-col-gutter-y-xs q-px-sm q-py-sm full-width'>
          <coadmin-input placeholder="名称" v-model="query.name" content-style="width:200px" clearable/>
          <coadmin-date-select
            content-style="width:200px"
            placeholder="日期范围"
            v-model="query.dateRange"
            clearable
            use-input
            range
            />

          <div class='col-auto'>
            <q-btn dense label="查询" padding="xs sm" color="primary" icon="search" @click="crud.toQuery" />
          </div>
          <q-space/>
          <crud-operation :permission="permission" no-label/>
          <div class="col-auto">
            <q-btn-dropdown dense color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
              <crud-more :tableSlotTopProps="props" />
            </q-btn-dropdown>
          </div>

        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row :data="props.row"
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
