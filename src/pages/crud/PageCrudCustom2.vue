<!--
  CRUD/crud.js 自定义用法
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
        <q-btn label="确认" icon="check" color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
        <q-btn label="取消" flat v-close-popup/>
      </q-card-actions>
    </coadmin-dialog>

    <div class='row q-gutter-xs full-width q-pa-md'>
        <coadmin-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" clearable placeholder="查询"
              input-class="text-center" @clear="crud.resetQuery()">
          <template v-slot:after>
            <q-btn dense color="primary" icon="search" label="查询" @click="crud.toQuery"/>
          </template>
          <coadmin-dialog ref="searchPopup"
            seamless content-style="width:700px; max-width:95vw;">
            <coadmin-form ref="searchform" label-width="small" label-position="right" class="q-pa-md">
              <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                <coadmin-input class="col-12 col-sm-6" form-label="名字" v-model="query.name" clearable/>
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
              </div>
            </coadmin-form>
            <q-card-actions class="q-pa-md" align="center">
              <q-btn label="查询" v-close-popup color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
              <q-btn label="关闭" flat v-close-popup />
            </q-card-actions>
          </coadmin-dialog>
        </coadmin-input>
    </div>

    <coadmin-table
      ref="table"
      row-key="id"
      class="q-ma-xs"
      dense
      sticky-last-column
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      selection="multiple"
      :selected.sync="crud.selections"
    >
      <template v-slot:top="props">
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
          <crud-row :data="props.row" flat type="menu" label-menu="操作" :permission="permission"/>
        </q-td>
      </template>

      <template v-if="!$q.screen.gt.xs" v-slot:pagination>
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

import { columns, visibleColumns, defaultForm } from '@/data/test.js'

export default {
  name: 'PageCrudCustom2',
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
  },
  methods: {
    [CRUD.HOOK.beforeRefresh] () {
      console.log('pageCrud CRUD.HOOK.beforeRefresh')
      //this.page.size = 3
    }
  }
}
</script>
