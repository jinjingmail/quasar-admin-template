<!--
  插槽：
    start
    end
  属性：
    permission
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
    has-download / color-download / icon-download / label-download
-->
<template>
  <div class="q-gutter-sm no-wrap">
    <!--左侧插槽-->
    <slot name="start" />
    <co-btn :dense="_dense()" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.add"
      :color="colorAdd" :icon="computedIconAdd" :label="computedLabelAdd" v-if="!noAdd" @click="crud.toAdd"/>
    <co-btn :dense="_dense()" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.del"
      :color="colorDel" :icon="computedIconDel" :label="computedLabelDel"
      :disable="!crud.selections.length"
      v-if="!noDel"
      @click="$refs.dialogDelete.show()"
      :loading="crud.delAllLoading"
      />
    <co-btn :dense="_dense()" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" v-permission="permission.edit"
      :color="colorEdit" :icon="computedIconEdit" :label="computedLabelEdit"
      :disable="crud.selections.length!==1"
      v-if="!noEdit" @click="crud.toEdit(crud.selections[0])"/>
    <co-btn :dense="_dense()" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorView" :icon="computedIconView" :label="computedLabelView"
      :disable="crud.selections.length!==1"
      v-if="!noView" @click="crud.toView(crud.selections[0])"/>
    <co-btn :dense="_dense()" :size="size" :padding="padding" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
      :color="colorDownload" :icon="computedIconDownload" :label="computedLabelDownload" v-if="hasDownload" @click="crud.doDownload"
      :loading="crud.downloadLoading"/>
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
        <co-btn label="取消" v-close-popup flat :dense="_dense()" :size="size" :padding="padding" color="white"/>
        <co-btn label="是的" v-close-popup flat :dense="_dense()" :size="size" :padding="padding" icon="delete" color="white" @click="doDelete(crud.selections)" />
      </q-card-actions>
    </co-dialog>
  </div>
</template>
<script>
import { crud } from './crud'
import Setting from '@/default-setting'

export default {
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => { return {} }
    },

    disable: Boolean,
    noAdd: Boolean,
    noView: Boolean,
    noEdit: Boolean,
    noDel: Boolean,
    hasDownload: {
      type: Boolean,
      default: false
    },

    flat: {
      type: Boolean,
      default: undefined
    },
    outline: {
      type: Boolean,
      default: undefined
    },
    push: {
      type: Boolean,
      default: undefined
    },
    unelevated: {
      type: Boolean,
      default: undefined
    },
    glossy: {
      type: Boolean,
      default: undefined
    },

    round: {
      type: Boolean,
      default: undefined
    },
    rounded: {
      type: Boolean,
      default: undefined
    },

    dense: {
      type: Boolean,
      default: undefined
    },
    size: String,
    padding: String,

    colorView: {
      type: String,
      default: 'info'
    },
    colorAdd: {
      type: String,
      default: 'positive'
    },
    colorEdit: {
      type: String,
      default: 'positive'
    },
    colorDel: {
      type: String,
      default: 'negative'
    },
    colorDownload: {
      type: String,
      default: 'warning'
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
    iconDownload: {
      type: String,
      default: 'vertical_align_bottom'
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
    labelDownload: {
      type: String,
      default: '导出'
    },
    msgDel: String,
    noIcon: Boolean,
    noLabel: Boolean
  },
  computed: {
    computedLabelView () {
      if (this.labelView && !this.noLabel) {
        return this.labelView
      } else {
        return undefined
      }
    },
    computedLabelAdd () {
      if (this.labelAdd && !this.noLabel) {
        return this.labelAdd
      } else {
        return undefined
      }
    },
    computedLabelEdit () {
      if (this.labelEdit && !this.noLabel) {
        return this.labelEdit
      } else {
        return undefined
      }
    },
    computedLabelDel () {
      if (this.labelDel && !this.noLabel) {
        return this.labelDel
      } else {
        return undefined
      }
    },
    computedLabelDownload () {
      if (this.labelDownload && !this.noLabel) {
        return this.labelDownload
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
    computedIconDownload () {
      if (this.iconDownload && !this.noIcon) {
        return this.iconDownload
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
    },
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    }
  }
}
</script>
