<template>
  <div class="boards">
    <h1 class="text-light text-shadow">WELCOME TO THE BOARDS!!!</h1>
    <span class="text-secondary">Create Board</span>
    <form @submit.prevent="addBoard" class="mb-4">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-outline-secondary" type="submit">Create Board</button>
    </form>
    <div class="container-fluid horizontal-scrollable">
      <div class="row">
        <board v-for="board in boards" :key="board.id" :board="board" />
      </div>
    </div>
  </div>
</template>

<script>
import Board from "@/components/BoardComponent.vue";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
  },
  components: {
    Board,
  },
};
</script>

<style scoped>
.boards {
  position: absolute;
  top: 75px;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
