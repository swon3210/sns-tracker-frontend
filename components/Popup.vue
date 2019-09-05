<template>
  <v-dialog light max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn 
        fixed
        dark
        fab
        bottom
        right
        color="lightgreen"
        class="success"
        v-on="on"
      >
        <v-icon>person</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>트래킹 대상 추가하기</h2>
      </v-card-title>
      <v-card-text class="px-3">
        <v-form class="px-3" ref="form">
          <v-text-field label="아이디" v-model="title" prepend-icon="person" :rules="inputRules"></v-text-field>
          
          <v-btn text class="success mx-0 mt-3" @click="submit(title)" :loading="loading">트래킹 시작</v-btn>
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
        
        this.$axios.get("https://us-central1-my-user-project-249107.cloudfunctions.net/tracker/"+name).then(res => {
          console.log(res);
          this.loading = false;
        }).catch(err => {
          console.log(err);
        })

      }
    },
  }
}
</script>

<style scoped>

</style>