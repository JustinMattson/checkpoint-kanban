<template>
  <div class="board">
    Board Vue
    This board will show multiple list components each having multiple task components
    drawn dynamically with v-for:
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <!-- Insert form to Add new list items-->
    <form class="form-inline" @submit.prevent="addList">
      <div class="form-group">
        <input
          type="text"
          name="title"
          id
          class="form-control"
          placeholder="List Title..."
          v-model="newList.title"
        />
        <input
          type="text"
          name="description"
          id
          class="form-control"
          placeholder="List Description..."
          v-model="newList.description"
        />
        <button type="submit" class="btn btn-outline-info">Submit</button>
      </div>
    </form>

    <!-- Display our Lists -->
    <div></div>
  </div>
</template>

<script>
import Lists from "@/components/ListComponent.vue";
export default {
  name: "board",
  data() {
    return {
      newList: {
        boardId: this.$route.params.boardId
      }
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.id);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", { ...this.newList });
      this.newList = { boardId: this.$route.params.boardId };
    }
  },
  components: {
    Lists
  }
  //props: ["boardId"]
};
</script>
