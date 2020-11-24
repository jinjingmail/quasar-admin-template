<template>
  <div >
    <coadmin-table
      row-key="id"
      dense
      flat
      class="q-pa-sm "
      separator="cell"
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
            <q-btn dense color="primary" icon="add" />
            <q-btn dense color="primary" icon="edit" :disable="selected.length!==1"/>
            <q-btn dense color="primary" icon="delete" :disable="selected.length===0"/>
            <q-btn-dropdown auto-close dense icon="more_vert" color="primary" class="btn-dropdown-hide-droparrow">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-btn label="打开Coadmin对话框" @click="$refs.formDialog.show()"></q-btn>
                </div>
              </div>
            </q-btn-dropdown>
          </div>

          <q-space />

          <coadmin-input class="col-sm-12 col-md" v-model="queryModel" filled clearable placeholder="查询">
            <q-popup-proxy breakpoint="500">
              <q-card style="width:550px; max-width:95vw;" class="coadmin-popup">
                <q-card-section>
                  <coadmin-form ref="searchform" label-width="medium" label-position="top">
                    <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                      <coadmin-tree-input
                        class="col-12"
                        form-label="Tree"
                        placeholder="Tree多选"
                        :nodes="treeDatas()"
                        node-key="id"
                        label-key="name"
                        :ticked.sync="query.ticked"
                        @ticked-label="labels => queryTickedLabels = labels"
                        ticked-expand-auto
                        tick-strategy="leaf-all-only-parent"
                        filter-key-like="nameLetter"
                        filter-key-equal="id"
                        tree-style="min-width:300px; max-height:70vh;"
                        tree-class="q-pa-sm"
                      />

                      <coadmin-tree-input
                        class="col-12 col-sm-6"
                        form-label="TreeSingle"
                        placeholder="Tree单选"
                        :nodes="treeDatas()"
                        node-key="id"
                        label-key="name"
                        selectable
                        :selected.sync="query.selected"
                        @selected-label="label => querySelectedLabel = label"
                        filter-key-like="nameLetter"
                        filter-key-equal="id"
                        tree-style="min-width:300px; max-height:70vh;"
                        tree-class="q-pa-sm"
                      />

                      <coadmin-input ref="input1" class="col-12" form-label="名称很长怎么办" v-model="query.name" clearable
                        @blur="$q.notify({message:'名称 blur notify'})"/>
                      <coadmin-input ref="input2" outlined class="col-12 col-sm-6" form-label="calories" label="标签" v-model="query.calories">
                        <template v-slot:append>
                          <q-icon v-if="!query.calories" name="search" />
                          <q-icon v-else name="clear" class="cursor-pointer" @click="query.calories = ''" />
                        </template>
                        <template v-slot:before>
                          <q-icon name="expand_less" />
                        </template>
                        <template v-slot:after>
                          <q-icon name="add" />
                        </template>
                      </coadmin-input>
                      <coadmin-input class="col-12 col-sm-6" form-label="fat" v-model="query.fat" lazy-rules :rules="[
                          val => !!val || '不能空',
                          val => val.length === 11 || '请输入11个字符'
                          ]"
                          >
                      </coadmin-input>
                      <coadmin-input ref="input4" class="col-12 col-sm-6" form-label="protein" v-model="query.protein" filled ></coadmin-input>
                      <coadmin-input class="col-12 col-sm-6" form-label="sodium" v-model="query.sodium" :outlined="false" ></coadmin-input>
                      <coadmin-input class="col-12 col-sm-6" form-label="calcium" placeholder="calcium" v-model="query.calcium" >
                        <q-popup-proxy breakpoint="0">
                          <q-card>
                            <div >ThisisPopup</div>
                          </q-card>
                        </q-popup-proxy>
                      </coadmin-input>
                      <coadmin-input class="col-12 col-sm-6" form-label="iron" placeholder="places" label-slot v-model="query.iron" clearable >
                        <template v-slot:label>
                          <div style="color:red;">iron in slot</div>
                        </template>
                      </coadmin-input>
                      <coadmin-select
                        class="col-12 col-sm-6"
                        form-label="protein5"
                        label="选择"
                        dense
                        options-dense
                        outlined
                        v-model="query.selectCompany"
                        no-filter
                        :options="mapOptions"
                        option-value="id"
                        option-label="desc"
                        option-disable="inactive"
                        clearable
                        emit-value
                        map-options
                      >
                        <template v-slot:prepend>
                          <q-icon name="add" />
                        </template>
                        <template v-slot:after>
                          <q-icon name="menu" />
                        </template>
                      </coadmin-select>
                      <coadmin-select
                        v-model="query.selectCompany"
                        form-label="protein2"
                        class="col-12 col-sm-6"
                        clearable
                        options-dense
                        outlined
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        placeholder="选择巨头"
                        :options="listOptions"
                      >
                        <template v-slot:after>
                          <q-icon name="menu" />
                        </template>
                      </coadmin-select>
                      <coadmin-field
                        class="col-12 col-sm-6"
                        form-label="options"
                      >
                        <template v-slot:control>
                          <div class="q-gutter-sm">
                            <q-radio dense name="shape" v-model="query.selectCompany" val="facebook" label="Facebook" />
                            <q-radio dense name="shape" v-model="query.selectCompany" val="腾讯" label="腾讯控股" />
                          </div>
                        </template>
                      </coadmin-field>
                      <coadmin-input class="col-12 col-sm-6" label-position="right"
                        mask="####-##-##"
                        placeholder="####-##-##" form-label="dateinput"
                        v-model="query.date" >
                        <q-popup-proxy
                          ref="popupDateinput"
                        >
                          <coadmin-date v-model="query.date" @input="$refs.popupDateinput.hide()">
                          </coadmin-date>
                        </q-popup-proxy>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                          </q-icon>
                        </template>
                      </coadmin-input>
                      <coadmin-date-input
                        class="col-12"
                        form-label="date2"
                        placeholder="日期范围选"
                        range-separator=" 至 "
                        v-model="query.dateRange"
                        clearable
                        range
                      >
                        <template v-slot:append>
                          <q-icon name="event" />
                        </template>
                      </coadmin-date-input>
                      <coadmin-date-input
                        class="col-12 col-sm-6"
                        form-label="date3"
                        placeholder="日期单选"
                        v-model="query.dateSingle"
                      >
                        <template v-slot:append>
                          <q-icon name="event" />
                        </template>
                      </coadmin-date-input>

                    </div>
                  </coadmin-form>

                </q-card-section>
                <q-card-actions align="center">
                  <q-btn label="查询" type="submit" color="primary" icon="search">
                  </q-btn>
                  <q-btn label="清空" flat v-close-popup />
                  <q-btn label="关闭" flat v-close-popup />
                </q-card-actions>

              </q-card>
            </q-popup-proxy>
            <template v-slot:after>
              <q-btn dense  color="primary" icon="search"/>
              <q-btn-dropdown dense auto-close color="primary" class="btn-dropdown-hide-droparrow" icon="apps">
                <div class="row no-wrap q-pa-sm">
                  <div class="column">
                    <q-btn flat label="清空搜索" icon="replay" @click="loading = !loading"/>
                    <q-btn flat label="全屏" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click.native="toggleTableFullscreen(props)"/>
                    <q-separator/>
                    <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                  </div>
                </div>
              </q-btn-dropdown>
            </template>

          </coadmin-input>

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

    </coadmin-table>
  </div>
