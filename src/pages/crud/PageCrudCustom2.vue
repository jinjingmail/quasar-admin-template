<!--
  crud/crud.js 自定义用法
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
          <co-field dense class="col-12" form-label="ID" :value="form.id" v-if="form.id" />
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
        <q-btn label="取消" flat v-close-popup/>
        <q-btn label="保存"  color="primary" v-if="!crud.status.view" @click="crud.submitCU"
          :loading="crud.status.cu === crud.STATUS_PROCESSING" :disable="crud.status.cu === crud.STATUS_PROCESSING"/>
      </q-card-actions>
    </co-dialog>

    <div class='row q-gutter-xs full-width q-pa-md'>
      <co-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" clearable placeholder="查询"
            input-class="text-center" @clear="crud.resetQuery()">
        <template v-slot:after>
          <q-btn dense color="primary" icon="search" label="查询" @click="crud.toQuery"/>
        </template>
        <co-dialog ref="searchPopup"
          seamless card-style="width:700px; max-width:95vw;">
          <co-form ref="searchform"
            label-width="small"
            label-align="right"
            class="q-pa-md row q-col-gutter-x-lg q-col-gutter-y-md">
              <co-input class="col-12 col-sm-6" form-label="名字" v-model="query.name" clearable/>
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
            <q-btn label="关闭" flat v-close-popup />
            <q-btn label="查询" v-close-popup color="primary" icon="search" @click="crud.toQuery" :loading="crud.loading" :disable="crud.loading"/>
          </q-card-actions>
        </co-dialog>
      </co-input>
    </div>

    <co-table
      ref="table"
      row-key="id"
      class=""
      dense
      sticky-last
      :data="crud.data"
      :columns="crud.columns"
      :visible-columns="crud.visibleColumns"
      :loading="crud.loading"
      :selected.sync="crud.selections"
      @row-click="(evt, row, index) => crud.selections = [row]"
      @row-dblclick="(evt, row, index) => crud.toView(row)"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <crud-operation dense :permission="permission" has-download no-label/>
          <div class="col-auto">
            <q-btn-dropdown dense color="primary" class="btn-dropdown-hide-droparrow" icon="apps" auto-close>
              <crud-more :tableSlotTopProps="props" />
            </q-btn-dropdown>
          </div>
          <q-space />

          <crud-pagination v-if="$q.screen.gt.xs" dense/>

        </div>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <crud-row :data="props.row" no-add flat type="menu" label-menu="操作" :permission="permission"/>
        </q-td>
      </template>

      <template v-if="!$q.screen.gt.xs" v-slot:pagination>
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
  name: 'PageCrudCustom2',
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
  },
  methods: {
    [CRUD.HOOK.beforeRefresh] () {
      console.log('pageCrud CRUD.HOOK.beforeRefresh')
      //this.page.size = 3
    }
  }
}
</script>
