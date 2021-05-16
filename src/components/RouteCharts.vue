<template>
	<div>
		<div style="margin-top: 0vh">
			<Chart type="bar" :data="basicData" >Opa</Chart>
			<Chart type="bar" :data="basicData2" >Opa</Chart>
			<Button icon="pi pi-undo" label="Voltar" class="p-button-rounded p-button-outlined p-button-danger" 
			@click="handleClick" style="margin-top:30px"/>
		</div>
	</div>
</template>


<script>
import Button from 'primevue/button';
import Chart from 'primevue/chart';

export default {
	name: 'RouteCharts',
	data: function() {
		return {
			basicData: {
				labels: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
				'12', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
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
						label: 'Dias ',
						backgroundColor: [
                            '#42A5F5','#FFA726','#42A5F5','#42A5F5','#42A5F5','#42A5F5','#42A5F5'
						],
						data: [75, 69, 69, 71, 80, 85, 95]
					},
				]
			},
		}
	},
	components: {
		Button, Chart
	},
	methods: {
		handleClick() {
			this.$emit('handleBackToForm');
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
