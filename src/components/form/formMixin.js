export default {
  props: {
    labelWidth: {
      type: String,
      validator: v => ['auto'/* label字符串有多长就占用多长 */, 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'fit-content'].includes(v)
    },
    labelPosition: {
      type: String,
      validator: v => ['auto', 'top', 'left', 'right', 'center'].includes(v)
    },
    formLabel: String,
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    contentClass: String,
    contentStyle: String,
    noEllipsis: Boolean // form 表单的label过长的情况
  },
  computed: {
    computedClass () {
      let cls = ''
      if (!this.labelPosition) {
        return cls
      }
      if (this.labelPosition === 'left' || this.labelPosition === 'center' || this.labelPosition === 'right') {
        cls += ' label-custom label-' + this.labelPosition
        if (this.labelWidth) {
          cls += ' label-' + this.labelWidth
        } else {
          cls += ' label-small'
        }
      } else {
        cls += ' label-top'
      }
      return cls
    }
  }
}
