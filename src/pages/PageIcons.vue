<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
        <q-btn v-for="item in iconsList" :key="item.name" size="md" flat text-color="primary" @click="$q.dialog({title: ' ', message:item.name})">
          <q-icon :name="item.name">
            <q-tooltip>
              {{item.name}}
            </q-tooltip>
          </q-icon>
        </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIcons',
  data () {
    return {
      loading: false,
      iconsList: []
    }
  },
  mounted () {
    this.__loadIconSet('icons')
  },
  methods: {
    __loadIconSet (iconSet) {
      if (iconSet) {
        this.loading = true
        // detect if UMD version is installed
        if (window.IconPicker) {
          const name = iconSet.replace(/-([a-z])/g, g => g[1].toUpperCase())
          if (window.IconPicker.iconSet && window.IconPicker.iconSet[name]) {
            const iconsSet = window.IconPicker.iconSet[name]
            this.iconsList = iconsSet.icons
          } else {
            /* eslint-disable */
            console.error('IconPicker: no icon set loaded called \'' + iconSet + '\'')
            console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
            /* eslint-enable */
          }
        } else {
          try {
            const iconsSet = require('assets/' + iconSet + '.js').default
            this.iconsList = iconsSet.icons
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error('IconPicker: cannot find icon set found called \'' + iconSet + '\'')
          }
        }
        this.loading = false
      }
    }

  }
}
</script>
