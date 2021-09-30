<template>
	<div style="min-height: 100%">

	<GmapMap
		:center="center"
		:zoom="17"
		map-type-id="terrain"
		style="min-height: calc(100vh);"
		>
		<GmapPolyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'red'}">
         </GmapPolyline>
		<GmapMarker
			:key="index"
			v-for="(m, index) in markers"
			:position="m.position"
			:clickable="true"
			:draggable="true"
			@click="center=m.position"
		/>
	</GmapMap>
	</div>
</template>


<script>
export default {
  name: 'SafeTrip',
  props: {
    msg: String,
    markers: Array
  },
  components: {
  },
	data () {
		return {
		center: {lat:-25.4391300, lng: -49.26872199999999},
		path: [
			{lat:-25.44514,lng:-49.28661},
			{lat:-25.43073,lng:-49.32408},
			{lat:-25.44428,lng:-49.46756},
			{lat:-25.44934,lng:-49.61607},
			{lat:-25.46536,lng:-49.76579},
			{lat:-25.45992,lng:-49.93805},
			{lat:-25.43216,lng:-50.06013},
			{lat:-25.46874,lng:-50.30016},
			{lat:-25.45486,lng:-50.43949},
			{lat:-25.45398,lng:-50.61486},
			{lat:-25.43383,lng:-50.7217},
			{lat:-25.31609,lng:-51.00276},
			{lat:-25.33785,lng:-51.21577},
			{lat:-25.33944,lng:-51.42605},
			{lat:-25.40006,lng:-51.46775}
		]
		}
	},
	watch: {
		markers: function (val) {
			console.log(val)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


