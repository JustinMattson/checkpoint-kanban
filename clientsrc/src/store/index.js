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
    tasks: {},
    comments: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    //#region BOARDS
    setBoards(state, boards) {
      state.boards = boards;
    },
    updateBoard(state, update) {
      let foundBoard = state.boards.find((b) => b.id == update.id);
      foundBoard = update;
    },
    removeBoard(state, id) {
      let index = state.boards.findIndex((b) => b.id == id);
      state.boards.splice(index, 1);
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard;
    },
    //#endregion

    //#region LISTS
    setList(state, list) {
      state.lists.push(list);
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    updateList(state, update) {
      let foundList = state.lists.find((l) => l.id == update.id);
      foundList = update;
    },
    removeList(state, id) {
      let index = state.lists.findIndex((l) => l.id == id);
      state.lists.splice(index, 1);
    },
    //#endregion

    //#region TASKS
    setTask(state, task) {
      state.tasks[task.listId].push(task);
    },
    setTasks(state, tasks) {
      Vue.set(state.tasks, tasks.listId, tasks.data);
    },
    updateTask(state, update) {
      let foundTask = state.tasks[update.listId].find((t) => t.id == update.id);
      foundTask = update
    },
    removeTask(state, task) {
      let index = state.tasks[task.listId].findIndex((t) => t.id == task.id);
      state.tasks[task.listId].splice(index, 1);
    },
    moveTask(state, update) {
      let index = state.tasks[update.listId].findIndex(t => t.id == update.taskId)
      state.tasks[update.listId].splice(index, 1);
    },
    //#endregion

    //#region COMMENTS
    setComment(state, comment) {
      state.comments[comment.taskId].push(comment);
    },
    setComments(state, comments) {
      Vue.set(state.comments, comments.taskId, comments.data);
    },
    updateComment(state, update) {
      let foundComment = state.comments[update.taskId].find((t) => t.id == update.id);
      foundComment = update;
    },
    removeComment(state, comment) {
      let index = state.comments[comment.taskId].findIndex((t) => t.id == comment.id);
      state.comments[comment.taskId].splice(index, 1);
    },
    //#endregion
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
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
    async editBoard({ commit, dispatch }, update) {
      try {
        let res = await api.put("boards/" + update.id, update);
        commit("updateBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBoard({ commit, dispatch }, id) {
      try {
        let response = confirm(
          "Delete may orphan children. Click 'Ok' to confirm you wish to delete Board"
        );
        if (response) {
          let res = await api.delete("boards/" + id);
          commit("removeBoard", id);
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- LISTS --
    async getLists({ commit, dispatch }, id) {
      try {
        await api.get("boards/" + id + "/lists").then((res) => {
          commit("setLists", res.data);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async addList({ commit, dispatch }, newList) {
      try {
        let res = await api.post("lists", newList);
        commit("setList", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editList({ commit, dispatch }, update) {
      try {
        let res = await api.put("lists/" + update.id, update);
        commit("updateList", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, id) {
      try {
        let response = confirm(
          "Delete may orphan children. Click 'Ok' to confirm you wish to delete List"
        );
        if (response) {
          let res = await api.delete("lists/" + id);
          commit("removeList", id);
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- Tasks --
    async getTasks({ commit, dispatch }, id) {
      try {
        let res = await api.get("lists/" + id + "/tasks");
        commit("setTasks", { listId: id, data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit, dispatch }, newTask) {
      try {
        let res = await api.post("tasks", newTask);
        commit("setTask", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editTask({ commit, dispatch }, update) {
      try {
        let res = await api.put("tasks/" + update.id, update);
        commit("updateTask", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit, dispatch }, task) {
      try {
        let response = confirm(
          "Delete may orphan children. Click 'Ok' to confirm you wish to delete Task"
        );
        if (response) {
          let res = await api.delete("tasks/" + task.id);
          commit("removeTask", task);
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region -- Comments --
    async getComments({ commit, dispatch }, id) {
      try {
        let res = await api.get("tasks/" + id + "/comments");
        commit("setComments", { taskId: id, data: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post("comments", newComment);
        commit("setComment", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, update) {
      try {
        let res = await api.put("comments/" + update.id, update);
        commit("updateComment", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, comment) {
      try {
        let response = confirm(
          "Click 'Ok' to confirm you wish to delete Comment"
        );
        if (response) {
          let res = await api.delete("comments/" + comment.id);
          commit("removeComment", comment);
        } else {
          alert("Delete cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    async moveList({ commit, dispatch }, obj) {
      let newObj = { id: obj.taskId, listId: obj.newId }
      try {
        await api.put("tasks/" + obj.taskId, newObj)
        commit("moveTask", obj)
        dispatch("getTasks", obj.newId)
      } catch (error) {
        console.error(error)
      }
    }

  },






});
