<template>
  <div class="board col-xs-4">
    <!-- This is the component that will design board link on the boards vue. -->
    <div class="card shadow m-2">
      <div class="d-flex justify-content-between px-2">
        <span>BOARD ID: {{board.id}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteBoard(board.id)"></i>
        </span>
      </div>
      <router-link :to="{name: 'board', params: {boardId: board.id}}" style="text-decoration:none;">
        <div class="card-body">
          <h4 class="card-title">{{board.title}}</h4>
          <div>{{board.description}}</div>
        </div>
      </router-link>
      <!-- Insert edit Form -->
      <!-- REVIEW THIS IS THE MAIN BOARDS VUE -->
      <div class="m-2">
        <form class="d-inline" v-if="edit" @submit.prevent="editBoard">
          <input type="text" name="title" v-model="board.title" placeholder="Board Title..." />
          <input
            type="text"
            name="description"
            v-model="board.description"
            placeholder="Board Description..."
          />
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  props: ["board"],
  data() {
    return {
      edit: false
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.board);
      edit = false;
    },
    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    }
  },
  components: {}
};
</script>


<style scoped>
</style>