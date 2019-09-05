import db from '~/fb.js'

export const state = () => ({
  users: [],
  posts: [],
  current_target: {},
});

export const mutations = {
  initUsers (state, payload) {
    state.users = payload;
  },
  initPosts (state, payload) {
    state.posts = payload;
  },
  changeTarget (state, payload) {
    state.current_target = payload;
  }
};

export const getters = {
  current_posts (state) {
    return state.posts.filter(x => x.user_id === state.current_target.id);
  }
};

export const actions = {
  // nuxtServerInit: async ({ commit }, context) => {

  //   await db.collection("instagram_users").onSnapshot(res => {
  //     const changes = res.docChanges();

  //     let users = [];

  //     changes.forEach(change => {

  //       const fb_data = change.doc.data();

  //       if (change.type === 'added') {
  //         const obj = {
  //           id: change.doc.id,
  //           ...fb_data
  //         }
  //         users.push(obj)
  //       }
  //     })

  //     commit('initUsers', users);

  //   });

  //   await db.collection("instagram_posts").onSnapshot(res => {
  //     const changes = res.docChanges();

  //     let posts = [];

  //     changes.forEach(change => {

  //       const fb_data = change.doc.data();

  //       if (change.type === 'added') {
  //         const obj = {
  //           id: change.doc.id,
  //           ...fb_data
  //         }
  //         posts.push(obj)
  //       }
  //     })

  //     commit('initPosts', posts);

  //   });

  //   console.log()
  // }
};

