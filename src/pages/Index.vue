<template>
  <div class="q-pa-sm">
    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_1">
        <q-card class="shadow">
          <q-card-section :class="$q.dark.isActive?'theme_color':''" class="q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">900</q-item-label>
                <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'" >Total Orders</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="shopping_cart" class="box_1" size="60px"></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-1" style="width:70%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_2 ">
        <q-card class="shadow">
          <q-card-section :class="$q.dark.isActive?'theme_color':''" class="q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">1050</q-item-label>
                <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'">Total Expenses</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="account_balance_wallet" class="box_2" size="60px"></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-2" style="width:40%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_3 ">
        <q-card class="shadow">
          <q-card-section :class="$q.dark.isActive?'theme_color':''" class="q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">80 %</q-item-label>
                <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'">Total Profit</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="account_balance" class="box_3" size="60px"></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-3" style="width:80%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_4 ">
        <q-card class="shadow">
          <q-card-section :class="$q.dark.isActive?'theme_color':''" class="q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label class="text-h4" style="font-weight: 500;letter-spacing: 3px;">720</q-item-label>
                <q-item-label :class="!$q.dark.isActive? 'text-grey-7':'text-white'">New Customers</q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="people" class="box_4" size="60px"></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-4" style="width:30%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Pie
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <pie-chart/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Radar
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <radar-chart/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Bar
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <bar-chart/>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Scatter
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <scatter/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Sankey
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <sankey />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Point
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <point/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Heat map
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <heat-map/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Graph
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <graph/>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Theme River
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <theme-river/>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Sunbrust
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <sunburst />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Gauge
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <gauge/>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Rich
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <rich />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Funnel
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <funnel />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mb-md q-col-gutter-md">
      <div class="col">
        <q-card flat bordered :class="$q.dark.isActive?'theme_color':''" class="shadow q-pa-none q-ma-none">
          <q-card-section class="row">
            <div :class="!$q.dark.isActive? 'text-grey-7':'text-white'" class="col-12" style="font-weight: 600;letter-spacing: 1px;font-size: 16px;">
              Category
              <q-btn flat dense icon="fas fa-download" class="float-right"
                      color="grey-6">
                <q-tooltip>Download</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator class="full-width" inset></q-separator>

          <q-card-section>
            <category />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from 'pages/components/echarts/BarChart.vue'
import PieChart from 'pages/components/echarts/PieChart.vue'
import RadarChart from 'pages/components/echarts/RadarChart.vue'
import ThemeRiver from 'pages/components/echarts/ThemeRiver.vue'
import Point from 'pages/components/echarts/Point.vue'
import HeatMap from 'pages/components/echarts/HeatMap.vue'
import Sankey from 'pages/components/echarts/Sankey.vue'
import Gauge from 'pages/components/echarts/Gauge.vue'
import Graph from 'pages/components/echarts/Graph.vue'
import Rich from 'pages/components/echarts/Rich.vue'
import Scatter from 'pages/components/echarts/Scatter.vue'
import Sunburst from 'pages/components/echarts/Sunburst.vue'
import Funnel from 'pages/components/echarts/Funnel.vue'
import Category from 'pages/components/echarts/Category.vue'

export default {
  name: 'PageIndex',
  components: {
    BarChart,
    PieChart,
    RadarChart,
    ThemeRiver,
    Point,
    HeatMap,
    Sankey,
    Gauge,
    Graph,
    Rich,
    Scatter,
    Sunburst,
    Funnel,
    Category
  }
}
</script>

<style scoped>
  .box_1 {
    color: #0dceec;
  }

  .box_2 {
    color: #fe434f;
  }

  .box_3 {
    color: #15ca20;
  }

  .box_4 {
    color: #ff9700;
  }

  .theme_color {
    background-color: #131313 !important
  }
  .shadow {
    -webkit-box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
    box-shadow: 0 3px 20px rgba(34, 48, 53, 0.81) !important;
    border: none !important;
  }

  .progress-base {
    height: 8px;
    border-radius: 3px;
    background-color: #e9ecef;
  }

  .progress-bar-1 {
    height: 8px;
    border-radius: 3px;
    background: #17ead9;
    background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
    background: linear-gradient(45deg, #17ead9, #6078ea) !important;
  }

  .progress-bar-2 {
    height: 8px;
    border-radius: 3px;
    background: #f54ea2;
    background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
    background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
  }

  .progress-bar-3 {
    height: 8px;
    border-radius: 3px;
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }

  .progress-bar-4 {
    height: 8px;
    border-radius: 3px;
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .border-top {
    border-top: 1px solid #efefef;
  }

  .chip_pending {
    background: #ffdf40;
    background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
    background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
  }

  .chip_completed {
    background: #42e695;
    background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
    background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
  }
</style>
