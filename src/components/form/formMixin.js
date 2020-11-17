export default {
  props: {
    labelWidth: {
      type: String,
      validator: v => ['auto'/* TODO 使用最长的label作为其他label的宽度 */, 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'fit-content'].includes(v)
    },
    labelPosition: {
      type: String,
      validator: v => ['top', 'left', 'right', 'center'].includes(v)
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
    }
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
        }
      } else if (this.labelPosition === 'top') {
        cls += ' label-top'
      }
      return cls
    }
  }
}
