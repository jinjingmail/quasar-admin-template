<!--
  插槽：
    start   添加按钮的话，请使用 action-start / action-end
    end
  属性：
    action-start  [{disable: true/false, permission:['menu:edit'], label:'添加子菜单', icon:'add', color:'red', click:function(){}}, {...}]  #提示permission必填
    action-end    同上

    action-start-menu       action-start 显示为菜单样式
    action-start-menu-color 菜单颜色
    action-start-menu-label 菜单文字
    action-end-menu       action-end 显示为菜单样式
    action-end-menu-color 菜单颜色
    action-end-menu-label 菜单文字

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
  <co-btn v-if="type === 'menu'"
    no-wrap
    :dense="_dense()"
    :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy"
    :flat="flat"
    :icon-right="menuShow?iconMenuOpen:iconMenu"
    :label="labelMenu"
    :color="colorMenu"
    :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'"
    :loading="delLoading" :disable="delLoading">
    <q-menu ref="menu" :content-class="$q.dark.isActive?'bg-grey-9':''" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
      <q-list>
        <slot name="start" />
        <template v-for="(item, i) in actionStart">
          <q-item clickable :key="item.label+i+item.icon" v-permission="item.permission" :disable="item.disable" :dense="computedDenseMenu" @click="item.click" :class="!!item.color ? 'text-' + item.color : ''">
            <q-item-section avatar v-if="item.icon">
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

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
              <co-btn v-close-popup flat color="white">取消</co-btn>
              <co-btn v-close-popup flat color="white" icon="delete" @click="doDelete">删除</co-btn>
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

        <template v-for="(item, i) in actionEnd">
          <q-item clickable :key="item.label+i+item.icon" v-permission="item.permission" :disable="item.disable" :dense="computedDenseMenu" @click="item.click" :class="!!item.color ? 'text-' + item.color : ''">
            <q-item-section avatar v-if="item.icon">
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{item.label}}</q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <slot name="end" />
      </q-list>
    </q-menu>
  </co-btn>

  <div v-else class="q-gutter-x-sm q-gutter-y-xs" :class="{'no-wrap':noWrap}">
    <slot name="start" />
    <template v-if="actionStartMenu">
      <co-btn :icon-right="menuShow?iconMenuOpen:iconMenu" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="actionStartMenuColor" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="actionStartMenuLabel">
        <q-menu :content-class="$q.dark.isActive?'bg-grey-9':''" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
          <q-list>
            <template v-for="(item, i) in actionStart">
              <q-item clickable :key="item.label+i+item.icon" v-permission="item.permission" :disable="item.disable" :dense="computedDenseMenu" @click="item.click">
                <q-item-section avatar v-if="item.icon">
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{item.label}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </co-btn>
    </template>
    <template v-else>
      <template v-for="(item, i) in actionStart">
        <co-btn v-permission="item.permission" :disable="item.disable" :key="item.label+i+item.icon" @click="item.click" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="item.color" :icon="item.icon" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="item.label"/>
      </template>
    </template>

    <co-btn @click="crud.toView(data)" v-if="!noView" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="colorView" :icon="computedIconView" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelView">
      <q-tooltip :delay="550" v-if="tooltip">{{labelView}}</q-tooltip>
    </co-btn>
    <co-btn v-permission="permission.edit" @click="crud.toEdit(data)" v-if="!noEdit" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="colorEdit" :icon="computedIconEdit" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelEdit">
      <q-tooltip :delay="550" v-if="tooltip">{{labelEdit}}</q-tooltip>
    </co-btn>
    <co-btn v-permission="permission.del" v-if="!noDel" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="colorDel" :icon="computedIconDel"   :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelDel"
      :loading="delLoading" :disable="delLoading">
      <q-tooltip :delay="550" v-if="tooltip">{{labelDel}}</q-tooltip>
      <q-popup-proxy>
        <co-card style="min-width: 160px;" class="bg-deep-orange">
          <q-card-section class="">
            <div class="text-subtitle1 text-no-wrap text-white">{{msgDel}}</div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right" class="q-pa-md">
            <co-btn v-close-popup flat color="white">取消</co-btn>
            <co-btn v-close-popup flat color="white" icon="delete" @click="doDelete">删除</co-btn>
          </q-card-actions>
        </co-card>
      </q-popup-proxy>
    </co-btn>
    <co-btn v-permission="permission.add" @click="crud.toAdd(dataAdd)" v-if="!noAdd" :dense="_dense()" :padding="(_dense() &&!flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="colorAdd" :icon="computedIconAdd" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="noLabel?'':labelAdd">
      <q-tooltip :delay="550" v-if="tooltip">{{labelAdd}}</q-tooltip>
    </co-btn>

    <template v-if="actionEndMenu">
      <co-btn :icon-right="menuShow?iconMenuOpen:iconMenu" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="actionEndMenuColor" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="actionEndMenuLabel">
        <q-menu :content-class="$q.dark.isActive?'bg-grey-9':''" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
          <q-list>
            <template v-for="(item, i) in actionEnd">
              <q-item clickable :key="item.label+i+item.icon" v-permission="item.permission" :disable="item.disable" :dense="computedDenseMenu" @click="item.click">
                <q-item-section avatar v-if="item.icon">
                  <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{item.label}}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </co-btn>
    </template>
    <template v-else>
      <template v-for="(item, i) in actionEnd">
        <co-btn :key="item.label+i+item.icon" v-permission="item.permission" :disable="item.disable" @click="item.click" :dense="_dense()" :padding="(_dense() && !flat)?'xs sm':''" :size="_dense()?'sm':'md'" no-wrap :color="item.color" :icon="item.icon" :flat='flat' :rounded="rounded" :round="round" :outline="outline" :push="push" :unelevated="unelevated" :glossy="glossy" :label="item.label"/>
      </template>
    </template>
    <slot name="end" />
  </div>
</template>

<script>
import CRUD, { crud } from './crud'
import Setting from '@/default-setting'

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
    actionStart: {
      type: Array
    },
    actionStartMenu: {
      type: Boolean,
      default: false
    },
    actionStartMenuLabel: {
      type: String
    },
    actionStartMenuColor: {
      type: String
    },
    actionEnd: {
      type: Array
    },
    actionEndMenu: {
      type: Boolean,
      default: false
    },
    actionEndMenuLabel: {
      type: String
    },
    actionEndMenuColor: {
      type: String
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
      validator: v => ['menu', 'button', 'btn'].includes(v)
    },
    noWrap: Boolean,
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

    rounded: {
      type: Boolean,
      default: undefined
    },
    round: {
      type: Boolean,
      default: undefined
    },

    dense: {
      type: Boolean,
      default: undefined
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
      default: 'blue-grey-5'
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
      default: 'secondary'
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
        return this.denseMenu
      } else {
        return this._dense()
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
    _dense() {
      if (this.dense === undefined) {
        return Setting.denseMode
      } else {
        return this.dense
      }
    },
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
