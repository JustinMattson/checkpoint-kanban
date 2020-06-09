<template>
  <div class="comment">
    <div class="card border-success">
      <div class="d-flex justify-content-between px-2">
        <span>COMMENT ID: {{comment.id}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
      <div class="card-body">
        <h4 class="card-title">{{comment.title}}</h4>
        <div>{{comment.description}}</div>
        <div>TASKID{{comment.taskId}}</div>
        <form class="d-inline" v-if="edit" @submit.prevent="editTask">
          <input type="text" name="title" v-model="comment.title" />
          <input type="text" name="description" v-model="comment.description" />
          <button type="submit" class="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Comment",
  props: ["comment"],
  data() {
    return {
      edit: false
    };
  },
  computed: {},
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },

    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment.id);
    },
    editComment() {
      this.$store.dispatch("editComment", this.comment);
      this.edit = false;
    }
  },
  components: {}
};
</script>


<style scoped>
</style>