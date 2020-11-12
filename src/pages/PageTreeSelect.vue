<template>
  <q-page class="coadmin-page q-pa-sm q-gutter-sm">
    <q-select v-model="popupTreeTickedComputed" class=""
      dense placeholder="机构"
      multiple
    >
      <q-popup-proxy>
        <q-card class="q-pa-sm">
          <q-card-section>
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
            label-key="label"
            children-key="children"
            :nodes="treeDatas"
            no-connectors
            :filter="popupTreeDatasFilter"
            :filter-method="popupTreeDatasFilterMethod"
            :ticked.sync="popupTreeTicked"
            ticked-auto-expand
            tick-strategy="leaf-else-parent"
            selected-color="purple"
            no-nodes-label="无数据"
            no-results-label="无数据"
            class="bg-light"
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
      popupTreeTicked: []
    }
  },
  mounted () {
  },
  computed: {
    treeDatas () {
      return depts.content
    },
    popupTreeTickedComputed () {
      return this.treeKeyToLabel(this.popupTreeTicked)
    }

  },
  watch: {
    popupTreeExpanded (val) {
      console.log('pageTreeSelect.popupTreeExpanded', this.popupTreeExpanded)
    }
  },
  methods: {
    treeKeyToLabel (ids) {
      const a = []
      ids.forEach(id => {
        const node = this.findTreeNode(id)
        if (node && node.name) {
          a.push(node.name)
        }
      })
      return a
    },
    findTreeNode (key) {
      if (this.treeDatas) {
        for (const node of this.treeDatas) {
          if (node.id === key) {
            return node
          } else if (node.hasChildren) {
            const node2 = this.findTreeNode2(key, node.children)
            if (node2) {
              return node2
            }
          }
        }
      }
      return null
    },
    findTreeNode2 (key, nodeList) {
      for (const node of nodeList) {
        if (node.id === key) {
          return node
        } else if (node.hasChildren) {
          const node2 = this.findTreeNode2(key, node.children)
          if (node2) {
            return node2
          }
        }
      }
    },
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
