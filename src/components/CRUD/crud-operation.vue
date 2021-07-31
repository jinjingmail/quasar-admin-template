<!--
  插槽：
    start
    end
  属性：
    permission
    hide-disable
    disable

    dense
    size
    padding

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
    no-edit / no-view / no-del / no-add
    msg-del
    no-icon
    no-label
-->
<template>
  <div class="q-gutter-sm no-wrap">
    <!--左侧插槽-->
    <slot name="start" />
    <q-btn :dense="dense" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorView" :icon="computedIconView" :label="computedLabelView"
      :disable="crud.selections.length!==1"
      v-if="!noView || hideDisable" @click="crud.toView(crud.selections[0])"/>
    <q-btn :dense="dense" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.edit"
      :color="colorEdit" :icon="computedIconEdit" :label="computedLabelEdit"
      :disable="crud.selections.length!==1"
      v-if="!noEdit || hideDisable" @click="crud.toEdit(crud.selections[0])"/>
    <q-btn :dense="dense" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.del"
      :color="colorDel" :icon="computedIconDel" :label="computedLabelDel"
      :disable="!crud.selections.length"
      v-if="!noDel || hideDisable"
      @click="$refs.dialogDelete.show()"
      :loading="crud.delAllLoading"
      />
    <q-btn :dense="dense" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.add"
      :color="colorAdd" :icon="computedIconAdd" :label="computedLabelAdd" v-if="!noAdd" @click="crud.toAdd"/>
    <!--右侧插槽-->
    <slot name="end" />
    <co-dialog ref="dialogDelete" no-max :title="labelDel" card-style="width:250px; max-width:95vw;" card-class="bg-deep-orange">
      <q-card-section>
        <div class="text-body1 text-white">
          <template v-if="msgDel">
            {{msgDel}}
          </template>
          <template v-else>
            删除选中的 {{crud.selections.length}} 条数据?
          </template>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-btn label="取消" v-close-popup flat :dense="dense" :size="size" :padding="padding" color="white"/>
        <q-btn label="是的" v-close-popup flat :dense="dense" :size="size" :padding="padding" icon="delete" color="white" @click="doDelete(crud.selections)" />
      </q-card-actions>
    </co-dialog>
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

    disable: Boolean,
    hideDisable: {
      type: Boolean
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

    dense: Boolean,
    size: String,
    padding: String,

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
    msgDel: String,
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
