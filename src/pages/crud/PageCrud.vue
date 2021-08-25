<!--
  crud/crud.js 最精简的用法
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
        class="q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md">
          <co-form-item class="col-12" form-label="ID" v-if="form.id">
            <div class="q-mt-xs">{{form.id}}</div>
          </co-form-item>
          <co-input class="col-12 col-sm-6" form-label="name" autofocus v-model="form.name" :disable="!!crud.status.view" :rules="[
              val => (val && val.length >= 3) || '请输入3个以上字符'
              ]">
            <template v-slot:append>
              <q-icon name="title" />
            </template>
          </co-input>
          <co-input class="col-12 col-sm-6" form-label="fat" v-model="form.fat" :disable="!!crud.status.view" />
      </co-form>
      <q-card-actions class="q-pa-md" align="right">
        <co-btn label="取消" flat v-close-popup/>
        <co-btn label="保存" color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
      </q-card-actions>
    </co-dialog>

    <co-table
      ref="table"
      row-key="id"
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      :selected.sync="crud.selections"
      selection="multiple"
    >
      <template v-slot:top="props">
        <div class='row full-width'>
          <co-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" clearable placeholder="查询"
                input-class="text-center" @clear="crud.resetQuery()">
            <template v-slot:before>
              <crud-operation :permission="permission" />
            </template>
            <template v-slot:after>
              <co-btn color="primary" icon="search" @click="crud.toQuery"/>
              <co-btn-dropdown color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
                <crud-more :tableSlotTopProps="props" />
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
              </co-form>
              <q-card-actions class="q-pa-md" align="center">
                <co-btn label="关闭" flat v-close-popup />
                <co-btn label="查询" v-close-popup color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
              </q-card-actions>
            </co-dialog>
          </co-input>
        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row :data="props.row" flat :permission="permission"/>
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

import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrud',
  components: { CrudOperation, CrudMore, CrudPagination, CrudRow },
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
      querysLabel: ''
    }
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
          const v = this.query[key]
          if (v) labels.push(v)
        }
        return labels.join(', ')
      },
      set (val) {
      }
    }
  }
}
</script>
