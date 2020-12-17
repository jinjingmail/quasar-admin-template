<!--
  插槽：
    left
    right
  属性：
    dense
    dense-menu
    flat
    rounded
    round
    outline
    push
    unelevated
    glossy

    color-menu
    label-menu
    icon-menu / icon-menu-open

    color-edit / color-view / color-del
    label-view / label-edit / label-del
    icon-edit / icon-view / icon-del
    no-wrap     多个按钮不出现换行
    no-icon
    no-label
-->
<template>
  <q-btn no-wrap v-if="type === 'menu'"
    :dense='dense' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="glossy?'glossy':''"
    :flat="flat"
    :icon-right="menuShow?iconMenuOpen:iconMenu"
    :label="labelMenu"
    :color="colorMenu"
    :loading="delLoading" :disable="delLoading">
    <q-menu ref="menu" :content-class="$q.dark.isActive?'bg-grey-9':''" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
      <q-list>
        <slot name="left" />
        <q-item clickable :class="'text-' + colorView" :dense="computedDenseMenu" @click="crud.toView(data)" v-if="!disabledView">
          <q-item-section avatar v-if="computedIconView">
            <q-icon :name="computedIconView" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{labelView}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :class="'text-' + colorEdit" :dense="computedDenseMenu" @click="crud.toEdit(data)" v-if="!disabledEdit">
          <q-item-section avatar v-if="computedIconEdit">
            <q-icon :name="computedIconEdit" />
          </q-item-section>
          <q-item-section>
            <q-item-label :color="colorEdit">{{labelEdit}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable :class="'text-' + colorDel" :dense="computedDenseMenu" v-if="!disabledDel">
          <q-item-section avatar v-if="computedIconDel">
            <q-icon :name="computedIconDel" />
          </q-item-section>
          <q-item-section>
            <q-item-label :color="colorDel">{{labelDel}}</q-item-label>
          </q-item-section>
          <q-popup-proxy>
            <q-card style="min-width: 160px;" :class="$q.dark.isActive?'bg-grey-9':''">
              <q-card-section class="bg-primary text-white">
                <div class="text-subtitle1 text-no-wrap">{{msg}}</div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right">
                <q-btn dense v-close-popup @click="doDelete">确定</q-btn>
                <q-btn dense v-close-popup flat>取消</q-btn>
              </q-card-actions>
            </q-card>
          </q-popup-proxy>
        </q-item>

        <slot name="right" />
      </q-list>
    </q-menu>
  </q-btn>

  <div v-else class="q-gutter-x-sm q-gutter-y-xs" :class="noWrap?'no-wrap':''">
    <slot name="left" />
    <q-btn @click="crud.toView(data)" v-if="!disabledView" no-wrap :dense='dense' :color="colorView" :icon="computedIconView" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="glossy?'glossy':''" :label="noLabel?'':labelView"/>
    <q-btn @click="crud.toEdit(data)" v-if="!disabledEdit" no-wrap :dense='dense' :color="colorEdit" :icon="computedIconEdit" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="glossy?'glossy':''" :label="noLabel?'':labelEdit"/>
    <q-btn v-if="!disabledDel" no-wrap :dense='dense' :color="colorDel" :icon="computedIconDel"   :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :class="glossy?'glossy':''" :label="noLabel?'':labelDel"
      :loading="delLoading" :disable="delLoading">
      <q-popup-proxy>
        <q-card style="min-width: 160px;" :class="$q.dark.isActive?'bg-grey-9':''">
          <q-card-section class="bg-primary text-white">
            <div class="text-subtitle1 text-no-wrap">{{msg}}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn dense v-close-popup @click="doDelete">确定</q-btn>
            <q-btn dense v-close-popup flat>取消</q-btn>
          </q-card-actions>
        </q-card>
      </q-popup-proxy>
    </q-btn>
    <slot name="right" />
  </div>
</template>

<script>
import CRUD, { crud } from './crud'
export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    },
    disabledView: Boolean,
    disabledEdit: Boolean,
    disabledDel: Boolean,
    msg: {
      type: String,
      default: '确定删除本条数据？'
    },
    type: {
      type: String,
      default: 'button',
      validator: v => ['menu', 'button'].includes(v)
    },
    noWrap: Boolean,
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
    denseMenu: {
      type: Boolean,
      default: undefined
    },
    colorMenu: {
      type: String,
      default: 'primary'
    },
    colorView: {
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
    labelMenu: {
      type: String,
      default: ''
    },
    labelView: {
      type: String,
      default: '查看'
    },
    labelEdit: {
      type: String,
      default: '修改'
    },
    labelDel: {
      type: String,
      default: '删除'
    },
    iconMenu: {
      type: String,
      default: 'expand_more'
    },
    iconMenuOpen: {
      type: String,
      default: 'arrow_back'
    },
    iconView: {
      type: String,
      default: 'visibility'
    },
    iconEdit: {
      type: String,
      default: 'edit'
    },
    iconDel: {
      type: String,
      default: 'delete'
    },
    noIcon: Boolean,
    noLabel: Boolean
  },
  data() {
    return {
      menuShow: false,
      delLoading: false
    }
  },
  computed: {
    computedIconView () {
      if (this.iconView && !this.noIcon) {
        return this.iconView
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
    },
    computedDenseMenu () {
      if (this.denseMenu !== undefined) {
        console.log('dense menu')
        return this.denseMenu
      } else {
        return this.dense
      }
    }
  },
  watch: {
    'crud.loading' (valNew) {
      if (valNew === true) {
        if (this.$refs.menu) {
          this.$refs.menu.hide()
        }
      }
    }
  },
  methods: {
    doDelete() {
      this.delLoading = true
      if (this.$refs.menu) {
        this.$refs.menu.hide()
      }
      // TODO 实际使用需要去掉setTiemout
      setTimeout(() => {
        this.crud.doDelete(this.data)
      }, 500)
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.delLoading = false
      }
    }
  }
}
</script>
