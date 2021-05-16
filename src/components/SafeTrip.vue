<template>
	<div style="min-height: 100%">

	<GmapMap
		:center="{lat:-25.4391300, lng: -49.26872199999999}"
		:zoom="17"
		map-type-id="terrain"
		style="min-height: calc(100vh);"
		>
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
	watch: {
		markers: function (val) {
			console.log(val)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