</template>

<script>
import depts from '../data/depts.js'

export default {
  name: 'PageTable2',
  data () {
    return {
      query: { selected: 7, ticked: [7, 49] },
      querySelectedLabel: '',
      queryTickedLabels: null,
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
      loading: false,
      fabPos: [48, 68],
      draggingFab: false,
      selected: [],
      tableFullscreen: null,
      visibleColumns: ['id', 'name', 'calories', 'fat', 'protein', 'sodium', 'calcium', 'iron', 'action'],
      columns: [
        { name: 'id', label: 'ID', field: 'id' },
        {
          name: 'name',
          field: 'name',
          required: true,
          label: '名称',
          align: 'left',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: row => row.fat, sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron1', label: 'Iron1 (%)', field: 'iron1' },
        { name: 'iron2', label: 'Iron2 (%)', field: 'iron2' },
        { name: 'iron3', label: 'Iron3 (%)', field: 'iron3' },
        { name: 'iron4', label: 'Iron4 (%)', field: 'iron4' },
        { name: 'iron5', label: 'Iron5 (%)', field: 'iron5' },
        { name: 'iron6', label: 'Iron6 (%)', field: 'iron6' },
        { name: 'iron7', label: 'Iron7 (%)', field: 'iron7' },
        { name: 'iron8', label: 'Iron8 (%)', field: 'iron8' },
        { name: 'iron9', label: 'Iron9 (%)', field: 'iron9' },
        { name: 'action', label: '操作', align: 'center' }
      ],
      data: [
        {
          id: 1,
          name: '冰棍',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          id: 2,
          name: '冰淇淋',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%长长的一个数据'
        },
        {
          id: 3,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          id: 4,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          id: 5,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          id: 6,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          id: 10,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          id: 20,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          id: 30,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          id: 40,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        },
        {
          id: 1000, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1001, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1002, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1003, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1004, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1005, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1006, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1007, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1008, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1009, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1010, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1011, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1012, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1013, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1014, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1015, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1016, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1017, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1018, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1019, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        },
        {
          id: 1020, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
        }
      ]
    }
  },
  watch: {
  },
  mounted () {
  },
  computed: {
    queryModel: {
      get () {
        // const values = Object.values(this.query)
        // return values.filter(item => { return typeof item === 'number' ? true : item && item.length && item.length > 0 }).join(', ')
        const labels = []
        for (const key of Object.keys(this.query)) {
          if (key === 'selected') {
            if (this.querySelectedLabel) labels.push(this.querySelectedLabel)
          } else if (key === 'ticked') {
            if (this.queryTickedLabels) labels.push('[' + this.queryTickedLabels.join(',') + ']')
          } else if (key === 'dateRange') {
            const range = this.query[key]
            if (range) labels.push('[' + range.join(',') + ']')
          } else {
            const v = this.query[key]
            if (v) labels.push(v)
          }
        }
        return labels.join(', ')
      },
      set (val) {
        if (!val) {
          this.query = {}
        } else {
          // nothing
        }
      }
    }
  },
  methods: {
    treeDatas () {
      return depts.content
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
