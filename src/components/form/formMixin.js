export default {
  props: {
    formLabel: String,
    labelWidth: {
      type: String,
      validator: v => ['fit-content', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(v)
    },
    labelTop: Boolean,
    labelAlign: {
      type: String,
      validator: v => ['auto', 'left', 'right', 'center'].includes(v)
    },
    labelStyle: String,
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
    noEllipsis: Boolean, // form 表单的label过长的情况
    noErrorIcon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedClass () {
      let cls = ''
      if (this.labelTop) {
        cls += ' label-top'
      }
      if (this.labelAlign === 'left' || this.labelAlign === 'center' || this.labelAlign === 'right') {
        cls += ' label-' + this.labelAlign
      }
      if (this.labelWidth) {
        cls += ' label-' + this.labelWidth
      }
      return cls
    },
    computedLabelStyle () {
      /* 直接在组件上设置 */
      let style = this.labelStyle
      if (!style) {
        style = this.$parent.labelStyle
      }
      /* 在 coadmin-form 上设置 */
      if (!style) {
        style = this.$parent.$parent.labelStyle
      }
      /* coadmin-date-select 等包裹 coadmin-input 的情况 */
      if (!style) {
        style = this.$parent.$parent.$parent.labelStyle
      }
      return style
    }
  }
}
