<template>
  <v-dialog light max-width="600px" v-model="dialog">
    <v-btn 
      fixed
      dark
      fab
      bottom
      right
      color="red"
      slot="activator"
      class="success"
    >
      <v-icon>person</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <h2>트래킹 대상 추가하기</h2>
      </v-card-title>
      <v-card-text class="px-3">
        <v-form class="px-3" ref="form">
          <v-text-field label="아이디" v-model="title" prepend-icon="person" :rules="inputRules"></v-text-field>
          
          <v-btn flat class="success mx-0 mt-3" @click="submit(title)" :loading="loading">트래킹 시작</v-btn>
        </v-form>
      </v-card-text>      
    </v-card>
  </v-dialog>
</template>

<script>
import db from '~/fb'

export default {
  data () {
    return {
      title: '',
      inputRules: [
        v => v.length >= 1 || 'Minimum length is 1 characters'
      ],
      loading: false,
      dialog: false
    }
  },
  computed: {
  },
  methods: {
    submit (name) {
      if (this.$refs.form.validate()) {
        this.loading = true;
        
        this.$axios.get("https://us-central1-my-user-project-249107.cloudfunctions.net/tracker/crawler/"+name).then(res => {
          console.log(res);
          alert('완료!');
          this.loading = false;
        })

      }
    },
  }
}
</script>

<style scoped>

</style>