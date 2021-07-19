<template>
  <div>
    <co-dialog
      ref="printDialog"
      title="打印"
      icon="print"
      >
      <q-card-section>
        <div class="text-h6">打印的标题</div>
        <div class="text-body2">这里是要打印的内容</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn dense label="关闭" flat v-close-popup />
        <q-btn dense label="打印" color="primary" @click="$q.notify({type:'info', message:'打印'})"/>
      </q-card-actions>
    </co-dialog>

    <co-dialog
      ref="formDialog"
      title="表单演示"
      no-backdrop-dismiss
      card-style="width:800px; max-width:95vw;"
    >
      <div class="q-ma-md ">
        <div class="row q-gutter-sm">
          <q-checkbox v-model="labelTop" label="label-top" />
          <co-input v-model.lazy="labelStyle" placeholder="form-label-style" style="width:255px"/>
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
      <co-form ref="dialogForm"
        @submit="onDialogFormSubmit"
        :label-top="labelTop"
        :label-align="labelAlign"
        :label-width="labelWidth"
        :form-label-style="labelStyle"
        class="q-pa-md row q-col-gutter-x-xl q-col-gutter-y-md">
          <co-input class="col-12 col-sm-6" form-label="ID" v-model="dialogForm.id" disable dense>
          </co-input>
          <co-input class="col-12 col-sm-6" form-label="名称很长怎么办名称很长怎么办名称很长怎么办" v-model="dialogForm.name" clearable :disable="dialogFormReadonly"
            @blur="$q.notify({message:'名称 blur notify'})"
            :rules="[val => !!val || 'Field is required']" dense/>
          <co-input class="col-12 col-sm-6" dense form-label="calories" label="标签" v-model="dialogForm.calories" :disable="dialogFormReadonly" ref="form_calories">
            <template v-slot:append>
              <q-icon v-if="!dialogForm.calories" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="dialogForm.calories = ''" />
            </template>
            <template v-slot:prepend>
              <q-icon name="add" />
            </template>
            <template v-slot:before>
              <q-icon name="expand_less" />
            </template>
            <template v-slot:after>
              <q-icon name="expand_more" />
            </template>
          </co-input>
          <co-input dense outlined class="col-12 col-sm-6" form-label="fat" v-model="dialogForm.fat" :disable="dialogFormReadonly" :rules="[
              val => !!val || '不能空',
              val => val.length === 11 || '请输入11个字符'
              ]"
              >
          </co-input>
          <co-input class="col-12 col-sm-6" form-label="protein" form-label-style="color:green" v-model="dialogForm.protein" :outlined="false"  :disable="dialogFormReadonly"></co-input>
          <co-input class="col-12 col-sm-6" form-label="sodium" form-label-style="background-color:grey" v-model="dialogForm.sodium" filled :disable="dialogFormReadonly"></co-input>
          <co-input class="col-12 col-sm-6" form-label="calcium" placeholder="calcium" v-model="dialogForm.calcium" :disable="dialogFormReadonly">
            <q-popup-proxy>
              <co-card>
                <div >ThisisPopup</div>
              </co-card>
            </q-popup-proxy>
          </co-input>
          <co-select
            class="col-12 col-sm-6"
            form-label="protein5"
            label="选择"
            outlined
            dense
            :disable="dialogFormReadonly"
            v-model="selectModel"
            no-filter
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            emit-value
            map-options
          />
          <co-input :dense="false" class="col-12 col-sm-6" form-label="big input" v-model="dialogForm.iron" clearable :disable="dialogFormReadonly">
          </co-input>
          <co-select
            :dense="false"
            v-model="selectModel"
            form-label="big select"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            clearable
            options-dense
            outlined
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            placeholder="选择巨头"
            :options="listOptions"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="add"/>
            </template>
          </co-select>
          <co-field
            class="col-12 col-sm-6"
            form-label="options"
            :disable="dialogFormReadonly"
          >
            <template v-slot:control>
              <div class="q-gutter-sm">
                <q-radio dense name="shape" v-model="selectModel" val="facebook" label="Facebook" />
                <q-radio dense name="shape" v-model="selectModel" val="腾讯" label="腾讯控股" />
              </div>
            </template>
          </co-field>
          <co-option-group
            v-model="selectModel"
            class="col-12 col-sm-6"
            :inline="true"
            form-label="optionsGroup"
            :disable="dialogFormReadonly"
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            :rules="[val => !!val || 'Field is required']"
          />
          <co-select
            v-model="selectModels"
            form-label="multiselect"
            class="col-12 col-sm-6"
            :disable="dialogFormReadonly"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            clearable
            outlined
            placeholder="选择巨头"
            :options="mapOptions"
            map-options
            emit-value
            multiple
            />
          <co-option-group
            v-model="selectModels"
            class="col-12 col-sm-6"
            :inline="true"
            form-label="optionsGroup"
            :disable="dialogFormReadonly"
            :options="mapOptions"
            option-value="id"
            option-label="desc"
            type="checkbox"
            :rules="[val => !!val || 'Field is required']"
          />
          <co-date
            v-model="selectDate"
            class="col-12 col-sm-6"
            form-label="TOP"
            label-top
            today-btn
            minimal
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          />
          <co-input class="col-12 col-sm-6" form-label="LEFT" label-align="left" label-width="large" no-ellipsis mask="####-##-##" placeholder="####-##-##" v-model="selectDate" :disable="dialogFormReadonly">
            <q-popup-proxy
              ref="popupDateinput"
            >
              <co-date v-model="selectDate" @input="$refs.popupDateinput.hide()">
              </co-date>
            </q-popup-proxy>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
          </co-input>
          <co-form-item class="col-12 col-sm-6" form-label="formField">
            <co-field borderless>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">语句用于基于不同条件执行不同动作</div>
              </template>
            </co-field>
          </co-form-item>
          <co-form-item class="col-12 col-sm-6" form-label="formField">
            <q-field borderless>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作</div>
              </template>
            </q-field>
          </co-form-item>
          <co-form-item dense class="col-12 col-sm-6" form-label="formtext">
            <div class="q-pt-xs">语句用于基于不同条件执行不同动作</div>
          </co-form-item>
          <co-form-item class="col-12 col-sm-6" form-label="formtext">
            <div class="q-pt-xs">
            语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作语句用于基于不同条件执行不同动作
            </div>
          </co-form-item>
          <co-form-item class="col-12 col-sm-6" form-label="RIGHT" label-align="right" label-width="small">
            <div class="row q-gutter-none">
              <q-radio v-model="shape" class="col-6 col-md-4" val="line" label="Line" />
              <q-radio v-model="shape" class="col-6 col-md-4" val="rectangle" label="Rectangle" />
              <q-radio v-model="shape" class="col-6 col-md-4" val="ellipse" label="Ellipse" />
              <q-radio v-model="shape" class="col-6 col-md-4" val="polygon" label="Polygon" />
            </div>
          </co-form-item>

          <co-date-select
            class="col-12 col-sm-6"
            form-label="no-ellipsis no-ellipsis no-ellipsis no-ellipsis"
            no-ellipsis
            v-model="dialogForm.date3"
            clearable
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </co-date-select>

          <co-date-select
            class="col-12 col-sm-6"
            form-label="DateRange"
            v-model="dialogForm.date2"
            form-label-style="color:grey"
            clearable
            range
            :disable="dialogFormReadonly"
            :rules="[val => !!val || 'Field is required']"
          >
            <template v-slot:append>
              <q-icon name="event" />
            </template>
          </co-date-select>
          <co-tree-select
            class="col-12 col-sm-6"
            form-label="TreeTicked"
            :nodes="treeDatas()"
            node-key="id"
            label-key="name"
            :ticked.sync="dialogForm.ticked"
            tick-strategy="leaf-all-only-parent"
            filter-key-like="nameLetter"
            filter-key-equal="id"
            tree-style="min-width:300px; max-height:70vh;"
            tree-class="q-pa-sm"
            :disable="dialogFormReadonly"
            clearable
            :rules="[val => !!val || 'Field is required']"
          />
      </co-form>
      <q-card-actions class="q-pa-md">
        <q-btn label="打印" color="primary" @click="$refs.printDialog.show()"/>
        <q-space />
        <q-btn label="取消" flat v-close-popup />
        <q-btn label="保存"  type="submit" color="primary" v-if="!dialogFormReadonly" @click="$refs.dialogForm.submit()"/>
      </q-card-actions>
    </co-dialog>

    <co-table
      row-key="id"
      dense
      stickyHeader
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      selection="multiple"
      :selected.sync="selected"
      :fullscreen.sync="tableFullscreen"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <div class='col-auto q-pl-none q-gutter-sm no-wrap'>
            <q-btn dense color="primary" icon="add" @click="rowAddClick"/>
            <q-btn dense color="primary" icon="edit" @click="rowEditClick_selected" :disable="selected.length!==1"/>
            <q-btn dense color="primary" icon="delete" @click="rowDelClick_selected" :disable="selected.length===0"/>
            <q-btn-dropdown auto-close dense icon="more_vert" color="primary" class="btn-dropdown-hide-droparrow">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-btn label="打开Coadmin对话框" @click="$refs.formDialog.show()"></q-btn>
                </div>
              </div>
            </q-btn-dropdown>
          </div>

          <q-space />

          <q-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          <q-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          <template v-if="searchToggle" >
            <q-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          </template>

          <q-space/>

          <q-btn-group flat rounded class="col-auto">
            <q-btn color="grey-3" text-color="dark" icon="search"/>
            <q-btn color="grey-3" text-color="dark" :icon="searchToggle?'zoom_out':'zoom_in'" @click="searchToggle = !searchToggle"/>
            <q-btn-dropdown auto-close color="grey-3" text-color="dark" class="btn-dropdown-hide-droparrow" icon="apps">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-btn flat label="清空搜索" icon="replay" @click="loading = !loading"/>
                  <q-btn flat label="全屏" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click.native="toggleTableFullscreen(props)"/>
                  <q-separator/>
                  <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                </div>
              </div>
            </q-btn-dropdown>
          </q-btn-group>

        </div>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
        </q-td>
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

              <q-item clickable v-close-popup dense @click="rowEditClick(props.row)">
                <q-item-section>
                  <q-item-label>修改</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup dense @click="rowDelClick(props.row)">
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

      <template v-slot:pagination>
        <q-pagination
          v-model="currentPage"
          :max="500"
          :direction-links="true"
          :boundary-links="false"
          input
          input-class="text-orange-10"
        />
        <q-select
          dense options-dense borderless
          flat
          v-model="numberPerPage"
          :options="numberPerPageOptions"
          emit-value
          map-options
        />
      </template>

    </co-table>
  </div>
