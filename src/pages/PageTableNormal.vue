<template>
  <q-page class="q-pa-sm q-gutter-sm">

    <q-dialog v-model="dialogData"
      content-class="coadmin-dialog"
      :maximized="dialogFullscreen"
      persistent
      :no-esc-dismiss="false"
    >
      <q-card id="dragableDialog" v-drag="{dragOutY:45}"
        style="max-width:none;"
      >
        <q-toolbar>
          <q-avatar>
            <q-icon name="edit"/>
          </q-avatar>

          <q-toolbar-title><div>菜单</div></q-toolbar-title>

          <q-btn flat round dense :icon="dialogFullscreen?'fullscreen_exit':'fullscreen'" @click="dialogFullscreen = !dialogFullscreen"/>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section class="q-pt-none">
          <q-form class="coadmin-form">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <label>姓名</label>
                <q-input outlined v-model="text" dense placeholder="place" no-error-icon :rules="[val => !!val || 'Field is required']"/>
              </div>
              <div class="col-12 col-sm-6">
                <label>性别</label>
                <q-input outlined v-model="text" no-error-icon dense/>
              </div>
              <div class="col-12 col-sm-6">
                <label>手机</label>
                <q-input outlined v-model="text" no-error-icon :rules="[
                  val => !!val || '不能空',
                  val => val.length === 11 || '请输入11个字符'
                  ]" dense/>
              </div>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-table
      class="coadmin-table"
      :style="{height:($q.screen.gt.xs?'calc(91.5vh)':'auto')}"
      :virtual-scroll="$q.screen.gt.xs"
      dense flat
      :wrap-cells="true"
      :data="data"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
      separator="horizontal"
      :hide-pagination="true"
      :rows-per-page-options="[0]"
      no-data-label="无数据"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
    >
      <template v-slot:top>
        <div class='row q-col-gutter-md' style="width:100%;">
          <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3" dense placeholder="姓名"/>
          <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3" dense placeholder="姓名"/>
          <template v-if="searchToggle" >
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3" dense placeholder="姓名"/>
          </template>
          <q-btn-group outline class="col-xs-6 col-sm-4 col-md-3">
            <q-btn dense outline color="primary" label="查询"/>
            <q-separator dark vertical />
            <q-btn dense outline color="primary" label="Reset"/>
          </q-btn-group>
        </div>
        <q-toolbar class="no-padding">
          <div class='q-gutter-sm'>
            <q-btn dense color="primary" icon="add" @click="loading = !loading"/>
            <q-btn dense color="primary" icon="edit"/>
            <q-btn dense color="primary" icon="delete"/>
          </div>

          <q-space />

          <q-btn-group outline>
            <q-btn dense outline color="primary" icon="search" @click="searchToggle = !searchToggle"/>
            <q-separator dark vertical />
            <q-btn dense outline color="primary" icon="autorenew" />
            <q-separator dark vertical />
            <q-btn dense outline color="primary" icon="apps" />
          </q-btn-group>

          <q-select
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            :options-cover="false"
            style="min-width: 150px"
          />
        </q-toolbar>
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

              <q-item clickable v-close-popup dense>
                <q-item-section>
                  <q-item-label>修改</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup dense>
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
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
    </q-table>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="fabPos">
      <q-btn fab-mini icon="keyboard_arrow_up" color="primary" v-touch-pan.capture="moveFab" v-touch-pan.prevent.mouse="moveFab" :disable="draggingFab"/>
    </q-page-scroller>

  </q-page>
</template>

<script>
export default {
  name: 'PageTableNormal',
  data () {
    return {
      text: '',
      textSearch: '',
      searchToggle: false,
      loading: false,
      dialogData: false,
      dialogFullscreen: false,
      fabPos: [8, 68],
      draggingFab: false,
      selected: [],
      visibleColumns: ['calories', 'name', 'protein', 'sodium', 'iron', 'action'],
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
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
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
          iron: '1%'
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
  methods: {
    rowViewClick (row) {
      this.dialogData = true
    },
    rowLooooooongButtonClick () {
    },
    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  }
}
</script>
