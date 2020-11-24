<!--
  重新定义input等form组件，有几个目的：
  1、简化代码量
  2、QInput 等Quasar自带的组件，当设置disable后，还是可以通过控制台强制改写modal值，这里自定义组件给予修正
  新增插槽：
      form-label
  新增prop：
      见prop定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label class="ellipsis" :class="{'dense':dense}"><slot name="form-label">{{formLabel}}</slot></label>
    <q-input
      class="col"
      ref="input"
      v-bind="$attrs"
      v-on="listeners"
      :label="label"
      :dense="dense"
      :outlined="outlined"
      :no-error-icon="noErrorIcon"
      :disable="disable"
      :readonly="readonly"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <!--
      <template v-slot:append>
        <slot name="append"/>
      </template>
      -->
    </q-input>
  </div>
  <q-input v-else
    ref="input"
    :class="computedClass"
    v-bind="$attrs"
    v-on="listeners"
    :label="label"
    :dense="dense"
    :outlined="outlined"
    :no-error-icon="noErrorIcon"
    :disable="disable"
    :readonly="readonly"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <!--
    <template v-slot:append>
      <slot name="append"/>
    </template>
    -->
  </q-input>
</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'CoadminInput',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
    label: {
      type: String,
      default: undefined
    },
    noErrorIcon: {
      type: Boolean,
      default: true
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    computedSlots () {
      const keys = []
      for (const key in this.$slots) {
        keys.push(key)
      }
      return keys
    },
    listeners: function () {
      const vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
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
  },
  methods: {
    resetValidation () {
      this.$refs.input.resetValidation()
    },
    validate (value) {
      return this.$refs.input.validate(value)
    },
    focus () {
      this.$refs.input.focus()
    },
    blur () {
      this.$refs.input.blur()
    },
    select () {
      this.$refs.input.select()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './form.scss'
</style>
