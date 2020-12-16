<template>
  <div class="col-auto q-pl-none q-gutter-sm no-wrap">
    <!--左侧插槽-->
    <slot name="left" />
    <q-btn dense color="primary" icon="add" v-if="crud.optShow.add" @click="crud.toAdd"/>
    <q-btn dense color="primary" icon="edit" v-if="crud.optShow.edit && !(crud.selections.length!==1)" @click="crud.toEdit(crud.selections[0])"/>
    <q-btn dense color="primary" icon="delete" v-if="crud.optShow.del && !(crud.selections.length===0)"
      @click="toDelete(crud.selections)"
      :loading="crud.delAllLoading"
      />
    <!--右侧插槽-->
    <slot name="right" />
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
    }
  },
  methods: {
    toDelete(datas) {
      this.$q.dialog({
        cancel: { label: '取消' },
        ok: { label: '确定' },
        message: `删除选中的${datas.length}条数据?`
      }).onOk(() => {
        this.crud.delAllLoading = true
        // TODO 实际使用需要去掉setTiemout
        setTimeout(() => {
          this.crud.doDelete(datas)
        }, 500)
      })
    }
  }
}
</script>
