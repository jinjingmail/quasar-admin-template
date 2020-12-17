/*
 * demo 数据
 */

export const visibleColumns = ['name', 'calories', 'fat', 'protein', 'sodium', 'calcium', 'iron', 'action']
export const defaultForm = { id: null, name: null, calories: null, fat: null, protein: null, sodium: null, calcium: null, iron: null }

export const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  {
    name: 'name',
    field: 'name',
    required: true,
    label: '名称',
    align: 'left',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: row => row.fat, sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron1', label: 'Iron1 (%)', field: 'iron1' },
  { name: 'iron2', label: 'Iron2 (%)', field: 'iron2' },
  { name: 'iron3', label: 'Iron3 (%)', field: 'iron3' },
  { name: 'iron4', label: 'Iron4 (%)', field: 'iron4' },
  { name: 'iron5', label: 'Iron5 (%)', field: 'iron5' },
  { name: 'iron6', label: 'Iron6 (%)', field: 'iron6' },
  { name: 'iron7', label: 'Iron7 (%)', field: 'iron7' },
  { name: 'action', label: '操作', align: 'center' }
]

export const data = [
  {
    id: 1,
    name: '冰棍',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    id: 2,
    name: '冰淇淋',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%长长的一个数据'
  },
  {
    id: 3,
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    id: 4,
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    id: 5,
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    id: 6,
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    id: 10,
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    id: 20,
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    id: 30,
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    id: 40,
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  },
  {
    id: 1000, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1001, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1002, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1003, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1004, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1005, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1006, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1007, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1008, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1009, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1010, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1011, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1012, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1013, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1014, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1015, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1016, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1017, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1018, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1019, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  },
  {
    id: 1020, name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: '2%', iron: '22%'
  }
]
