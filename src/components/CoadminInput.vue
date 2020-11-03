<template>
  <div v-if="label" :class="formClass">
    <label>{{label}}</label>
    <q-input v-bind="$attrs" v-on="inputListeners" :dense="dense" :outlined="outlined" :no-error-icon="noErrorIcon" :disable="disable" :readonly="disable"></q-input>
  </div>
  <q-input v-else v-bind="$attrs" v-on="inputListeners" :dense="dense" :outlined="outlined" :no-error-icon="noErrorIcon" :disable="disable" :readonly="disable"></q-input>
</template>

<script>
export default {
  name: 'CoadminInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: undefined
    },
    formClass: {
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
