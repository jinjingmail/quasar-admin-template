<!--
  CRUD/crud.js 字典详情页面演示
-->
<template>
  <div >
    <coadmin-dialog
      ref="formDialog"
      :value="crud.status.cu > 0"
      :title="crud.status.title"
      no-backdrop-dismiss
      @before-hide="crud.cancelCU"
      content-style="width:600px; max-width:95vw;"
    >
      <coadmin-form ref="form" label-width="large" label-position="center" class="q-pa-md">
        <div class="row q-col-gutter-x-xl q-col-gutter-y-md">
          <coadmin-form-item class="col-12" form-label="ID">
            <q-field dense borderless>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{form.id}}</div>
              </template>
            </q-field>
          </coadmin-form-item>
          <coadmin-input class="col-12" form-label="label" v-model="form.label" :disable="!!crud.status.view" :rules="[
              val => (val && val.length >= 3) || '请输入3个以上字符'
              ]">
            <template v-slot:append>
              <q-icon name="title" />
            </template>
          </coadmin-input>
          <coadmin-input class="col-12" form-label="value" v-model="form.value" :disable="!!crud.status.view" :rules="[
              val => (!!val) || '必填'
              ]"/>
          <coadmin-input class="col-12" form-label="sort" v-model="form.sort" :disable="!!crud.status.view" />
        </div>
      </coadmin-form>
      <q-card-actions class="q-pa-md" align="right">
        <q-btn label="确认" icon="check" color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
        <q-btn label="取消" flat v-close-popup/>
      </q-card-actions>
    </coadmin-dialog>

    <coadmin-table
      ref="table"
      row-key="id"
      dense
      class="q-pt-sm q-ma-sm"
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :title="query.dictName"
      :loading="crud.loading"
      selection="multiple"
      :selected.sync="crud.selections"
      @row-click="(evt, row, index) => crud.selections = [row]"
    >
      <template v-slot:top-right="props">
        <div class='row q-col-gutter-x-sm q-col-gutter-y-xs q-px-sm q-py-sm full-width'>
          <coadmin-input class='col-auto' placeholder="名称、值" v-model="query.blurry" content-style="width:140px" clearable @keyup.enter.native="crud.toQuery"/>
          <div class='col-auto'>
            <q-btn dense padding="xs sm" color="primary" icon="search" @click="crud.toQuery" />
          </div>
          <q-space/>
          <crud-operation :permission="permission" no-view no-edit no-label/>
          <div class="col-auto">
            <q-btn-dropdown dense color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
              <crud-more :tableSlotTopProps="props" />
            </q-btn-dropdown>
          </div>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row :data="props.row" flat :permission="permission" :type="$q.screen.gt.xs?'button':'menu'"/>
        </q-td>
      </template>

      <template v-slot:pagination>
        <crud-pagination no-persistence-page-size/>
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
import crudDictDetail from '@/api/dictDetail.js'

const columns = [
  { name: 'id', field: 'id', label: 'ID' },
  {
    name: 'label',
    field: 'label',
    label: '名称',
    required: true,
    align: 'left',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'value', label: '值', field: 'value', align: 'left' },
  { name: 'sort', label: '排序', field: 'sort', align: 'left' },
  { name: 'action', label: '操作', align: 'center' }
]
const visibleColumns = ['label', 'value', 'sort', 'action']
const defaultForm = { id: null, label: null, value: null, sort: null, dict: { id: null } }

export default {
  name: 'PageCrudDictDetail',
  components: { crudOperation, crudMore, crudPagination, crudRow },
  cruds() {
    return CRUD({
      columns,
      visibleColumns,
      idField: 'id',
      query: { dictName: '' },
      title: '字典详情',
      sort: ['sort,asc', 'id,desc'],
      url: 'api/dictDetail',
      crudMethod: { ...crudDictDetail },
      queryOnPresenterCreated: false
    })
  },
  mixins: [presenter(), header(),
    form(function () {
      return Object.assign({ dict: { id: this.dictId } }, defaultForm)
    }),
    crud()
  ],
  data () {
    return {
      permission: {
        add: ['admin', 'dictDetail:add'],
        edit: ['admin', 'dictDetail:edit'],
        del: ['admin', 'dictDetail:del']
      },
      dictId: null
    }
  }
}
</script>
