<!--
  重新定义input等form组件：
  1、简化代码量
  2、QInput 等Quasar自带的组件，当设置disable后，还是可以通过控制台强制改写model值，这里自定义组件不能改写
  新增插槽：
      form-label
  新增prop：
      见prop定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"
      :style="computedLabelStyle">
      <slot name="form-label"><template v-if="rules && rules.length > 0">* </template>{{formLabel}}</slot>
    </label>
    <q-input
      :value="value"
      class="col coadmin-input"
      :class="contentClass"
      :style="contentStyle"
      ref="input"
      v-bind="$attrs"
      v-on="listeners"
      :rules="rules"
      :label="label"
      :dense="dense"
      :outlined="outlined"
      :no-error-icon="noErrorIcon"
      :disable="disable"
      :readonly="readonly"
      @mouseover.native="hover=true"
      @mouseleave.native="hover=false"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-slot:append>
        <template v-if="clearable && hover && (value!=null && value !== '') && !disable">
          <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClear()"/>
        </template>
        <slot v-else name="append"/>
      </template>
    </q-input>
  </div>
  <q-input v-else
    ref="input"
    :value="value"
    class="coadmin-input"
    :class="{computedClass, contentClass}"
    :style="contentStyle"
    v-bind="$attrs"
    v-on="listeners"
    :rules="rules"
    :label="label"
    :dense="dense"
    :outlined="outlined"
    :no-error-icon="noErrorIcon"
    :disable="disable"
    :readonly="readonly"
    @mouseover.native="hover=true"
    @mouseleave.native="hover=false"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>

    <template v-slot:append>
      <template v-if="clearable && hover && (value!=null && value !== '') && !disable">
        <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClear()"/>
      </template>
      <slot v-else name="append"/>
    </template>

  </q-input>
</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'CoadminInput',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
    value: {
      type: [String, Number]
    },
    rules: Array,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    noClearFocus: Boolean,
    label: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      hover: false
    }
  },
  computed: {
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
            vm._doInput(value)
          }
        }
      )
    }
  },
  methods: {
    _doClear () {
      const oldVal = this.value
      this._doInput(null)
      //this.$nextTick(() => {
      this.$emit('clear', oldVal)
      //})
    },
    _doInput (value) {
      if (!this.disable) {
        this.$emit('input', value)
      }
    },

    /* q-input 默认方法 begin */
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
    /* q-input 默认方法 end */
  }
}
</script>
