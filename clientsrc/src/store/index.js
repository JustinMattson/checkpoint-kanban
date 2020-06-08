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
          debugger;
          dispatch("getBoards");
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getActiveBoard({ commit, dispatch }, id) {
      try {
        let res = await api.get("/boards/" + id);
        debugger;
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- LISTS --

    //#endregion

    //#region -- Tasks --

    //#endregion

    //#region -- Comments --

    //#endregion
  },
});
