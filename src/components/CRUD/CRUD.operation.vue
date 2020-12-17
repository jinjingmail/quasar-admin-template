<template>
  <div class="col-auto q-pl-none q-gutter-sm no-wrap">
    <!--左侧插槽-->
    <slot name="left" />
    <q-btn :dense="dense" :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="{'glossy':glossy}"
      :color="colorAdd" :icon="computedIconAdd" :label="noLabel?'':labelAdd" v-if="crud.optShow.add" @click="crud.toAdd"/>
    <q-btn dense :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="{'glossy':glossy}"
      :color="colorView" :icon="computedIconView" :label="noLabel?'':labelView" v-if="crud.optShow.view && !(crud.selections.length!==1)" @click="crud.toView(crud.selections[0])"/>
    <q-btn dense :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="{'glossy':glossy}"
      :color="colorEdit" :icon="computedIconEdit" :label="noLabel?'':labelEdit" v-if="crud.optShow.edit && !(crud.selections.length!==1)" @click="crud.toEdit(crud.selections[0])"/>
    <q-btn dense :flat="flat" :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="{'glossy':glossy}"
      :color="colorDel" :icon="computedIconDel" :label="noLabel?'':labelDel" v-if="crud.optShow.del && !(crud.selections.length===0)"
      @click="$refs.dialogDelete.show()"
      :loading="crud.delAllLoading"
      />
    <!--右侧插槽-->
    <slot name="right" />
    <coadmin-dialog ref="dialogDelete" no-max title="删除" content-style="width:250px; max-width:95vw;">
      <q-card-section>
        <div class="text-body1">删除选中的{{crud.selections.length}}条数据?</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="确认" v-close-popup icon="check" color="primary" @click="doDelete(crud.selections)" />
        <q-btn label="取消" v-close-popup flat />
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
      default: 'primary'
    },
    colorAdd: {
      type: String,
      default: 'primary'
    },
    colorEdit: {
      type: String,
      default: 'primary'
    },
    colorDel: {
      type: String,
      default: 'red-6'
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
      // TODO 实际使用需要去掉setTiemout
      setTimeout(() => {
        this.crud.doDelete(datas)
      }, 500)
    }
  }
}
</script>
