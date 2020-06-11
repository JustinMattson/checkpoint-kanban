<template>
  <div class="board col-xs-4">
    <!-- This is the component that will design board link on the boards vue. -->
    <div class="card shadow m-2 border-secondary" style="bacground-color:#0000ff00">
      <div class="d-flex justify-content-between px-2">
        <!-- BOARD ID -->
        <span class="text-secondary" :style="{fontSize:fontSize}">{{board.id}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteBoard(board.id)"></i>
        </span>
      </div>
      <!-- EDIT BOARD FORM -->
      <div class="m-2">
        <form class="d-inline" v-if="edit" @submit.prevent="editBoard">
          <input type="text" name="title" v-model="board.title" placeholder="Board Title..." />
          <input
            type="text"
            name="description"
            v-model="board.description"
            placeholder="Board Description..."
          />
          <button type="submit" class="btn btn-outline-secondary">Submit</button>
        </form>
      </div>

      <router-link :to="{name: 'board', params: {boardId: board.id}}" style="text-decoration:none;">
        <div class="card-body py-0">
          <h4 class="card-title">{{board.title}}</h4>
          <div class="pb-2">{{board.description}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  props: ["board"],
  data() {
    return {
      color: blue,
      fontSize: "10px",
      edit: false
    };
  },
  // mounted() {
  //   return this.$store.dispatch("getLists", this.board.id);
  // },
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
.something {
  color: #0000ff00;
}
</style>