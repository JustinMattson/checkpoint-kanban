<template>
  <div class="task">
    <div class="card shadow border-primary my-1" style="background-color:#eee;">
      <div class="d-flex justify-content-between px-2">
        <!-- LIST ID -->
        <span class="text-muted text-left" :style="{fontSize:fontSize}">{{task.listId}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteTask(task.id)"></i>
        </span>
      </div>
      <div class="card-body py-0 text-wrap">
        <!-- EDIT TASK FORM -->
        <div class="m-2">
          <form class="d-inline" v-if="edit" @submit.prevent="editTask">
            <input type="text" name="title" v-model="task.title" />
            <input type="text" name="description" v-model="task.description" />
            <button type="submit" class="btn btn-outline-primary">Submit</button>
          </form>
        </div>
        <h4 class="card-title">{{task.title}}</h4>
        <div class="pb-2">{{task.description}}</div>

        <!-- TASK ID -->
        <div class="text-primary text-left" :style="{fontSize:fontSize}">{{task.id}}</div>
        <!-- v-show below removed from <comment /> because only the last task was getting the comments -->
        <!-- v-show="task.id == comment.taskId" -->
        <comment v-for="comment in comments" :key="comment.id" :comment="comment" />
      </div>

      <div class="p-2">
        <!-- DROPDOWN -->
        <!-- Small button groups (default and split) -->
        <span class="d-flex justify-content-between">
          <div class="btn-group dropup">
            <button
              class="btn btn-outline-danger btn-sm dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Move Task</button>
            <div class="dropdown-menu">
              <ul>
                <moveTemplate v-for="list in lists" :key="list.id" :list="list" :task="task" />
              </ul>
            </div>
          </div>
          <div v-if="commentForm == false" class="text-right text-success m-2">
            <i class="fas fa-plus action" @click="toggleComment">&nbsp;Add Comment</i>
          </div>
          <div v-else class="text-right text-success">
            <i class="fas fa-minus action" @click="toggleComment">&nbsp;Done Adding Comments</i>
          </div>
        </span>

        <!-- ADD COMMENT FORM -->
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
import moveTemplate from "@/components/MoveTemplateComponent.vue";
export default {
  name: "Task",
  props: ["task"],
  data() {
    return {
      fontSize: "10px",
      edit: false,
      commentForm: false,
      newComment: {
        boardId: this.task.boardId,
        listId: this.task.listId,
        taskId: this.task.id
      },
      listList: {}
    };
  },
  mounted() {
    this.$store.dispatch("getComments", this.task.id);
  },
  computed: {
    comments() {
      return this.$store.state.comments[this.task.id];
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    toggleComment() {
      this.commentForm = !this.commentForm;
    },
    addComment() {
      this.$store.dispatch("addComment", { ...this.newComment });
      this.newComment = {
        boardId: this.task.boardId,
        listId: this.task.listId,
        taskId: this.task.id
      };
    },
    editTask() {
      this.$store.dispatch("editTask", this.task);
      this.edit = false;
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task);
    },
    moveTaskToList() {}
  },
  components: {
    Comment,
    moveTemplate
  }
};
</script>


<style scoped>
</style>