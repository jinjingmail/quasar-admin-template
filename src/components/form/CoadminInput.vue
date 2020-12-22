<!--
  重新定义input等form组件：
  1、简化代码量
  2、QInput 等Quasar自带的组件，当设置disable后，还是可以通过控制台强制改写modal值，这里自定义组件给予修正
  新增插槽：
      form-label
  新增prop：
      见prop定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}"><slot name="form-label">{{formLabel}}</slot></label>
    <q-input
      v-model="model"
      class="col"
      :class="contentClass"
      :style="contentStyle"
      ref="input"
      v-bind="$attrs"
      v-on="listeners"
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
        <template v-if="clearable && hover && !!model && !disable">
          <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
        </template>
        <slot v-else name="append"/>
      </template>
    </q-input>
  </div>
  <q-input v-else
    ref="input"
    v-model="model"
    :class="{computedClass, contentClass}"
    :style="contentStyle"
    v-bind="$attrs"
    v-on="listeners"
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
      <template v-if="clearable && hover && !!model && !disable">
        <q-icon :name='clearIcon' class='cursor-pointer' @click="_doClean()"/>
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
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    noClearFocus: Boolean,
    value: {
      type: [String, Number]
    },
    label: {
      type: String,
      default: undefined
    },
    noErrorIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hover: false,
      model: undefined
    }
  },
  created () {
    this.model = this.value
  },
  watch: {
    value (valNew) {
      this.model = this.value
    },
    model (valNew, valOld) {
      if (!this.disable) {
        if (!valNew) {
          this.$emit('clear', valOld)
        }
        this.$emit('input', valNew)
      }
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
          /*input: function (value) {
            if (!vm.disable) {
              //vm.model = value
              vm.$emit('input', value)
            }
          }*/
        }
      )
    }
  },
  methods: {
    _doClean () {
      this.model = null
      /*if (!this.noClearFocus) {
        this.focus()
      }*/
    },

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
