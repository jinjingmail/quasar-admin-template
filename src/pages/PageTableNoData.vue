<template>
  <div class="q-pa-sm">

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
          <q-btn label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <coadmin-table
      class="q-pa-sm"
      dense
      :wrap-cells="false"
      :data="data"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs' style="width:100%;">
          <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          <template v-if="searchToggle" >
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
            <q-input v-model="textSearch" class="col-xs-6 col-sm-4 col-md-3 col-lg-2" dense placeholder="姓名"/>
          </template>
          <q-btn-group outline class="col">
            <q-btn dense outline color="primary" label="查询"/>
            <q-separator vertical />
            <q-btn dense outline color="primary" label="Reset"/>
          </q-btn-group>
        </div>
        <q-toolbar class="no-padding">
          <div class='q-gutter-sm no-wrap'>
            <q-btn dense color="primary" icon="add" @click="rowViewClick"/>
            <q-btn dense color="primary" icon="edit"/>
            <q-btn dense color="primary" icon="delete"/>
          </div>

          <q-space />

          <q-btn-group outline>
            <q-btn dense :outline="!searchToggle" color="primary" icon="search" @click="searchToggle = !searchToggle"/>
            <q-separator vertical />
            <q-btn dense outline color="primary" icon="autorenew" @click="loading = !loading"/>
            <q-separator vertical/>
            <q-btn dense outline color="primary" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click="props.toggleFullscreen"/>
            <q-separator vertical/>
            <q-btn-dropdown auto-close outline dense no-icon-animation class="btn-dropdown-hide-droparrow" color="primary" icon="apps">
              <div class="row no-wrap q-pa-sm">
                <div class="column">
                  <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                </div>
              </div>
            </q-btn-dropdown>
          </q-btn-group>

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

      <template v-slot:pagination>
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
    </coadmin-table>

  </div>
</template>

<script>
export default {
  name: 'PageTableNoData',
  data () {
    return {
      text: '',
      textSearch: '',
      currentPage: 0,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      searchToggle: false,
      loading: false,
      dialogData: false,
      dialogFullscreen: false,
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
    }
  }
}
</script>
