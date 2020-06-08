<template>
  <div class="board">
    Board Vue
    This board will show multiple list components each having multiple task components
    drawn dynamically with v-for:
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "board",
  mounted() {
    debugger;
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    //this.$store.dispatch("getListItems", this.$route.params.id);
  },
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  }
  //props: ["boardId"]
};
</script>
