<template>
  <v-row>
    <Popup />
    <v-col cols="12" md="8" offset-md="2" sm="10" offset-sm="1">
      <v-card>
        <v-container fluid>
          <v-row
          >
            <v-col
              v-for="post in current_posts"
              :key="post.id"
              class="d-flex child-flex"
              sm="6"
              md="4"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="post.image_url"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import db from '~/fb.js'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: '소개',
          to: '/intro'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Instagram Tracker'
    }
  },
  computed: {
    ...mapState({
      current_target: state => state.current_target,
      posts: state => state.posts
    }),
    ...mapGetters(['current_posts'])
  },
  created() {
    // 일단 하자.
    // 초기값을 null로 잡으면 안 되겠구나...
    
  },
  components: {
    // Gallery: () => import("~/components/Gallery"),
    Profile: () => import("~/components/Profile"),
    Popup: () => import("~/components/Popup"),
  },
  methods: {
    testMethod () {
    }
  },
}
</script>
