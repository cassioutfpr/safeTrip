<template>
	<div>
		<h6 style="margin-bottom: 5px">Origem</h6>
		<vue-google-autocomplete
		ref="address"
		id="map"
		classname="form-control"
		placeholder=""
		v-on:placechanged="getAddressData"
		country="br"
		style="width: 60%;height: 4vh"
		types="(cities)"
		>
		</vue-google-autocomplete>
		<h6 style="margin-bottom: 5px">Destino</h6>
		<vue-google-autocomplete
		ref="address"
		id="map2"
		classname="form-control"
		placeholder=""
		v-on:placechanged="getAddressData2"
		country="br"
		style="width: 60%;height: 4vh"
		types="(cities)"
		>
		</vue-google-autocomplete>

		<h6 style="margin-bottom: 5px">Dia/horário</h6>
		<Calendar id="time24" v-model="date" :showTime="true" :showSeconds="true" />

		<div style="margin-top: 10vh">
		<Button icon="pi pi-search" label="Buscar Rota Segura" class="p-button-rounded" 
			style="min-height: 50px"
		@click="handleClick">
			<div v-if="!loading">
				Buscar Rota Segura <span class='pi pi-search'></span>
			</div>
			<div v-else style="display:flex; align-items: center;justify-content: center">
				Calculando Rota   <three-dots :color="'#FFFFFF'" :size="'30px'" style="margin-left: 15px"/>
			</div>
		</Button>
		</div>

		<Toast/>
	</div>
</template>


<script>
import Calendar from 'primevue/calendar';
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import Button from 'primevue/button';
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'
import Toast from 'primevue/toast';

export default {
	name: 'Form',
	data: function() {
		return {
			selectedCountry: null,
			filteredCountriesBasic: null,
			date: null,
			address: '',
			origin: {},
			destiny: {},
			loading: false
		}
	},
	components: {
		Calendar,
		VueGoogleAutocomplete,
		Button,
		ThreeDots,
		Toast
	},
	methods: {
		searchCountry(event) {
            this.filteredCountriesBasic = event.query;
		},
		getAddressData: function (addressData, placeResultData, id) {
			this.address = addressData;
			this.origin = {
				lat: placeResultData.geometry.location.lat(),
				lng: placeResultData.geometry.location.lng(),
				id: id
			}
		},
		getAddressData2: function (addressData, placeResultData, id) {
			this.destiny = {
				lat: placeResultData.geometry.location.lat(),
				lng: placeResultData.geometry.location.lng(),
				id: id
			}
			//console.log(addressData, placeResultData, id)
		},
		handleClick() {
			this.$toast.add({severity:'success', summary: 'Aguarde', detail:'A rota mais segura para você viajar está sendo calculada',
				life: 3000});
			this.loading = true;
			this.$emit('handleSearchRoute',
				{
					origin:this.origin,
					destiny:this.destiny,
					date:this.date
				}
			);
		}
	},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
