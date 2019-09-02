<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      
    >
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.id"
          router
          exact
          @click="change_target(item.id)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <Popup></Popup>

    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
      flat
      color='red'
      dark
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container
      fluid
    >
      <v-row        
      >
        <v-col
          v-for="post in posts" 
          :key="post.id"
          :cols="4"
        >
          <Profile
            v-if="post.user_id === current_target.id"
            :caption="post.caption"
            :imgSrc="post.image_url"
          />
        </v-col>      
      </v-row>
    </v-container>
  </div>
  
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import db from '~/fb.js'

export default {
  data() {
    return {
      posts: [],
      users: [],
      current_target: null,
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
    
  },
  created() {
    // 일단 하자.
    db.collection("instagram_users").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {

        const fb_data = change.doc.data();

        if (change.type === 'added') {
          const obj = {
            id: change.doc.id,
            ...fb_data
          }

          const nav_obj = {
            id: change.doc.id,
            icon: 'person',
            title: fb_data.full_name,
          }

          this.users.push(obj);
          this.items.push(nav_obj);
        }
      })

      this.current_target = this.users[0]
    });

    db.collection("instagram_posts").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {

        const fb_data = change.doc.data();

        if (change.type === 'added') {
          const obj = {
            id: change.doc.id,
            ...fb_data
          }
          this.posts.push(obj)
        }
      })
    });
  },
  components: {
    // Gallery: () => import("~/components/Gallery"),
    Profile: () => import("~/components/Profile"),
    Popup: () => import("~/components/Popup"),
  },
  methods: {
    change_target (target_id) {
      this.current_target = this.users.find(x => x.id === target_id);
    }
  },
}
</script>
