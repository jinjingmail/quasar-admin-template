<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <div v-if="formLabel" :class="computedClass" class="form-label">
    <label :class="{'dense':dense, 'ellipsis-2-lines':!noEllipsis}" :style="computedLabelStyle"><slot name="form-label">{{formLabel}}</slot></label>
    <q-field
      ref="field"
      class="col coadmin-field"
      :style="contentStyle"
      v-bind="$attrs"
      v-on="listeners"
      :dense="dense"
      :outlined="outlined"
      :disable="disable"
      :readonly="readonly"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
        <slot :name="slotName"/>
      </template>
      <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
        <slot :name="slotName" v-bind="prop"/>
      </template>
    </q-field>
  </div>
  <q-field v-else
    ref="field"
    class="coadmin-field"
    :class="computedClass"
    :style="contentStyle"
    v-bind="$attrs"
    v-on="listeners"
    :dense="dense"
    :outlined="outlined"
    :disable="disable"
    :readonly="readonly"
  >
    <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]>
      <slot :name="slotName"/>
    </template>
    <template v-for="slotName in Object.keys($scopedSlots)" v-slot:[slotName]="prop">
      <slot :name="slotName" v-bind="prop"/>
    </template>
  </q-field>

</template>

<script>
import formMixin from './formMixin.js'
export default {
  name: 'CoadminField',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    listeners: function () {
      const vm = this
      return Object.assign({},
        // 从父级添加所有的监听器
        vm.$listeners,
        // 添加自定义监听器，或覆写一些监听器的行为
        {
          input: function (value) {
            if (!vm.disable && !vm.readonly) {
              vm.$emit('input', value)
            }
          }
        }
      )
    }
  },
  mounted () {
  },
  methods: {
    resetValidation () {
      this.$refs.field.resetValidation()
    },
    validate (value) {
      return this.$refs.field.validate(value)
    },
    focus () {
      this.$refs.field.focus()
    },
    blur () {
      this.$refs.field.blur()
    }
  }
}
</script>
