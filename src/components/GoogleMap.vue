<template>
  <div>
    <div>
      <v-layout row align-center>
        <v-flex xs12>
          <gmap-autocomplete
            @place_changed="setPlace"
            id="autocomplete"
          ></gmap-autocomplete>
        </v-flex>
      </v-layout>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="15"
      @click="updateMarker"
      id="gmap"
    >
      <gmap-marker
        :position="location"
        @click="markerClick"
        @drag="updateMarker"
        clickable
        :icon="markerIcon"
        draggable
        v-if="location"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import store from '../store';
import pawMarker from '../assets/paw-marker.png';

export default {
  name: 'GoogleMap',
  data() {
    return {
      center: {
        lat: -26.3048801,
        lng: -48.8462105,
      },
      currentPlace: null,
      location: null,
      places: [],
      markerIcon: null,
    };
  },
  mounted() {
    this.markerIcon = pawMarker;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  },
  methods: {
    updateMarker(mousePosition) {
      this.location = {
        lat: mousePosition.latLng.lat(),
        lng: mousePosition.latLng.lng(),
      };
      store.commit('updateLocation', this.location);
    },
    markerClick() {
      this.center = this.location;
    },
    setPlace(place) {
      this.currentPlace = place;
      this.location = {
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      };
      store.commit('updateLocation', this.location);
      this.places.push(this.currentPlace);
      this.center = this.location;
      this.currentPlace = null;
    },
  },
};
</script>

<style lang="scss" scoped>
  #autocomplete {
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 8px 10px;
    width: 100%;
  }

  #gmap {
    height: 400px;
    width:100%;
  }
</style>

