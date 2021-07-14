<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import drag from './utils/vue-dragdrag'
Vue.directive('drag', drag)

import CoTable from './components/co-table'
import CoDialog from './components/co-dialog'
import CoCard from './components/co-card'
import CoTree from './components/co-tree'

import CoField from 'components/form/co-field.vue'
import CoInput from 'components/form/co-input.vue'
import CoDate from 'components/form/co-date.vue'
import CoOptionGroup from 'components/form/co-option-group.vue'
import CoSelect from 'components/form/co-select.vue'
import CoFormItem from 'components/form/co-form-item.vue'
import CoForm from 'components/form/co-form.vue'
import CoDateSelect from 'components/form/co-date-select.vue'
import CoTreeSelect from 'components/form/co-tree-select.vue'

Vue.component(CoTable.name, CoTable)
Vue.component(CoDialog.name, CoDialog)
Vue.component(CoCard.name, CoCard)
Vue.component(CoTree.name, CoTree)

Vue.component(CoField.name, CoField)
Vue.component(CoInput.name, CoInput)
Vue.component(CoDate.name, CoDate)
Vue.component(CoOptionGroup.name, CoOptionGroup)
Vue.component(CoSelect.name, CoSelect)
Vue.component(CoFormItem.name, CoFormItem)
Vue.component(CoForm.name, CoForm)
Vue.component(CoDateSelect.name, CoDateSelect)
Vue.component(CoTreeSelect.name, CoTreeSelect)

export default {
  name: 'App'
}
</script>
