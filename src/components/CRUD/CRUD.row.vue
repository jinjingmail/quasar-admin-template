<template>
  <q-btn dense :flat="!menuShow" :icon="menuShow?iconExpand:iconReduce" :color="iconColor" :loading="delLoading" :disable="delLoading">
    <q-menu ref="menu" anchor="bottom end" self="top end" @show="menuShow=true" @hide="menuShow=false">
      <q-list>
        <slot name="left" />
        <q-item clickable dense @click="crud.toView(data)">
          <q-item-section>
            <q-item-label>查看</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable dense @click="crud.toEdit(data)" v-if="!disabledEdit">
          <q-item-section>
            <q-item-label>修改</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable dense v-if="!disabledDel">
          <q-item-section>
            <q-item-label>删除</q-item-label>
          </q-item-section>
          <q-popup-proxy>
            <q-card>
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
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledDel: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据？'
    },
    iconColor: {
      type: String,
      default: 'primary'
    },
    iconExpand: {
      type: String,
      default: 'arrow_back'
    },
    iconReduce: {
      type: String,
      default: 'expand_more'
    }
  },
  data() {
    return {
      menuShow: false,
      delLoading: false
    }
  },
  watch: {
    'crud.loading' (valNew) {
      if (valNew === true) {
        this.$refs.menu.hide()
      }
    }
  },
  methods: {
    doDelete() {
      this.delLoading = true
      this.$refs.menu.hide()
      // TODO 实际使用需要去掉setTiemout
      setTimeout(() => {
        this.crud.doDelete(this.data)
      }, 500)
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        console.log('afterDelete', data)
        this.delLoading = false
      }
    }
  }
}
</script>
