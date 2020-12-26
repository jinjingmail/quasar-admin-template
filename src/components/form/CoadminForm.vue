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
    :class="computedClass"
  >
    <slot />
  </q-form>
</template>

<script>
import formMixin from './formMixin.js'

export default {
  name: 'CoadminForm',
  inheritAttrs: false,
  mixins: [formMixin],
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
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
// @import './form.scss'
@mixin label-left-center-right {
  > label:first-child{
    padding-top:15px;
    padding-right:12px;
    line-height: 1.1;
    height: fit-content;
  }
  > label.dense:first-child{
    padding-top:7px;
    line-height: 1.1;
    height: fit-content;
  }
}

.coadmin-form {
  &.label-top {
    ::v-deep {
      .form-label {
        display: block;
      }
    }
  }
}

.coadmin-form {

  ::v-deep {
    .form-label {
      display:flex;
      @include label-left-center-right;
    }
  }
  &.label-fit-content {
    ::v-deep {
      .form-label > label:first-child {
        width:auto;
      }
    }
  }
  &.label-xsmall {
    ::v-deep {
      .form-label > label:first-child {
        width:50px;
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
        width:90px;
      }
    }
  }
  &.label-large {
    ::v-deep {
      .form-label > label:first-child {
        width:110px;
      }
    }
  }
  &.label-xlarge {
    ::v-deep {
      .form-label > label:first-child {
        width:150px;
      }
    }
  }
  &.label-xxlarge {
    ::v-deep {
      .form-label > label:first-child {
        width:200px;
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
}
</style>
