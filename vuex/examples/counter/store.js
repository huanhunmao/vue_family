import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
  count: 0,
};
const mutations = {
  increment(state) {
    state.count++;
  },
  decrement(state) {
    state.count--;
  },
};
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit("increment"),
  decrement: ({ commit }) => commit("decrement"),
  // 判断 奇数
  incrementIfOdd({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit("increment");
    }
  },

  // 异步使用 promise 写法
  incrementAsync({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit("increment");
        resolve();
      }, 1000);
    });
  },
};

// getters are functions.
const getters = {
  // even 偶数  odd 奇数
  evenOrOdd: (state) => (state.count % 2 === 0 ? "even" : "odd"),
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  //  Vue Components(dispatch) --> actions(commit) ---> mutations(mutate) ---> state(rander)  --- > Vue Components
});
