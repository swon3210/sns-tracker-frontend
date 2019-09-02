<template>
  <v-card
    class="mb-5"
  >
    <v-img
      :src="imgSrc"
      class="grey lighten-2"
      
    />
    <v-card-text>
      {{caption}}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        flat
        nuxt
        to="/intro"
      >다운로드</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    },
  }
}
</script>