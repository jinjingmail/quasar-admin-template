<template>
  <q-page class="coadmin-page q-pa-sm q-gutter-sm">
    <q-select v-model="popupTreeTickedLabel"
      dense placeholder="机构"
      multiple
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

          <template v-slot:default-body="prop">
            <div v-if="prop.node.label==='西南'">
              <span class="text-weight-bold">This node is</span>: {{ prop.node.label }}
            </div>
            <span v-else class="text-weight-light text-black">This is some default content.</span>
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
          <template v-slot:body-new="prop">
            <div class="row items-center">
              <div>
                {{ prop.node.label }}
                <q-badge color="orange" class="q-ml-sm">Body New</q-badge>
              </div>
            </div>
          </template>
        </coadmin-tree>

      </q-popup-proxy>
    </q-select>
  </q-page>
</template>

<script>
import depts from '../data/depts.js'
import CoadminTree from 'components/CoadminTree.vue'

export default {
  name: 'PageTreeSelect',
  components: {
    CoadminTree
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
