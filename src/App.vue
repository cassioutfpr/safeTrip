<template>
  <div id="app">
    <div class="p-grid p-nogutter" id="bottom">
      <div class="p-col-4">
        <div id="title" style="margin-bottom: 0px">
          <img src="../public/icon.png" alt="Girl in a jacket" width="300" height="100"> 
        </div>
        <Form v-if="!isShowingRoute" @handleSearchRoute='handleSearchRoute' style='margin-top:20px'
          :loading="loading"/>
        <RouteCharts v-if="isShowingRoute" :chart_one_data='chartOneData' 
        :chart_one_bck='chartOneBck' :chart_two_data='chartTwoData' 
        :chart_two_bck='chartTwoBck' :chart_three_data='chartThreeData' 
        :chart_three_bck='chartThreeBck' :chart_four_data='chartFourData' :chart_four_bck='chartFourBck'
        :distance_fastest="fastestDistance" :distance_safest="safestDistance"
        :time_fastest="fastestTime" :time_safest="safestTime"
          @handleBackToForm='handleBackToForm'/>
      </div>
      <div class="p-col-8">
        <SafeTrip :markers='markers' :pathFastest='pathFastest' :pathSafest='pathSafest' />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import SafeTrip from './components/SafeTrip.vue'
import Form from './components/Form.vue'
import RouteCharts from './components/RouteCharts.vue'
import 'primeflex/primeflex.css';
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    SafeTrip,
    Form,
    RouteCharts
  },
  data: function() {
    return {
      origin: {},
      destiny: {},
      date: null,
      markers: [],
      isShowingRoute: false,
      pathFastest: [],
      chartOneData: [],
      chartOneBck: [],
      chartTwoData: [],
      chartTwoBck: [],
      chartThreeData: [],
      chartThreeBck: [],
      chartFourData: [],
      chartFourBck: [],
      pathSafest: [],
      loading: false,
      fastestTime: 0,
      fastestDistance: 0,
      safestTime: 0,
      safestDistance: 0,
    }
  },
  methods: {
    handleSearchRoute(val) {
      this.origin = val.origin;
      this.destiny = val.destiny;
      let position = {
        position: val.origin
      }
      this.markers.push(position);
      position = {
        position: val.destiny
      }
      this.markers.push(position);
      this.date = val.date;

      this.postRoute();
    },
    handleBackToForm() {
      this.clearData();
      this.isShowingRoute = false;
    },
    clearData() {
        this.pathFastest = [];
        this.pathSafest = [];
        this.markers = [];
        this.loading = false;
    },
    initHoursArray() {
      let array = [];
      for (let i = 0; i < 24; i++) {
        array.push('#42A5F5');
      }
      return array;
    },
    initDaysArray() {
      let array = [];
      for (let i = 0; i < 7; i++) {
        array.push('#42A5F5');
      }
      return array;
    },
    getHoursColorArray(tripDuration) {
      let dataI = moment(this.date).hour()
      let dataF = moment(this.date).add(tripDuration, 'seconds').hour()
      let array = this.initHoursArray();
      if (dataF - dataI < 0) {
        for (let i = 23; i >= dataI; i--) {
          array[i] = '#FFA726';
        }
        for (let i = 0; i <= dataF; i++) {
          array[i] = '#FFA726';
        }
      } else {
        for (let i = dataF; i >= dataI; i--) {
          array[i] = '#FFA726';
        }
      }

      return array;
    },
    getDaysColorArray(tripDuration) {
      let dataI = moment(this.date).isoWeekday() - 1
      let dataF = moment(this.date).add(tripDuration, 'seconds').isoWeekday() - 1;
      let array = this.initDaysArray();
      if (dataF - dataI < 0) {
        for (let i = 6; i >= dataI; i--) {
          array[i] = '#FFA726';
        }
      } else {
        for (let i = dataF; i >= dataI; i--) {
          array[i] = '#FFA726';
        }
      }

      return array;
    },
    postRoute() {
      const promises = [];

      let postObject = {
        initLat: this.origin.lat,
        initLng: this.origin.lng,
        destLat: this.destiny.lat,
        destLng: this.destiny.lng,
      }
      
      this.loading = true;

      promises.push(axios.post('http://15.228.48.50:8080/route-fast', postObject));
      promises.push(axios.post('http://15.228.48.50:8080/route-safe', postObject));

      Promise.all(promises)
        .then(async (results) => {
          if (results.length > 0) {
            let paths = results[0].data.split("|");
            this.pathFastest = this.processResponse(paths[0])
            this.fastestTime = paths[1]/3600000
            this.fastestDistance = paths[2]/1000
            this.chartOneData = this.getChartData1(paths);
            this.chartOneBck = this.getHoursColorArray(paths[1]/1000)
            this.chartTwoData = this.getChartData2(paths);
            this.chartTwoBck = this.getDaysColorArray(paths[1]/1000)

            paths = results[1].data.split("|");
            this.pathSafest = this.processResponse(paths[0])
            this.safestTime = paths[1]/3600000
            this.safestDistance = paths[2]/1000
            this.chartThreeData = this.getChartData1(paths);
            this.chartThreeBck = this.getHoursColorArray(paths[1]/1000);
            this.chartFourData = this.getChartData2(paths);
            this.chartFourBck = this.getDaysColorArray(paths[1]/1000)
          }
        })
        .catch((error) => {
          console.log(error)
        }).finally(() => {
           this.isShowingRoute = true;
          this.loading = true;
        });
      },
      processResponse(response) {
        let pathTemp = [];
        let coordinates = response.split(";");
        coordinates.forEach(latLng => {
            if (latLng === "") {
              return;
            }
            let latLngSplited = latLng.split(",");
            pathTemp.push({
              lat: parseFloat(latLngSplited[0]),
              lng: parseFloat(latLngSplited[1]),
            }) 
        })
        return pathTemp;
      },
      getChartData1(paths) {
        let chartData = [];
        chartData.push(paths[3])
        chartData.push(paths[4])
        chartData.push(paths[5])
        chartData.push(paths[6])
        chartData.push(paths[7])
        chartData.push(paths[8])
        chartData.push(paths[9])
        chartData.push(paths[10])
        chartData.push(paths[11])
        chartData.push(paths[12])
        chartData.push(paths[13])
        chartData.push(paths[14])
        chartData.push(paths[15])
        chartData.push(paths[16])
        chartData.push(paths[17])
        chartData.push(paths[18])
        chartData.push(paths[19])
        chartData.push(paths[20])
        chartData.push(paths[21])
        chartData.push(paths[22])
        chartData.push(paths[23])
        chartData.push(paths[24])
        chartData.push(paths[25])
        chartData.push(paths[26])

        return chartData;
      },
      getChartData2(paths) {
        let chartData = [];
        chartData.push(paths[27])
        chartData.push(paths[28])
        chartData.push(paths[29])
        chartData.push(paths[30])
        chartData.push(paths[31])
        chartData.push(paths[32])
        chartData.push(paths[33])

        return chartData;
      },
      getChartData3(paths) {
        let chartData = [];
        chartData.push(paths[37])
        chartData.push(paths[38])
        chartData.push(paths[39])
        chartData.push(paths[40])
        chartData.push(paths[41])
        chartData.push(paths[42])
        chartData.push(paths[43])
        chartData.push(paths[44])
        chartData.push(paths[45])
        chartData.push(paths[46])
        chartData.push(paths[47])
        chartData.push(paths[48])
        chartData.push(paths[49])
        chartData.push(paths[50])
        chartData.push(paths[51])
        chartData.push(paths[52])
        chartData.push(paths[53])
        chartData.push(paths[54])
        chartData.push(paths[55])
        chartData.push(paths[56])
        chartData.push(paths[57])
        chartData.push(paths[58])
        chartData.push(paths[59])
        chartData.push(paths[60])

        return chartData;
      },
      getChartData4(paths) {
        let chartData = [];
        chartData.push(paths[61])
        chartData.push(paths[62])
        chartData.push(paths[63])
        chartData.push(paths[64])
        chartData.push(paths[65])
        chartData.push(paths[66])
        chartData.push(paths[67])

        return chartData;
      },
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#title {
  font-size: 24px;
  padding-top: 20px;
  margin-bottom: 40px;
}
</style>
