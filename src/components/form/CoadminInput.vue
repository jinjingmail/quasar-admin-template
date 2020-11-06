<template>
  <div v-if="formLabel" :class="contentClass">
    <label>{{formLabel}}</label>
    <q-input v-bind="$attrs" v-on="inputListeners" :dense="dense" :outlined="outlined"
      :no-error-icon="noErrorIcon" :disable="disable" :readonly="disable"/>
  </div>
  <q-input v-else :class="contentClass" v-bind="$attrs" v-on="inputListeners" :dense="dense" :outlined="outlined"
    :no-error-icon="noErrorIcon" :disable="disable" :readonly="disable"/>
</template>

<script>
/*
 * 重新定义input等form组件，有几个目的：
 * 1、简化代码量
 * 2、QInput 等Quasar自带的组件，当设置disable后，还是可以通过控制台强制改写modal值，这里自定义组件给予修正
 */
export default {
  name: 'CoadminInput',
  inheritAttrs: false,
  props: {
    formLabel: {
      type: String,
      default: undefined
    },
    contentClass: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    },
    outlined: {
      type: Boolean,
      default: true
    },
    noErrorIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (value) {
            if (!vm.disable) {
              vm.$emit('input', value)
            }
          }
        }
      )
    }
  }
}
</script>
