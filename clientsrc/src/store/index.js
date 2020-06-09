import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard;
    },
    setList(state, list) {
      state.lists.push(list);
    },
    setLists(state, lists) {
      state.lists = lists;
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region -- BOARDS --
    async getBoards({ commit, dispatch }) {
      try {
        await api.get("boards").then((res) => {
          commit("setBoards", res.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addBoard({ commit, dispatch }, boardData) {
      try {
        await api.post("boards", boardData).then((serverBoard) => {
          dispatch("getBoards");
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBoard({ commit, dispatch }, id) {
      try {
        let res = await api.get("boards/" + id);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- LISTS --
    async getLists({ commit, dispatch }) {
      try {
        await api.get("lists").then((res) => {
          commit("setLists", res.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addList({ commit, dispatch }, newList) {
      try {
        let res = await api.post("lists", newList);
        debugger;
        commit("setList", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- Tasks --

    //#endregion

    //#region -- Comments --

    //#endregion
  },
});
