export default {
  props: {
    labelWidth: {
      type: String,
      validator: v => ['auto', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'fit-content'].includes(v)
    },
    labelTop: Boolean,
    labelAlign: { // label-align
      type: String,
      validator: v => ['auto', 'left', 'right', 'center'].includes(v)
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
      if (this.labelAlign) {
        if (this.labelAlign === 'left' || this.labelAlign === 'center' || this.labelAlign === 'right') {
          //cls += ' label-custom label-' + this.labelAlign
          cls += ' label-' + this.labelAlign
        }
      }
      if (this.labelTop) {
        cls += ' label-top'
      } else {
        if (this.labelWidth) {
          cls += ' label-' + this.labelWidth
        }
      }
      return cls
    }
  }
}
