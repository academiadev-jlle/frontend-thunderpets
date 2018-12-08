import Vue from 'vue';

Vue.filter('genderText', (value) => {
  if (!value) {
    return '';
  }

  return value === 'FEMEA' ? 'fêmea' : value.toLowerCase();
});

Vue.filter('genderIcon', (value) => {
  if (value === 'FEMEA') {
    return 'mdi-gender-female';
  } else if (value === 'MACHO') {
    return 'mdi-gender-male';
  }

  return 'mdi-help';
});

Vue.filter('statusText', (value) => {
  if (value === 'PROCURANDO_DONO') {
    return 'Achado';
  } else if (value === 'PROCURANDO_PET') {
    return 'Perdido';
  } else if (value === 'MACHO') {
    return 'mdi-gender-male';
  } else if (value === 'MACHO') {
    return 'mdi-gender-male';
  } else if (value === 'MACHO') {
    return 'mdi-gender-male';
  }

  return '';
});

Vue.filter('sizeText', (value) => {
  if (!value) {
    return '';
  }

  return value === 'MEDIO' ? 'médio' : value.toLowerCase();
});

Vue.filter('sizeIcon', (value) => {
  if (value === 'PEQUENO') {
    return 'mdi-alpha-p';
  } else if (value === 'MEDIO') {
    return 'mdi-alpha-m';
  }

  return 'mdi-alpha-g';
});

Vue.filter('capitalize', (value) => {
  if (!value) {
    return '';
  }

  return value.charAt(0).toUpperCase() + value.slice(1, value.length).toLowerCase();
});

