<template>
  <div class="coadmin-page q-pa-sm q-gutter-sm">
    <coadmin-select v-model="popupTreeTickedLabel"
      placeholder="机构"
      multiple
      behavior="menu"
    >
      <q-popup-proxy>
        <coadmin-tree
          ref="popupTree"
          node-key="id"
          label-key="name"
          children-key="children"
          :nodes="treeDatas"
          no-connectors
          :ticked.sync="popupTreeTicked"
          @ticked-label="labels => popupTreeTickedLabel=labels"
          ticked-expand-auto
          tick-strategy="leaf-all-only-parent"
          filter-key-like="nameLetter"
          filter-key-equal="id"
          :no-filter="false"
          :no-expand-btn="false"
          expand-btn-icon-more="expand_more"
          expand-btn-icon-less="expand_less"
          filter-placeholder="过滤.."
          :filter-methodxxx="myFilterMethod"
          style="min-width:350px; max-height:60vh;"
          class="q-pa-sm"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <div class="text-weight-bold text-primary">{{ prop.node.label }}</div>
            </div>
          </template>

          <template v-slot:header-root="prop">
            <div class="row items-center">
              <div>
                {{ prop.node.label }}
                <q-badge color="orange" class="q-ml-sm">Header Root!</q-badge>
              </div>
            </div>
          </template>
          <template v-slot:header-test="{node}">
            <div class="row items-center">
              <div>
                {{ node.label }}
                <q-badge color="orange" class="q-ml-sm">Header Test!</q-badge>
              </div>
            </div>
          </template>
        </coadmin-tree>

      </q-popup-proxy>
    </coadmin-select>
  </div>
</template>

<script>
import depts from '../data/depts.js'
import CoadminTree from 'components/CoadminTree.vue'
import CoadminSelect from 'components/form/CoadminSelect.vue'

export default {
  name: 'PageTreeSelect',
  components: {
    CoadminTree,
    CoadminSelect
  },
  data () {
    return {
      popupTreeExpanded: [],
      popupTreeTicked: [],
      popupTreeTickedLabel: []
    }
  },
  mounted () {
  },
  computed: {
    treeDatas () {
      return depts.content
    }
  },
  watch: {
    popupTreeExpanded (val) {
      console.log('pageTreeSelect.popupTreeExpanded', this.popupTreeExpanded)
    },
    popupTreeTicked (val) {
      console.log('pageTreeSelect.popupTreeTicked', this.popupTreeTicked)
    }
  },
  methods: {
    myFilterMethod (node, filter) {
      if (!node) {
        return false
      }
      const filt = filter.toLowerCase()
      return (node.name && node.name.toLowerCase().indexOf(filt) > -1)
    }
  }
}
</script>
