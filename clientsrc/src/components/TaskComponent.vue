<template>
  <div class="task">
    <div class="card shadow border-primary" style="background-color:#eee">
      <div class="d-flex justify-content-between px-2">
        <span class="text-muted" :style="{fontSize:fontSize}">TASK ID: {{task.id}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteTask(task.id)"></i>
        </span>
      </div>
      <div class="card-body">
        <h4 class="card-title">{{task.title}}</h4>
        <div>{{task.description}}</div>
        <div>TASK.LISTID: {{task.listId}}</div>
        <form class="d-inline" v-if="edit" @submit.prevent="editTask">
          <input type="text" name="title" v-model="task.title" />
          <input type="text" name="description" v-model="task.description" />
          <button type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
        <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>

      <!-- ADD COMMENT FORM -->
      <div class="m-2">
        <div v-if="commentForm == false" class="text-right text-success m-2">
          <i class="fas fa-plus action" @click="toggleComment">&nbsp;Add Comment</i>
        </div>
        <div v-else class="text-right text-success">
          <i class="fas fa-minus action" @click="toggleComment">&nbsp;Done Adding Comments</i>
        </div>
        <form class="d-inline" v-if="commentForm" @submit.prevent="addComment">
          <input type="text" name="title" v-model="newComment.title" placeholder="Comment Title..." />
          <input
            type="text"
            name="description"
            v-model="newComment.description"
            placeholder="Comment Description..."
          />
          <button type="submit" class="btn btn-outline-success">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Comment from "@/components/CommentComponent.vue";
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      fontSize: "10px",
      edit: false,
      commentForm: false,
      newComment: {
        taskId: this.task.id
      }
    };
  },
  mounted() {
    this.$store.dispatch("getComments");
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    toggleComment() {
      this.commentForm = !this.commentForm;
    },

    deleteTask() {
      this.$store.dispatch("deleteTask", this.task.id);
    },
    editTask() {
      this.$store.dispatch("editTask", this.task);
      this.edit = false;
    },
    addComment() {
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = { taskId: this.task.id };
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>