</template>

<script>
import depts from '@/data/depts.js'
import { data, columns, visibleColumns } from '../data/test.js'

const dialogFormDefault = { id: null, name: null, calories: null, fat: null, protein: null, sodium: null, calcium: null, iron: null }

export default {
  name: 'PageTable',
  data () {
    return {
      labelTop: false,
      labelAlign: 'right',
      labelWidth: 'medium',
      labelStyle: '',
      text: '',
      textSearch: '',
      shape: '',
      selectModel: '',
      selectModels: [],
      selectDate: '',
      selectDateRange: { from: '2020-11-14', to: '2020-11-22' },
      listOptions: ['facebook', 'twitter', 'google', '阿里巴巴', '腾讯'],
      mapOptions: [
        {
          id: 'google',
          desc: 'Google'
        },
        {
          id: 'facebook',
          desc: 'Facebook'
        },
        {
          id: 'twitter',
          desc: 'Twitter'
        },
        {
          id: 'apple',
          desc: '苹果'
        },
        {
          id: '阿里巴巴',
          desc: '阿里巴巴集团'
        },
        {
          id: 'oracle',
          desc: 'Oracle',
          inactive: true
        },
        {
          id: '腾讯',
          desc: '腾讯控股'
        }
      ],
      currentPage: 0,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogForm: {},
      dialogFormReadonly: true,
      fabPos: [48, 68],
      draggingFab: false,
      selected: [],
      tableFullscreen: null,
      visibleColumns,
      columns: columns,
      data: data
    }
  },
  watch: {
    '$q.screen.gt.xs' (val) {
      console.log('$q.screen.gt.xs=' + val)
    }
  },
  created () {
    console.log('pageTable created')
  },
  mounted () {
    console.log('pageTable mounted')
  },
  activated () {
    console.log('pageTable activated')
  },
  deactivated () {
    console.log('pageTable deactivated')
  },
  destroyed () {
    console.log('pageTable destroyed')
  },
  methods: {
    treeDatas () {
      return depts.content
    },
    onDialogFormSubmit () {
      console.log('this.dialogForm:', this.dialogForm)
      if (this.dialogFormReadonly) {
        return
      }
      this.$refs.dialogForm.validate().then(success => {
        if (success) {
          // yay, models are correct
          this.$q.notify({
            type: 'positive',
            message: `提交ID:${this.dialogForm.id}`
          })
        } else {
          // oh no, user has filled in
          // at least one invalid value
          this.$q.notify({
            type: 'negative',
            message: '提交失败'
          })
        }
      })
    },
    rowViewClick (row) {
      this.dialogForm = { ...row }
      this.dialogFormReadonly = true
      this.$refs.formDialog.show()
    },
    rowAddClick () {
      this.dialogForm = { ...dialogFormDefault }
      this.dialogFormReadonly = false
      this.$refs.formDialog.show()
    },
    rowEditClick (row) {
      this.dialogForm = { ...row }
      this.dialogFormReadonly = false
      this.$refs.formDialog.show()
    },
    rowEditClick_selected () {
      var row = this.selected[0]
      this.rowEditClick(row)
    },
    rowDelClick (row) {
      this.$q.notify({
        type: 'warning',
        message: `删除ID:${row.id}`
      })
    },
    rowDelClick_selected () {
      var count = 0
      if (this.selected) {
        count = this.selected.length
      }
      this.$q.notify({
        type: 'negative',
        message: `删除${count}条`
      })
    },
    rowLooooooongButtonClick () {
      this.$q.notify({
        type: 'positive',
        message: 'rowLooooooongButtonClick'
      })
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    toggleTableFullscreen (props) {
      props.toggleFullscreen()
      this.$nextTick(() => {
        console.log('tableFullscreen=', this.tableFullscreen)
      })
    }
  }
}
</script>
