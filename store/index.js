import db from '~/fb.js'

export const state = () => ({
  instagram_users: '',
  instagram_posts: '',
  current_target: null,
});

export const mutations = {
  init_users (state, payload) {
    state.instagram_users = payload;
  },
  init_posts (state, payload) {
    state.instagram_posts = payload;
  },
  change_user (state, payload) {
    state.current_target = payload;
  }
};

export const actions = {
  async nuxtServerInit ({ commit }, context) {

    await db.collection("instagram_users").onSnapshot(res => {
      const changes = res.docChanges();

      let instagram_users = [];

      changes.forEach(change => {

        const fb_data = change.doc.data();

        if (change.type === 'added') {
          const obj = {
            id: change.doc.id,
            ...fb_data
          }
          instagram_users.push(obj)
        }
      })

      commit('init_users', instagram_users);

    });

    await db.collection("instagram_posts").onSnapshot(res => {
      const changes = res.docChanges();

      let instagram_posts = [];

      changes.forEach(change => {

        const fb_data = change.doc.data();

        if (change.type === 'added') {
          const obj = {
            id: change.doc.id,
            ...fb_data
          }
          instagram_posts.push(obj)
        }
      })

      commit('init_posts', instagram_posts);

    });

    console.log()
  }
};

