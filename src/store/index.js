import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        cats: []
    },
    getters: {
        doneTodos: state => {
            return state.count
        },
        gettersCats: state => {
            return state.cats
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        mutationsCats(state, payload) {
            state.cats = payload.cats
        }
    },
    actions: {
        increment({ commit }) {
            commit('increment')
        },
        actionsCats({ commit }) {
            axios
                .get("/alimama/cats.json")
                .then(res => {
                    let tempArr = res.data.cats;
                    commit('mutationsCats', {
                        cats: tempArr
                    })
                })
                .catch(e => {
                    console.log(e);
                    commit('mutationsCats', {
                        cats: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    })
                });
        }
    }
})