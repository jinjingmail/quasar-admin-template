<template>
  <div >
    <co-table
      row-key="id"
      class=""
      stickyHeader
      stickyLastColumn
      :data="data"
      :columns="columns"
      :visible-columns="visibleColumns"
      selection="multiple"
      :selected.sync="selected"
      :fullscreen.sync="tableFullscreen"
      :loading="loading"
      loading-spinner="ios"
    >
      <template v-slot:top="props">
        <div class='row q-col-gutter-x-md q-col-gutter-y-xs full-width'>
          <co-input class="col" @click="$refs.searchPopup.show()" v-model="queryModel" standout  dense clearable placeholder="查询"
            input-class="text-center">
            <template v-slot:after>
              <q-btn color="primary" icon="search" @click="doQuery"/>
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

            <co-dialog ref="searchPopup"
              card-style="width:700px; max-width:95vw;"
              :loading="loading"
              loading-spinner="dots"
              square
              seamless>
              <co-form ref="searchform" label-width="small" label-align="right" class="q-pa-md">
                <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
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
                    tree-class="q-pa-sm"
                    clearable
                  />

                  <co-input ref="input1" class="col-12 col-sm-6" form-label="名称很长怎么办" v-model="query.name" clearable
                    @blur="$q.notify({message:'名称 blur notify'})"/>

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
                    tree-style="width:300px; max-height:70vh;"
                    tree-class="q-pa-sm"
                    clearable
                  />

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
                  <co-input dense outlined class="col-12 col-sm-6" form-label="fat" v-model="query.fat" lazy-rules :rules="[
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
                    form-label="单选map"
                    placeholder="选择"
                    v-model="query.selectSingle"
                    no-filter
                    :options="mapOptions"
                    option-value="id"
                    option-label="desc"
                    filter-key-like="letters"
                    filter-key-equal="id"
                    clearable
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    emit-value
                    map-options
                    @value-label="label => querySelectSingleLabel = label"
                  >
                    <template v-slot:prepend>
                      <q-icon name="add" />
                    </template>
                    <template v-slot:after>
                      <q-icon name="menu" />
                    </template>
                  </co-select>
                  <co-select
                    v-model="query.selectSingle"
                    form-label="单选list"
                    class="col-12 col-sm-6"
                    clearable
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    placeholder="选择巨头"
                    :options="listOptions"
                    @value-label="label => querySelectSingleLabel = label"
                  >
                  </co-select>
                  <co-field
                    class="col-12 col-sm-6"
                    form-label="options"
                  >
                    <template v-slot:control>
                      <div class="q-gutter-sm">
                        <q-radio dense name="shape" v-model="query.selectCompany" val="facebook" label="Facebook" />
                        <q-radio dense name="shape" v-model="query.selectCompany" val="腾讯" label="腾讯控股" />
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
                    v-model="query.dateRange"
                    clearable
                    :defaultTime ="[' 00:00:00',' 23:59:59']"
                    range
                  >
                  </co-date-select>
                  <co-date-select
                    class="col-12 col-sm-6"
                    form-label="date3"
                    placeholder="日期单选"
                    v-model="query.dateSingle"
                  >
                  </co-date-select>

                  <co-option-group
                    v-model="query.selectSingle"
                    class="col-12 col-sm-6"
                    :inline="true"
                    form-label="optionsGroup"
                    :options="mapOptions"
                    option-label="desc"
                    option-value="id"
                    @value-label="label => querySelectSingleLabel = label"
                  />
                  <co-option-group
                    v-model="query.selectMultiple"
                    class="col-12 col-sm-6"
                    :inline="true"
                    form-label="optionsGroup"
                    :options="mapOptions"
                    option-label="desc"
                    option-value="id"
                    type="checkbox"
                    @value-label="labels => querySelectMultipleLabels = labels"
                  />
                  <co-select
                    class="col-12 col-sm-6"
                    form-label="多选"
                    v-model="query.selectMultiple"
                    no-filter
                    :options="mapOptions"
                    option-value="id"
                    option-label="desc"
                    filter-key-like="letters"
                    clearable
                    use-input
                    input-debounce="0"

                    map-options
                    multiple
                    emit-value
                    @value-label="labels => querySelectMultipleLabels = labels"
                  />

                </div>
              </co-form>
              <q-card-actions align="center">
                <q-btn label="关闭" flat v-close-popup />
                <q-btn label="查询" type="submit" color="primary" icon="search" v-close-popup @click="doQuery">
                </q-btn>
              </q-card-actions>
            </co-dialog>
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
import { listOptions, mapOptions } from '../data/options.js'

export default {
  name: 'PageSearchDialog',
  data () {
    return {
      query: { name: '小明', selected: 7, ticked: [7, 49], selectSingle: 'facebook', selectMultiple: ['twitter', 'apple'] },
      querySelectedLabel: '',
      queryTickedLabels: null,
      querySelectSingleLabel: null,
      querySelectMultipleLabels: null,
      shape: '',
      selectModel: '',
      selectModels: [],
      selectDate: '',
      selectDateRange: { from: '2020-11-14', to: '2020-11-22' },
      listOptions: listOptions,
      mapOptions: mapOptions,
      currentPage: 0,
      numberPerPage: 10,
      numberPerPageOptions: [{ label: '10/页', value: 10 }, { label: '20/页', value: 20 }, { label: '30/页', value: 30 }, { label: '40/页', value: 40 }, { label: '50/页', value: 50 }, { label: '100/页', value: 100 }],
      loading: false,
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
            console.log('range=', range)
            if (range) labels.push('[' + range.join(',') + ']')
          } else if (key === 'selectSingle') {
            if (this.querySelectSingleLabel) labels.push(this.querySelectSingleLabel)
          } else if (key === 'selectMultiple') {
            if (this.querySelectMultipleLabels) labels.push('[' + this.querySelectMultipleLabels.join(',') + ']')
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
          this.querySelectSingleLabel = null
          this.querySelectMultipleLabels = null
          for (const key of Object.keys(this.query)) {
            this.query[key] = null
          }
        } else {
          // nothing
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
    toggleTableFullscreen (props) {
      props.toggleFullscreen()
      this.$nextTick(() => {
        console.log('tableFullscreen=', this.tableFullscreen)
      })
    }
  }
}
</script>
