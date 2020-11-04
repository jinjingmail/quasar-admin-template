<template>
  <q-expansion-item v-if="item.children"
    :dense-toggle="level!==1"
    :content-inset-level="0.4"
    :group="'topmenu'+level"
    :expand-separator="level===1"
    :dense="false"
    :default-opened="false"
    :duration="200"
    @input="expansionItemInput"
  >
    <template v-slot:header>
      <q-item-section avatar v-if="item.icon">
        <q-icon :color="iconColor(item.icon_color)" :name="item.icon" :size="level===1?'sm':'sm'"/>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{item.title}}</q-item-label>
        <q-item-label caption v-if="item.caption">{{item.caption}}</q-item-label>
      </q-item-section>
    </template>

    <side-menu ref="menu" v-for="(item2) in item.children" :key="item2.title"
      :item="item2" :level="level+1">
    </side-menu>
  </q-expansion-item>

  <q-item v-else-if="item.link.startsWith('http')"
      :dense="false"
      :ref="'route-'+item.link"
      clickable tag="a" target="_blank"
      :href="item.link">
    <q-item-section avatar v-if="item.icon">
      <q-icon :color="iconColor(item.icon_color)" :name="item.icon" :size="level===1?'sm':'sm'"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{item.title}}</q-item-label>
      <q-item-label caption v-if="item.caption">{{item.caption}}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item v-else
    :dense="false"
    :ref="'route-'+item.link"
    :to="item.link"
    exact
    active-class="coadmin-sidebar-menu-active"
  >
    <q-item-section avatar v-if="item.icon">
      <q-icon :color="iconColor(item.icon_color)" :name="item.icon" :size="level===1?'sm':'sm'"/>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{item.title}}</q-item-label>
      <q-item-label caption v-if="item.caption">{{item.caption}}</q-item-label>
    </q-item-section>
  </q-item>

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
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  mounted () {
    // console.log('"refs"', this.$refs)
  },
  methods: {
    iconColor (color) {
      if (color) {
        return color
      } else {
        return 'primary'
      }
    },
    expansionItemInput (value) {
      console.log(value)
    }
  }
}
</script>
