<template>
  <li type="button" @click="move">
    <i class="fas fa-circle fa-sm" :style="{fontSize:fontSize}"></i>
    {{list.title}}
  </li>
</template>

<script>
export default {
  name: "MoveTemplate",
  props: ["list", "task"],
  data() {
    return {
      fontSize: "8px",
      updateObj: {
        taskId: this.task.id,
        listId: this.task.listId,
        newId: this.list.id
      }
    };
  },
  methods: {
    move() {
      this.$store.dispatch("moveList", this.updateObj);
    }
  }
};
</script>