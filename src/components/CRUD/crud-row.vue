<!--
  插槽：
    start
    end
  属性：
    data
    data-add
    permission

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

    color-edit / color-view / color-del / color-add
    label-view / label-edit / label-del / label-add
    icon-edit / icon-view / icon-del / icon-add
    no-edit / no-view / no-del / no-add
    msg-del
    no-wrap     多个按钮不出现换行
    no-icon
    no-label
    tooltip
-->
<template>
  <q-btn no-wrap v-if="type === 'menu'"
    :dense='dense' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
    :flat="flat"
    :icon-right="menuShow?iconMenuOpen:iconMenu"
    :label="labelMenu"
    :color="colorMenu"
    :loading="delLoading" :disable="delLoading">
    <q-menu ref="menu" :content-class="$q.dark.isActive?'bg-grey-9':''" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
      <q-list>
        <slot name="start" />
        <q-item clickable :class="'text-' + colorView" :dense="computedDenseMenu" @click="crud.toView(data)" v-if="!noView">
          <q-item-section avatar v-if="computedIconView">
            <q-icon :name="computedIconView" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{labelView}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-permission="permission.edit" :class="'text-' + colorEdit" :dense="computedDenseMenu" @click="crud.toEdit(data)" v-if="!noEdit">
          <q-item-section avatar v-if="computedIconEdit">
            <q-icon :name="computedIconEdit" />
          </q-item-section>
          <q-item-section>
            <q-item-label :color="colorEdit">{{labelEdit}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-permission="permission.del" :class="'text-' + colorDel" :dense="computedDenseMenu" v-if="!noDel">
          <q-item-section avatar v-if="computedIconDel">
            <q-icon :name="computedIconDel" />
          </q-item-section>
          <q-item-section>
            <q-item-label :color="colorDel">{{labelDel}}</q-item-label>
          </q-item-section>
          <q-popup-proxy>
            <co-card style="min-width: 160px;" class="bg-deep-orange">
              <q-card-section class="">
                <div class="text-subtitle1 text-no-wrap text-white">{{msgDel}}</div>
              </q-card-section>
              <q-separator />
              <q-card-actions align="right" class="q-pa-md">
              <q-btn :dense="dense" v-close-popup flat color="white">取消</q-btn>
              <q-btn :dense="dense" v-close-popup flat color="white" icon="delete" @click="doDelete">删除</q-btn>
              </q-card-actions>
            </co-card>
          </q-popup-proxy>
        </q-item>

        <q-item clickable v-permission="permission.add" :class="'text-' + colorAdd" :dense="computedDenseMenu" @click="crud.toAdd(dataAdd)" v-if="!noAdd">
          <q-item-section avatar v-if="computedIconAdd">
            <q-icon :name="computedIconAdd" />
          </q-item-section>
          <q-item-section>
            <q-item-label :color="colorAdd">{{labelAdd}}</q-item-label>
          </q-item-section>
        </q-item>

        <slot name="end" />
      </q-list>
    </q-menu>
  </q-btn>

  <div v-else class="q-gutter-x-sm q-gutter-y-xs" :class="noWrap?'no-wrap':''">
    <slot name="start" />
    <q-btn @click="crud.toView(data)" v-if="!noView" :padding="(dense && !noLabel && labelView && !flat)?'xs sm':''" :size="dense?'sm':'md'" no-wrap :dense='dense' :color="colorView" :icon="computedIconView" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelView">
      <q-tooltip :delay="550" v-if="tooltip">{{labelView}}</q-tooltip>
    </q-btn>
    <q-btn v-permission="permission.edit" @click="crud.toEdit(data)" v-if="!noEdit" :padding="(dense && !noLabel && labelEdit && !flat)?'xs sm':''" :size="dense?'sm':'md'" no-wrap :dense='dense' :color="colorEdit" :icon="computedIconEdit" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelEdit">
      <q-tooltip :delay="550" v-if="tooltip">{{labelEdit}}</q-tooltip>
    </q-btn>
    <q-btn v-permission="permission.del" v-if="!noDel" :padding="(dense && !noLabel && labelDel && !flat)?'xs sm':''" :size="dense?'sm':'md'" no-wrap :dense='dense' :color="colorDel" :icon="computedIconDel"   :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelDel"
      :loading="delLoading" :disable="delLoading">
      <q-tooltip :delay="550" v-if="tooltip">{{labelDel}}</q-tooltip>
      <q-popup-proxy>
        <co-card style="min-width: 160px;" class="bg-deep-orange">
          <q-card-section class="">
            <div class="text-subtitle1 text-no-wrap text-white">{{msgDel}}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right" class="q-pa-md">
            <q-btn :dense="dense" v-close-popup flat color="white">取消</q-btn>
            <q-btn :dense="dense" v-close-popup flat color="white" icon="delete" @click="doDelete">删除</q-btn>
          </q-card-actions>
        </co-card>
      </q-popup-proxy>
    </q-btn>
    <q-btn v-permission="permission.add" @click="crud.toAdd(dataAdd)" v-if="!noAdd" :padding="(dense && !noLabel && labelAdd && !flat)?'xs sm':''" :size="dense?'sm':'md'" no-wrap :dense='dense' :color="colorAdd" :icon="computedIconAdd" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelAdd">
      <q-tooltip :delay="550" v-if="tooltip">{{labelAdd}}</q-tooltip>
    </q-btn>
    <slot name="end" />
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
    dataAdd: {
      type: Object
    },
    permission: {
      type: Object,
      default: () => { return {} }
    },
    noView: Boolean,
    noEdit: Boolean,
    noDel: Boolean,
    noAdd: Boolean,
    msgDel: {
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
    dense: Boolean,
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
      default: 'secondary'
    },
    colorEdit: {
      type: String,
      default: 'positive'
    },
    colorDel: {
      type: String,
      default: 'negative'
    },
    colorAdd: {
      type: String,
      default: 'primary'
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
    labelAdd: {
      type: String,
      default: '新增'
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
    iconAdd: {
      type: String,
      default: 'add'
    },
    noIcon: Boolean,
    noLabel: Boolean,
    tooltip: Boolean
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
    computedIconAdd () {
      if (this.iconAdd && !this.noIcon) {
        return this.iconAdd
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
      this.crud.doDelete(this.data)
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.delLoading = false
      }
    },
    [CRUD.HOOK.afterDeleteError](crud, data) {
      if (data === this.data) {
        this.delLoading = false
      }
    }
  }
}
</script>
