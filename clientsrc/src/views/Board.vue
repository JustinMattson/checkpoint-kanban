<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="col-12" style="height:75px;">&nbsp;</div>
        <div class="text-left text-muted" :style="{ fontSize: fontSize }">
          Board Vue: Display multiple list components. Each list can have multiple
          task components. Each task can have multiple comments that can be moved to
          the various lists.
        </div>
        <h1 class="text-light text-shadow" v-if="board.title">{{ board.title }}</h1>
        <h1 class="text-light text-shadow" v-else>Loading...</h1>
        <!-- Insert form to Add new list items-->
        <div class="d-flex justify-content-center text-danger">Create List</div>
        <div class="d-flex justify-content-center">
          <form class="form-inline mb-4" @submit.prevent="addList">
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
              <button type="submit" class="btn btn-outline-danger">Submit</button>
            </div>
          </form>
        </div>

        <!-- Display our Lists -->
        <div class="container-fluid horizontal-scrollable">
          <div class="row">
            <!-- removed v-show due to refactoring server: v-show="board.id == list.boardId" -->
            <list v-for="list in lists" :key="list.id" :list="list" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "@/components/ListComponent.vue";
export default {
  name: "board",
  data() {
    return {
      fontSize: "10pt",
      newList: {
        boardId: this.$route.params.boardId,
      },
    };
  },
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {
    addList() {
      this.$store.dispatch("addList", { ...this.newList });
      this.newList = { boardId: this.$route.params.boardId };
    },
  },
  components: {
    List,
  },
};
</script>

<style scoped>
/* .grow {
  min-height: 100vh;
} */
</style>
