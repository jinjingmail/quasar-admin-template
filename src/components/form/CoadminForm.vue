<!--
  增加插槽：
  增加属性：
    参考 props 定义
-->
<template>
  <q-form
    ref="form"
    v-bind="$attrs"
    v-on="$listeners"
    class="coadmin-form"
    :class="customContentClass"
  >
    <slot />
  </q-form>
</template>

<script>
export default {
  name: 'CoadminForm',
  inheritAttrs: false,
  props: {
    contentClass: {
      type: String,
      default: undefined
    },
    labelWidth: {
      type: String,
      default: 'medium' // xsmall/small/medium/large/xlarge
    },
    labelPosition: {
      type: String,
      default: 'top' // left/right/center/top
    }
  },
  data () {
    return {
    }
  },
  computed: {
    customContentClass () {
      let cls = ''
      if (this.contentClass) {
        cls = this.contentClass
      }
      if (this.labelPosition === 'left' || this.labelPosition === 'center' || this.labelPosition === 'right') {
        cls += ' label-custom label-' + this.labelPosition
        if (this.labelWidth) {
          cls += ' label-' + this.labelWidth
        }
      }
      return cls
    }
  },
  created () {
  },
  methods: {
    validate (shouldFocus) {
      return this.$refs.form.validate(shouldFocus)
    },
    submit (evt) {
      this.$refs.form.submit(evt)
    },
    reset (evt) {
      this.$refs.form.reset(evt)
    },
    getValidationComponents () {
      return this.$refs.form.getValidationComponents()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    focus () {
      this.$refs.form.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.label-custom {
  &.label-xsmall {
    ::v-deep {
      .form-label > label:first-child {
        width:45px;
      }
    }
  }
  &.label-small {
    ::v-deep {
      .form-label > label:first-child {
        width:70px;
      }
    }
  }
  &.label-medium {
    ::v-deep {
      .form-label > label:first-child {
        width:110px;
      }
    }
  }
  &.label-large {
    ::v-deep {
      .form-label > label:first-child {
        width:150px;
      }
    }
  }
  &.label-xlarge {
    ::v-deep {
      .form-label > label:first-child {
        width:220px;
      }
    }
  }
  &.label-left {
    ::v-deep {
      .form-label > label:first-child {
        text-align:left;
      }
    }
  }
  &.label-center {
    ::v-deep {
      .form-label > label:first-child {
        text-align:center;
      }
    }
  }
  &.label-right {
    ::v-deep {
      .form-label > label:first-child {
        text-align:right;
      }
    }
  }
  ::v-deep {
    .form-label {
      > label:first-child{
        padding-top:6px;
        padding-right:4px;
      }
      display:flex;
    }
  }
}

</style>
