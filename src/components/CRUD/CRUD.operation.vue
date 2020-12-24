<!--
  插槽：
    start
    end
  属性：
    permission

    dense
    flat
    rounded
    round
    outline
    push
    unelevated
    glossy

    color-edit / color-view / color-del / color-add
    label-view / label-edit / label-del / label-add
    icon-edit / icon-view / icon-del / icon-add
    no-icon
    no-label
-->
<template>
  <div class="col-auto q-pl-none q-gutter-sm no-wrap">
    <!--左侧插槽-->
    <slot name="start" />
    <q-btn :dense="dense" :padding="(dense && computedLabelAdd)?'xs sm':''" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorAdd" :icon="computedIconAdd" :label="computedLabelAdd" v-if="!noAdd" @click="crud.toAdd"/>
    <q-btn :dense="dense" :padding="(dense && computedLabelView)?'xs sm':''" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorView" :icon="computedIconView" :label="computedLabelView" v-if="!noView && !(crud.selections.length!==1)" @click="crud.toView(crud.selections[0])"/>
    <q-btn :dense="dense" :padding="(dense && computedLabelEdit)?'xs sm':''" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorEdit" :icon="computedIconEdit" :label="computedLabelEdit" v-if="!noEdit && !(crud.selections.length!==1)" @click="crud.toEdit(crud.selections[0])"/>
    <q-btn :dense="dense" :padding="(dense && computedLabelDel)?'xs sm':''" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorDel" :icon="computedIconDel" :label="computedLabelDel" v-if="!noDel && !(crud.selections.length===0)"
      @click="$refs.dialogDelete.show()"
      :loading="crud.delAllLoading"
      />
    <!--右侧插槽-->
    <slot name="end" />
    <coadmin-dialog ref="dialogDelete" no-max title="删除" content-style="width:250px; max-width:95vw;">
      <q-card-section>
        <div class="text-body1">删除选中的 {{crud.selections.length}} 条数据?</div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn label="取消" v-close-popup flat />
        <q-btn label="是的" v-close-popup icon="check" color="primary" @click="doDelete(crud.selections)" />
      </q-card-actions>
    </coadmin-dialog>
  </div>
</template>
<script>
import { crud } from './crud'

export default {
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => { return {} }
    },

    noAdd: Boolean,
    noView: Boolean,
    noEdit: Boolean,
    noDel: Boolean,
    noDownload: Boolean,

    flat: Boolean,
    rounded: Boolean,
    round: Boolean,
    outline: Boolean,
    push: Boolean,
    unelevated: Boolean,
    glossy: Boolean,
    dense: {
      type: Boolean,
      default: true
    },

    colorView: {
      type: String,
      default: 'secondary'
    },
    colorAdd: {
      type: String,
      default: 'primary'
    },
    colorEdit: {
      type: String,
      default: 'positive'
    },
    colorDel: {
      type: String,
      default: 'negative'
    },
    iconView: {
      type: String,
      default: 'visibility'
    },
    iconAdd: {
      type: String,
      default: 'add'
    },
    iconEdit: {
      type: String,
      default: 'edit'
    },
    iconDel: {
      type: String,
      default: 'delete'
    },
    labelView: {
      type: String,
      default: '查看'
    },
    labelAdd: {
      type: String,
      default: '新增'
    },
    labelEdit: {
      type: String,
      default: '修改'
    },
    labelDel: {
      type: String,
      default: '删除'
    },
    noIcon: Boolean,
    noLabel: Boolean
  },
  computed: {
    computedLabelView () {
      if (!this.$q.screen.gt.xs && this.iconView) {
        return undefined
      }
      if (this.labelView && !this.noLabel) {
        return this.labelView
      } else {
        return undefined
      }
    },
    computedLabelAdd () {
      if (!this.$q.screen.gt.xs && this.iconAdd) {
        return undefined
      }
      if (this.labelAdd && !this.noLabel) {
        return this.labelAdd
      } else {
        return undefined
      }
    },
    computedLabelEdit () {
      if (!this.$q.screen.gt.xs && this.iconEdit) {
        return undefined
      }
      if (this.labelEdit && !this.noLabel) {
        return this.labelEdit
      } else {
        return undefined
      }
    },
    computedLabelDel () {
      if (!this.$q.screen.gt.xs && this.iconDel) {
        return undefined
      }
      if (this.labelDel && !this.noLabel) {
        return this.labelDel
      } else {
        return undefined
      }
    },
    computedIconView () {
      if (this.iconView && !this.noIcon) {
        return this.iconView
      } else {
        return undefined
      }
    },
    computedIconAdd () {
      if (this.iconAdd && !this.noIcon) {
        return this.iconAdd
      } else {
        return undefined
      }
    },
    computedIconEdit () {
      if (this.iconEdit && !this.noIcon) {
        return this.iconEdit
      } else {
        return undefined
      }
    },
    computedIconDel () {
      if (this.iconDel && !this.noIcon) {
        return this.iconDel
      } else {
        return undefined
      }
    }
  },
  methods: {
    doDelete (datas) {
      this.crud.delAllLoading = true
      this.crud.doDelete(datas)
    }
  }
}
</script>
