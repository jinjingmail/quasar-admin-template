<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import drag from './utils/vue-dragdrag'
Vue.directive('drag', drag)

import CoadminTable from './components/CoadminTable'
import CoadminDialog from './components/CoadminDialog'
import CoadminTree from './components/CoadminTree'

import CoadminField from 'components/form/CoadminField.vue'
import CoadminInput from 'components/form/CoadminInput.vue'
import CoadminDate from 'components/form/CoadminDate.vue'
import CoadminOptionGroup from 'components/form/CoadminOptionGroup.vue'
import CoadminSelect from 'components/form/CoadminSelect.vue'
import CoadminFormItem from 'components/form/CoadminFormItem.vue'
import CoadminForm from 'components/form/CoadminForm.vue'
import CoadminDateSelect from 'components/form/CoadminDateSelect.vue'
import CoadminTreeSelect from 'components/form/CoadminTreeSelect.vue'

Vue.component(CoadminTable.name, CoadminTable)
Vue.component(CoadminDialog.name, CoadminDialog)
Vue.component(CoadminTree.name, CoadminTree)

Vue.component(CoadminField.name, CoadminField)
Vue.component(CoadminInput.name, CoadminInput)
Vue.component(CoadminDate.name, CoadminDate)
Vue.component(CoadminOptionGroup.name, CoadminOptionGroup)
Vue.component(CoadminSelect.name, CoadminSelect)
Vue.component(CoadminFormItem.name, CoadminFormItem)
Vue.component(CoadminForm.name, CoadminForm)
Vue.component(CoadminDateSelect.name, CoadminDateSelect)
Vue.component(CoadminTreeSelect.name, CoadminTreeSelect)

export default {
  name: 'App'
}
</script>
