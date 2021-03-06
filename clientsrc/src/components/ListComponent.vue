<template>
  <div class="list col-xs-4">
    <!-- This is the component that will draw each of the list item.
    Embedded in here will the a position for tasks.-->
    <div
      class="card shadow m-2 border-danger"
      style="background-color:#ddd; maxWidth:45em;"
    >
      <div class="d-flex justify-content-between px-2">
        <!-- BOARD ID -->
        <span
          class="text-secondary text-left"
          :style="{ fontSize: fontSize }"
          >{{ list.boardId }}</span
        >
        <span>
          <i class="fas fa-pencil-alt action" @click="toggleEdit"></i>&nbsp;
          <i
            class="far fa-trash-alt text-danger action"
            @click="deleteList()"
          ></i>
        </span>
      </div>
      <div class="card-body py-0 text-wrap">
        <!-- EDIT LIST FORM -->
        <div class="m-2">
          <form class="d-inline" v-if="edit" @submit.prevent="editList">
            <input type="text" name="title" v-model="list.title" />
            <input type="text" name="description" v-model="list.description" />
            <button type="submit" class="btn btn-outline-danger">Submit</button>
          </form>
        </div>
        <h4 class="card-title">{{ list.title }}</h4>
        <div class="pb-2">{{ list.description }}</div>
        <!-- LIST ID -->
        <div class="text-danger text-left" :style="{ fontSize: fontSize }">
          {{ list.id }}
        </div>
        <!-- removed v-show after refactoring server: v-show="list.id == task.listId"  -->
        <task v-for="task in tasks" :key="task.id" :task="task" />
      </div>
      <!-- ADD TASK FORM -->
      <div class="p-2">
        <div v-if="taskForm == false" class="text-right text-primary m-2">
          <i class="fas fa-plus action" @click="toggleTask">&nbsp;Add Task</i>
        </div>
        <div v-else class="text-right text-primary">
          <i class="fas fa-minus action" @click="toggleTask"
            >&nbsp;Done Adding Tasks</i
          >
        </div>
        <form class="d-inline" v-if="taskForm" @submit.prevent="addTask">
          <input
            type="text"
            name="title"
            v-model="newTask.title"
            placeholder="Task Title..."
          />
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
import swal from "sweetalert";
export default {
  name: "list",
  props: ["list"],
  data() {
    return {
      fontSize: "10px",
      edit: false,
      taskForm: false,
      newTask: {
        boardId: this.list.boardId,
        listId: this.list.id,
      },
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.list.id);
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.list.id];
    },
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    editList() {
      this.$store.dispatch("editList", this.list);
      this.edit = false;
    },
    deleteList() {
      swal({
        title: "Are you sure?",
        text:
          "Delete may orphan children. Click 'Ok' to confirm you wish to delete List",
        icon: "error",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$store.dispatch("deleteList", this.list);
          swal("Poof! Your list has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Delete cancelled");
        }
      });
    },
    toggleTask() {
      this.taskForm = !this.taskForm;
    },
    addTask() {
      this.$store.dispatch("addTask", { ...this.newTask });
      this.newTask = {
        boardId: this.list.boardId,
        listId: this.list.id,
      };
    },
  },
  components: {
    Task,
  },
};
</script>

<style scoped></style>
