<template>
  <div>
    <gmap-autocomplete
      :value="formattedAddress"
      @place_changed="setPlace"
      id="autocomplete"
    ></gmap-autocomplete>
    <br>
    <br>
    <gmap-map
      :center="center"
      :zoom="15"
      @click="updateMarker"
      id="gmap"
      ref="gmap"
    >
      <gmap-marker
        :icon="pawMarker"
        :position="location"
        @click="markerClick"
        @dragend="updateMarker"
        clickable
        draggable
        v-if="location"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import pawMarker from '../assets/paw-marker.png';

export default {
  name: 'GoogleMap',
  data() {
    return {
      center: {
        lat: -26.3048801,
        lng: -48.8462105,
      },
      formattedAddress: null,
      geocoder: null,
      location: null,
      pawMarker,
    };
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
    this.$refs.gmap.$mapPromise.then(() => {
      // eslint-disable-next-line
      this.geocoder = new google.maps.Geocoder();
    });
  },
  methods: {
    updateMarker(mousePosition) {
      this.location = {
        lat: mousePosition.latLng.lat(),
        lng: mousePosition.latLng.lng(),
      };
      this.reverseGeocode(this.location, true);
    },
    markerClick() {
      this.center = this.location;
    },
    reverseGeocode(latLng, updatePlace) {
      this.geocoder.geocode({ location: latLng }, (results, status) => {
        // eslint-disable-next-line
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];

          if (updatePlace) {
            this.formattedAddress = result.formatted_address;
          }

          const location = {
            cidade: result.address_components[3].long_name,
            estado: result.address_components[4].long_name,
            latitude: latLng.lat,
            longitude: latLng.lng,
          };

          this.$emit('input', location);
        }
      });
    },
    setPlace(place) {
      this.location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      this.reverseGeocode(this.location, false);
      this.center = this.location;
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
    height: 520px;
    width:100%;
  }
</style>

