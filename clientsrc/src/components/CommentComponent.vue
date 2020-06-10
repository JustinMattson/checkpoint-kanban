<template>
  <div class="comment">
    <div class="card shadow border-success my-1" style="background-color:#ddd;minWidth:35em">
      <div class="d-flex justify-content-between px-2">
        <span class="text-left">
          <!-- TASK ID -->
          <div class="text-muted text-left" :style="{fontSize:fontSize}">{{comment.taskId}}</div>
        </span>
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
      <div class="card-body p-2 text-wrap">
        <!-- EDIT COMMENT FORM -->
        <div class="m-2">
          <form class="d-inline" v-if="edit" @submit.prevent="editComment">
            <input type="text" name="title" v-model="comment.title" />
            <input type="text" name="description" v-model="comment.description" />
            <button type="submit" class="btn btn-outline-success">Submit</button>
          </form>
        </div>
        <h4 class="card-title">{{comment.title}}</h4>
        <div>{{comment.description}}</div>

        <!-- COMMENT ID -->
        <!-- USER Name -->
        <span class="d-flex justify-content-between">
          <div class="text-success text-left" :style="{fontSize:fontSize}">{{comment.id}}</div>
          <div class="text-right" :style="{fontSize:fontSize}">{{comment.creatorEmail}}</div>
        </span>
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
      fontSize: "10px",
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