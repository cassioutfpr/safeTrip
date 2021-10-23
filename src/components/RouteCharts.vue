<template>
	<div>
		<div style="margin-top: 0vh">
			<div>
				<Button icon="pi pi-undo" label="" class="p-button-rounded p-button-outlined p-button-danger" @click="handleClick" style="margin-top:0px;float: left"/>
				<Button label="Rota Rápida" class="p-button p-button-danger"
				@click="handleClickFastest" style="margin-top:0px;"/>	
				<Button label="Rota Segura" class="p-button p-button-primary" @click="handleClickSafest" 
				style="margin-top:0px;"/>
			</div>

			<div style="margin-top: 10px">
				<p style="font-weight: bold;display: inline">Distância:</p> {{formatValue(distanceToShow)}}km
				<p style="font-weight: bold;display: inline;margin-left: 20px">Tempo:</p> {{formatValue(timeToShow)}}h
			</div>

			<div>
				<Chart type="bar" :data="basicData" style="margin-top: 10px" :options="options"
				ref="chartOne"></Chart>
			</div>
			<Chart type="bar" :data="basicData2" style="margin-top: 10px;" :options="options"
			ref="chartTwo"></Chart>

		</div>
	</div>
</template>


<script>
import Button from 'primevue/button';
import Chart from 'primevue/chart';

export default {
	name: 'RouteCharts',
	props: {
		chart_one_data: Array,
		chart_one_bck: Array,
		chart_two_data: Array,
		chart_two_bck: Array,
		chart_three_data: Array,
		chart_three_bck: Array,
		chart_four_data: Array,
		chart_four_bck: Array,
		distance_fastest: Number,
		time_fastest: Number,
		distance_safest: Number,
		time_safest: Number,
	},
	mounted() {
		this.basicData.datasets[0].data = this.chart_one_data;
		this.basicData.datasets[0].backgroundColor = this.chart_one_bck;
		this.$refs.chartOne.refresh();
		this.basicData2.datasets[0].data = this.chart_two_data;
		this.basicData2.datasets[0].backgroundColor = this.chart_two_bck;
		this.$refs.chartTwo.refresh();
	},
	data: function() {
		return {
			options: {
				scales: {
				yAxes: [{
					display: true,
					ticks: {
						suggestedMin: 0,
						beginAtZero: true,
					}
					}]
				}
			},
			fastestRouteSelected: true,
			basicData: {
				labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
				'12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
				datasets: [
					{
						label: 'Horários',
						backgroundColor: [
                            '#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5',
                            '#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#FFA726',
                            '#FFA726','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5',
                            '#42A5F5','#42A5F5','#42A5F5',
						],
						data: [60, 65, 68, 59, 55, 70, 85, 80, 70, 55, 53, 50, 45, 43, 48, 51, 66, 78,
						90, 84, 75, 70, 65, 62]
					},
				]
			},
			basicData2: {
				labels: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
				datasets: [
					{
						label: 'Horários',
						backgroundColor: [
                            '#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5',
						],
						data: [0, 0, 0, 0, 0, 0, 0],
					},
				]
			},
		}
	},
	components: {
		Button, Chart
	},
	methods: {
		formatValue(value) {
			return value.toFixed(2);
		},
		handleClick() {
			this.$emit('handleBackToForm');
		},
		async handleClickFastest() {
			this.fastestRouteSelected = true;
			this.basicData.datasets[0].data = this.chart_one_data;
			this.basicData.datasets[0].backgroundColor = this.chart_one_bck;
			this.$refs.chartOne.refresh();				
			this.basicData2.datasets[0].data = this.chart_two_data;
			this.basicData2.datasets[0].backgroundColor = this.chart_two_bck;
			this.$refs.chartTwo.refresh();
		},
		async handleClickSafest() {
			this.fastestRouteSelected = false;

			this.basicData.datasets[0].data = this.chart_three_data;
			this.basicData.datasets[0].backgroundColor = this.chart_three_bck;
			this.$refs.chartOne.refresh();
			this.basicData2.datasets[0].data = this.chart_four_data;
			this.basicData2.datasets[0].backgroundColor = this.chart_four_bck;

			this.$refs.chartTwo.refresh();

		},
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

	},
	computed: {
		distanceToShow: function() {
			return this.fastestRouteSelected ? this.distance_fastest : this.distance_safest;
		},
		timeToShow: function() {
			return this.fastestRouteSelected ? this.time_fastest : this.time_safest;
		},
	},
	watch: {
		chart_one_data: function() {
			this.basicData.datasets[0].data = this.chart_one_data;
		},
		chart_one_bck: function() {
			this.basicData.datasets[0].backgroundColor = this.chart_one_bck;
			this.$refs.chartOne.refresh();
		},
		chart_two_data: function() {
			this.basicData2.datasets[0].data = this.chart_two_data;
		},
		chart_two_bck: function() {
			this.basicData2.datasets[0].backgroundColor = this.chart_two_bck
			this.$refs.chartTwo.refresh();
		},
		chart_three_data: function() {
			this.basicData.datasets[0].data = this.chart_three_data;
		},
		chart_three_bck: function() {
			this.basicData.datasets[0].backgroundColor = this.chart_three_bck
			this.$refs.chartOne.refresh();
		},
		chart_four_data: function() {
			this.basicData2.datasets[0].data = this.chart_four_data;
		},
		chart_four_bck: function() {
			this.basicData2.datasets[0].backgroundColor = this.chart_four_bck
			this.$refs.chartTwo.refresh();
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
