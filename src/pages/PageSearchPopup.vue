<template>
  <div >
    <co-table
      row-key="id"
      dense
      flat
      class=""
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
          <q-space />

          <co-input class="col" ref="searchInput" v-model="queryModel" outlined clearable placeholder="查询" input-class="text-center">
            <q-popup-proxy breakpoint="500" ref="searchPopup">
              <co-card style="width:550px; max-width:95vw;" class="co-popup">
                <q-card-section>
                  <co-form ref="searchform" label-width="small" label-align="right">
                    <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
                      <co-tree-select
                        ref="treeInputMultiple"
                        class="col-12"
                        form-label="Tree"
                        placeholder="Tree多选"
                        :nodes="treeDatas()"
                        node-key="id"
                        label-key="name"
                        :ticked.sync="query.ticked"
                        @ticked-label="labels => queryTickedLabels = labels"
                        tick-strategy="leaf-all-only-parent"
                        filter-key-like="nameLetter"
                        filter-key-equal="id"
                        tree-style="min-width:300px; max-height:70vh;"
                        tree-class="q-pa-sm"
                      />

                      <co-tree-select
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

                      <co-input ref="input1" class="col-12" form-label="名称很长怎么办" v-model="query.name" clearable
                        @blur="$q.notify({message:'名称 blur notify'})"/>
                      <co-input ref="input2" outlined class="col-12 col-sm-6" form-label="calories" label="标签" v-model="query.calories">
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
                      </co-input>
                      <co-input outlined class="col-12 col-sm-6" form-label="fat" v-model="query.fat" lazy-rules :rules="[
                          val => !!val || '不能空',
                          val => val.length === 11 || '请输入11个字符'
                          ]"
                          >
                      </co-input>
                      <co-input ref="input4" class="col-12 col-sm-6" form-label="protein" v-model="query.protein" filled ></co-input>
                      <co-input class="col-12 col-sm-6" form-label="sodium" v-model="query.sodium" :outlined="false" ></co-input>
                      <co-input class="col-12 col-sm-6" form-label="calcium" placeholder="calcium" v-model="query.calcium" >
                      </co-input>
                      <co-input class="col-12 col-sm-6" form-label="iron" placeholder="places" v-model="query.iron" clearable >
                      </co-input>
                      <co-select
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
                      </co-select>
                      <co-select
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
                      </co-select>
                      <co-field
                        class="col-12 col-sm-6"
                        form-label="options"
                      >
                        <template v-slot:control>
                          <div class="q-gutter-sm">
                            <co-radio name="shape" v-model="query.selectCompany" val="facebook" label="Facebook" />
                            <co-radio name="shape" v-model="query.selectCompany" val="腾讯" label="腾讯控股" />
                          </div>
                        </template>
                      </co-field>
                      <co-input class="col-12 col-sm-6" label-align="right"
                        mask="####-##-##"
                        placeholder="####-##-##" form-label="dateinput"
                        v-model="query.date" >
                        <q-popup-proxy
                          ref="popupDateinput"
                        >
                          <co-date v-model="query.date" @input="$refs.popupDateinput.hide()">
                          </co-date>
                        </q-popup-proxy>
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                          </q-icon>
                        </template>
                      </co-input>
                      <co-date-select
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
                      </co-date-select>
                      <co-date-select
                        class="col-12 col-sm-6"
                        form-label="date3"
                        placeholder="日期单选"
                        v-model="query.dateSingle"
                      >
                        <template v-slot:append>
                          <q-icon name="event" />
                        </template>
                      </co-date-select>

                    </div>
                  </co-form>

                </q-card-section>
                <q-card-actions align="center">
                  <co-btn label="关闭" flat v-close-popup />
                  <co-btn label="清空" flat v-close-popup />
                  <co-btn label="查询" type="submit" color="primary" icon="search" @click="doQuery">
                  </co-btn>
                </q-card-actions>

              </co-card>
            </q-popup-proxy>
            <template v-slot:after>
              <q-btn  color="primary" icon="search" @click="doQuery"/>
              <q-btn-dropdown auto-close color="primary" class="btn-dropdown-hide-droparrow" icon="apps">
                <div class="row no-wrap q-pa-sm">
                  <div class="column">
                    <q-btn flat label="全屏" :icon="props.inFullscreen?'fullscreen_exit':'fullscreen'" @click.native="toggleTableFullscreen(props)"/>
                    <q-separator/>
                    <q-toggle v-model="visibleColumns" v-for="item in columns" :key="item.name" :val="item.name" :label="item.label" />
                  </div>
                </div>
              </q-btn-dropdown>
            </template>

          </co-input>

        </div>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div>
            <q-badge color="purple" :label="props.value" />
          </div>
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
import depts from '../data/depts.js'
import { data, columns, visibleColumns } from '../data/test.js'

export default {
  name: 'PageSearchPopup',
  data () {
    return {
      query: { name: '小明', selected: 7, ticked: [7, 49] },
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
      visibleColumns: visibleColumns,
      columns: columns,
      data: data
    }
  },
  watch: {
  },
  created () {
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
          this.querySelectedLabel = null
          this.queryTickedLabels = null
          for (const key of Object.keys(this.query)) {
            this.query[key] = null
          }
        }
      }
    }
  },
  methods: {
    doQuery () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
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
