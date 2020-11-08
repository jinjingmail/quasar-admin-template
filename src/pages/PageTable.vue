<template>
  <q-page class="coadmin-page q-pl-sm q-pr-sm q-gutter-sm">

    <coadmin-dialog
      v-model="dialogShow"
      title="对话框"
      icon="border_color"
      maxable
      persistent
    >
      <q-card >
        <q-card-section>
          <q-form ref="dialogForm" @submit="onDialogFormSubmit" class="coadmin-form">
            <div class="row q-col-gutter-md">
              <coadmin-input content-class="col-12 col-sm-6" form-label="ID" v-model="dialogForm.id" disable></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" form-label="名称" v-model="dialogForm.name" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" form-label="calories" v-model="dialogForm.calories" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" form-label="fat" v-model="dialogForm.fat" :disable="dialogFormReadonly" lazy-rules :rules="[
                  val => !!val || '不能空',
                  val => val.length === 11 || '请输入11个字符'
                  ]" />
              <coadmin-input content-class="col-12 col-sm-6" form-label="protein" v-model="dialogForm.protein" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" form-label="sodium" v-model="dialogForm.sodium" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" label="calcium" v-model="dialogForm.calcium" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
              <coadmin-input content-class="col-12 col-sm-6" label="iron" v-model="dialogForm.iron" :disable="dialogFormReadonly" lazy-rules></coadmin-input>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="提交" type="submit" color="primary" v-if="!dialogFormReadonly" @click="$refs.dialogForm.submit()"/>
          <q-btn label="Cancel" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </coadmin-dialog>

    <q-table
      row-key="id"
      dense
      flat
      class="coadmin-table coadmin-table-sticky-header-and-last-column"
      :style="{height:($q.screen.gt.xs?(tableFullscreen?'100vh':'calc(100vh - 50px - 36px - 3px)'):'auto')}"
      :virtual-scroll="$q.screen.gt.xs"
      separator="horizontal"
      :wrap-cells="false"
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      :hide-pagination="false"
      :rows-per-page-options="[7, 10, 15, 20, 25, 50]"
      no-data-label="无数据"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class="q-gutter-xs q-pl-sm">
        </div>

        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <div class='col-auto q-pl-none q-gutter-sm no-wrap'>
            <q-btn dense color="primary" icon="add" @click="rowAddClick"/>
            <q-btn dense color="primary" icon="border_color" @click="rowEditClick_selected" :disable="selected.length!==1"/>
            <q-btn dense color="primary" icon="delete" @click="rowDelClick_selected" :disable="selected.length===0"/>
            <q-btn-dropdown auto-close dense icon="more_vert" color="primary" class="btn-dropdown-hide-droparrow">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-btn label="打开Coadmin对话框" @click="dialogShow = true"></q-btn>
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

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span style="font-size:2em">
            {{ message }}
          </span>
        </div>
      </template>

      <template v-slot:paginationx>
        <q-pagination
          v-model="currentPage"
          :max="50000"
          :direction-links="true"
          :boundary-links="false"
          input
          input-class="text-orange-10"
        />
        <q-select
          dense options-dense outlined
          v-model="numberPerPage"
          :options="numberPerPageOptions"
          emit-value
          map-options
        />

      </template>

      <template v-slot:loading>
        <q-inner-loading showing color="primary" style="z-index:5">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </template>
    </q-table>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="fabPos">
      <q-btn fab-mini icon="keyboard_arrow_up" color="primary" v-touch-pan.capture="moveFab" v-touch-pan.prevent.mouse="moveFab" :disable="draggingFab"/>
    </q-page-scroller>

  </q-page>
</template>

<script>
import CoadminInput from 'components/form/CoadminInput.vue'
import CoadminDialog from 'components/CoadminDialog.vue'

const dialogFormDefault = { id: null, name: null, calories: null, fat: null, protein: null, sodium: null, calcium: null, iron: null }

export default {
  name: 'PageTable',
  components: {
    CoadminInput,
    CoadminDialog
  },
  data () {
    return {
      text: '',
      textSearch: '',
      currentPage: 0,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogShow: false,
      dialogForm: {},
      dialogFormReadonly: true,
      fabPos: [48, 68],
      draggingFab: false,
      selected: [],
      tableFullscreen: false,
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
    '$q.screen.gt.xs' (val) {
      console.log('$q.screen.gt.xs=' + this.$q.screen.gt.xs + ', val=' + val)
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
    // this.$refs.dialogForm.resetValidation()
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
      this.dialogShow = true
    },
    rowAddClick () {
      this.dialogForm = { ...dialogFormDefault }
      this.dialogFormReadonly = false
      this.dialogShow = true
    },
    rowEditClick (row) {
      this.dialogForm = { ...row }
      this.dialogFormReadonly = false
      this.dialogShow = true
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
      this.tableFullscreen = !props.inFullscreen
      props.toggleFullscreen()
      console.log(this.tableFullscreen)
    }
  }
}
</script>
