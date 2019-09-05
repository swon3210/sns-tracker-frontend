<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      app
      clipped
      right
    >
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Open Temporary Drawer</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item 
          v-for="item in items"
          :key="item.id"
          @click="changeTarget(item)"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="left"
      fixed
      temporary
    ></v-navigation-drawer>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <nuxt />
      </v-container>
    </v-content>

    <v-navigation-drawer
      v-model="right"
      fixed
      right
      temporary
    ></v-navigation-drawer>

    <!-- <v-footer
      app
      color="blue-grey"
      class="white--text"
    >
      <span>Vuetify</span>
      <div class="flex-grow-1"></div>
      <span>&copy; 2019</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import db  from '~/fb.js'

export default {
  data() {
    return {
      items: [
        {
          icon: 'apps',
          title: '소개',
          to: '/intro'
        },
      ],
      drawer: null,
      drawerRight: null,
      right: false,
      left: false,
    }
  },
  computed: {
    
  },
  created() {
    db.collection("instagram_users").onSnapshot(res => {
      const changes = res.docChanges();
      let user_nav_list = [];
      let user_info_list = [];

      changes.forEach(change => {

        let fb_data = change.doc.data();

        if (change.type === 'added') {
          let user_obj = {
            id: change.doc.id,
            ...fb_data
          }

          let nav_obj = {
            id: change.doc.id,
            icon: 'person',
            title: fb_data.full_name,
          }

          this.items.push(nav_obj);
          user_nav_list.push(nav_obj);
          user_info_list.push(user_obj);
        } else if (change.type === 'added') {
          
        }
      })

      // 현재 유저와 유저 목록 초기화
      this.changeTarget(user_info_list[0]);
      this.initUsers(user_info_list);

      
      
    });

    db.collection("instagram_posts").onSnapshot(res => {
      let changes = res.docChanges();
      let posts = [];
      changes.forEach(change => {

        let fb_data = change.doc.data();

        if (change.type === 'added') {
          let obj = {
            id: change.doc.id,
            ...fb_data
          }
          posts.push(obj)
        }
      })

      this.initPosts(posts)
    });
  },
  methods: {
    ...mapMutations([
      'changeTarget',
      'initUsers',
      'initPosts'
    ]),
  },
}
</script>

<style>
.border-bottom {
  border: 1px solid grey;
}
</style>
