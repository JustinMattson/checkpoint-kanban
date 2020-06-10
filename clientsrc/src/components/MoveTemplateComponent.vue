<template>
  <li type="button" @click="move">{{list.title}}</li>
</template>

<script>
export default {
  name: "MoveTemplate",
  props: ["list", "task"],
  data() {
    return {
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