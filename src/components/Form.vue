<template>
	<div>
		<h6 style="margin-bottom: 5px">Origem</h6>
        <GmapAutocomplete style="width: 60%;height: 4vh"
       @place_changed="setPlace1">
        </GmapAutocomplete>
		<h6 style="margin-bottom: 5px">Destino</h6>
        <GmapAutocomplete style="width: 60%;height: 4vh"
       @place_changed="setPlace2">
        </GmapAutocomplete>

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
import Button from 'primevue/button';
import ThreeDots from 'vue-loading-spinner/src/components/ThreeDots'
import Toast from 'primevue/toast';
import {gmapApi} from 'vue2-google-maps'

export default {
	name: 'Form',
	props: {
		loading: Boolean,
	},
	data: function() {
		return {
			selectedCountry: null,
			filteredCountriesBasic: null,
			date: null,
			address: '',
			origin: {},
			destiny: {}
		}
	},
	components: {
		Calendar,
		Button,
		ThreeDots,
		Toast
	},
	computed: {
		google: gmapApi
	},
	methods: {
		searchCountry(event) {
            this.filteredCountriesBasic = event.query;
		},
		setPlace1(val) {
			console.log(val.geometry.location.lat());
			this.origin = {
				lat: val.geometry.location.lat(),
				lng: val.geometry.location.lng()
			}
		},
		setPlace2(val) {
			this.destiny = {
				lat: val.geometry.location.lat(),
				lng: val.geometry.location.lng()
			}
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
