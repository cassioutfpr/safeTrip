<template>
  <div id="app">
    <div class="p-grid p-nogutter" id="bottom">
      <div class="p-col-4">
        <div id="title" style="margin-bottom: 0px">
          <img src="../public/icon.png" alt="Girl in a jacket" width="300" height="100"> 
        </div>
        <Form v-if="!isShowingRoute" @handleSearchRoute='handleSearchRoute' style='margin-top:20px'/>
        <RouteCharts v-if="isShowingRoute" :chart_one_data='chartOneData' :chart_two_data='chartTwoData'
          @handleBackToForm='handleBackToForm'/>
      </div>
      <div class="p-col-8">
        <SafeTrip :markers='markers' :pathFastest='pathFastest' :pathSafest='pathSafest' />
      </div>
    </div>
  </div>
</template>

<script>
import SafeTrip from './components/SafeTrip.vue'
import Form from './components/Form.vue'
import RouteCharts from './components/RouteCharts.vue'
import 'primeflex/primeflex.css';
import axios from 'axios'


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
      chartTwoData: [],
      pathSafest: []
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
    },
    postRoute() {
      let postObject = {
        initLat: this.origin.lat,
        initLng: this.origin.lng,
        destLat: this.destiny.lat,
        destLng: this.destiny.lng,
        destiny: this.destiny,
        date: this.date.valueOf()
      }
      console.log(postObject)
      axios
        .post('https://safetrip-api.herokuapp.com/route', postObject)
          .then(response => {
            let paths = response.data.split("|");
            this.pathFastest = this.processResponse(paths[0])
            this.pathSafest = this.processResponse(paths[1])
            //this.path = data.data.path
            //this.chartOneData = data.data.chart_one
            //this.chartOneData = data.data.chart_two
            this.isShowingRoute = true;
          })
          .catch(error => {
            console.log(error)
          })
      },
      processResponse(response) {
        let pathTemp = [];
        let coordinates = response.split(";");
        console.log(coordinates);
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
      }
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
