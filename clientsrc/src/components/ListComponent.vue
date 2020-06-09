<template>
  <div class="list col-xs-4">
    <!-- This is the component that will draw each of the list item.
    Embedded in here will the a position for tasks.-->
    <div class="card shadow m-2 border-danger" style="background-color:#ddd">
      <div class="d-flex justify-content-between px-2">
        <span>LIST ID: {{list.id}}</span>&nbsp;
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i class="far fa-trash-alt text-danger action" @click="deleteList(list.id)"></i>
        </span>
      </div>
      <div class="card-body">
        <h4 class="card-title">{{list.title}}</h4>
        <div>{{list.description}}</div>
        <div>LIST'S BOARD ID: {{list.boardId}}</div>
        <form class="d-inline" v-if="edit" @submit.prevent="editList">
          <input type="text" name="title" v-model="list.title" />
          <input type="text" name="description" v-model="list.description" />
          <button type="submit" class="btn btn-outline-danger">Submit</button>
        </form>
        <task v-for="task in tasks" :key="task.id" :task="task" v-show="list.id == task.listId" />
      </div>
      <div class="m-3">
        <div v-if="taskForm == false" class="text-right">
          <i class="fas fa-plus action" @click="toggleTask">&nbsp;Add Task</i>
        </div>
        <div v-else class="text-right">
          <i class="fas fa-minus action" @click="toggleTask">&nbsp;Done Adding Tasks</i>
        </div>
        <form class="d-inline" v-if="taskForm" @submit.prevent="addTask">
          <input type="text" name="title" v-model="newTask.title" placeholder="Task Title..." />
          <input
            type="text"
            name="description"
            v-model="newTask.description"
            placeholder="Task Description..."
          />
          <button type="submit" class="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Task from "@/components/TaskComponent.vue";
export default {
  name: "list",
  props: ["list"],
  data() {
    return {
      edit: false,
      taskForm: false,
      newTask: {
        listId: this.list.id
      }
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.list.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    editList() {
      this.$store.dispatch("editList", this.list);
      this.edit = false;
    },
    deleteList(id) {
      this.$store.dispatch("deleteList", id);
    },
    toggleTask() {
      this.taskForm = !this.taskForm;
    },
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask = { listId: this.list.id };
    }
  },
  components: {
    Task
  }
};
</script>


<style scoped>
</style>