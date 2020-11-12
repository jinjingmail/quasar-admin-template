<template>
  <q-page class="coadmin-page q-pa-sm q-gutter-sm">
    <q-select v-model="popupTreeTickedLabel"
      dense placeholder="机构"
      multiple
    >
      <q-popup-proxy>
        <q-card class="q-pa-sm">
          <q-card-section class="no-padding">
            <q-toolbar>
              <div class="row full-width">
                <q-input
                  ref="popupFilter"
                  dense
                  v-model="popupTreeDatasFilter"
                  label="Filter..."
                  class="col-8"
                >
                  <template v-slot:append>
                    <q-icon v-if="popupTreeDatasFilter !== ''" name="clear" class="cursor-pointer" @click="popupTreeDatasFilterReset" />
                  </template>
                </q-input>

                <q-space/>

                <q-btn class="col-auto"
                  dense
                  :icon="popupTreeDatasExpanded?'unfold_more':'unfold_less'"
                  @click="(popupTreeDatasExpanded = !popupTreeDatasExpanded)?$refs.popupTree.collapseAll():$refs.popupTree.expandAll()"
                />
              </div>
            </q-toolbar>
          </q-card-section>
          <coadmin-tree
            ref="popupTree"
            node-key="id"
            label-key="name"
            children-key="children"
            :nodes="treeDatas"
            no-connectors
            :filter="popupTreeDatasFilter"
            :filter-method="popupTreeDatasFilterMethod"
            :ticked.sync="popupTreeTicked"
            @ticked-label="labels => popupTreeTickedLabel=labels"
            ticked-auto-expand
            tick-strategy="leaf-all-only-parent"
            style="min-width:350px"
          >
          </coadmin-tree>
        </q-card>
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
      popupTreeDatasFilter: '',
      popupTreeDatasExpanded: true,
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
    }
  },
  methods: {
    popupTreeDatasFilterReset () {
      this.popupTreeDatasFilter = ''
      this.$refs.popupFilter.focus()
    },
    popupTreeDatasFilterMethod (node, filter) {
      const filt = filter.toLowerCase()
      return (node.name && node.name.toLowerCase().indexOf(filt) > -1) || (node.nameLetter && node.nameLetter.toLowerCase().indexOf(filt) > -1)
    }
  }
}
</script>
