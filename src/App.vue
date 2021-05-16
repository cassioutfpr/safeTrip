<template>
  <div id="app">
    <div class="p-grid p-nogutter" id="bottom">
      <div class="p-col-4">
        <div id="title" style="margin-bottom: 0px">
          <img src="../public/icon.png" alt="Girl in a jacket" width="300" height="100"> 
        </div>
        <Form v-if="!isShowingRoute" @handleSearchRoute='handleSearchRoute' style='margin-top:20px'/>
        <RouteCharts v-if="isShowingRoute" @handleBackToForm='handleBackToForm'/>
      </div>
      <div class="p-col-8">
        <SafeTrip :markers='markers'/>
      </div>
    </div>
  </div>
</template>

<script>
import SafeTrip from './components/SafeTrip.vue'
import Form from './components/Form.vue'
import RouteCharts from './components/RouteCharts.vue'
import 'primeflex/primeflex.css';

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
      isShowingRoute: false
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

      this.isShowingRoute = true;
      console.log(val.origin, val.destiny,val.date);
    },
    handleBackToForm() {
      this.isShowingRoute = false;
    }
  }
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
