<template>
  <p>&nbsp;</p>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    /* 1..n，1代表最顶级菜单 */
    level: {
      type: Number,
      required: true
    },
    menuList: {
      type: Object,
      required: true
    }
  },
  created () {
  }
}
</script>
