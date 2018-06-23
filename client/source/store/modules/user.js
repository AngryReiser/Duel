import Http from '@/utils/http';
import Router from '@/router';

import signin from './signin';

const state = {
  id: 0,
  nickname: '',
  email: '',
  avatar: 'null',
  rank: 0,
  gold: 0,
  level: 0,
  experience: 0,
  karma: 10,
  skillPoints: 10,
  idSkills: [],
  parameters: {
    health: 0,
    force: 0,
    energy_1: 0,
    energy_2: 0,
    energy_3: 0,
    armor: 0,
    rage: 0,
    luck: 0,
    block: 0,
  },
};

const getters = {};

const actions = {
  loadMe({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      Http.get('/me')
        .then((response) => {
          commit('setUserData', response);
        })
        .catch((error) => {
          // SessionService.signOut();
          dispatch('signin/showAlert', {
            type: 'error',
            message: error.message,
          });
          Router.push({ path: '/signin' });
        });
    });
  },

  loadUserParameters({ commit }) {
    Http.get('/static/user-parameters')
      .then((response) => {
        console.log(response);

        commit('setUserParameters', response);
      });
  },

  registration({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/users', user)
        .then((response) => {
          dispatch('signin/showAlert', {
            type: 'success',
            message: response.message,
          });
          Router.push({ path: '/signin' });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // newPassword({ dispatch }, password) {
  //   // ...
  // },

  // resetPassword({ dispatch }, email) {
  //   // ...
  // },

  signIn({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      Http.send('POST', '/signin', user)
        .then((response) => {
          localStorage.setItem('session-token', response.token);
          Router.push({ path: '/profile' });
        })
        .catch((error) => {
          dispatch('signin/showAlert', {
            type: 'error',
            message: error.message,
          });
          reject(error);
        });
    });
  },

  signOut({ dispatch }) {
    Http.send('DELETE', '/signout')
      .then((response) => {
        localStorage.removeItem('session-token');
        dispatch('signin/showAlert', {
          type: 'info',
          message: response.message,
        });
        Router.push({ path: '/signin' });
      })
      .catch((error) => {
        dispatch('signin/showAlert', {
          type: 'error',
          message: error.message,
        });
      });
  },


};

const mutations = {
  setUserData(state, userData) {
    state.id = userData.id;
    state.nickname = userData.nickname;
    state.email = userData.email;
    state.avatar = userData.avatar;
    state.rank = userData.rank;
    state.gold = userData.gold;
    state.level = userData.level;
    state.experience = userData.experience;
    state.karma = userData.karma;
    state.skillPoints = userData.skillPoints;
    state.idSkills = userData.idSkills;
  },

  setAvatar(state, avatar) {
    state.avatar = avatar;
  },

  setUserParameters(state, parameters) {
    state.parameters = parameters;
  },
};

const modules = {
  signin,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};
