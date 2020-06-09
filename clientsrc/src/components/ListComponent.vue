<template>
  <div class="list col-xs-4">
    <!-- This is the component that will draw each of the list item.
    Embedded in here will the a position for tasks.-->
    <div class="card">
      <img class="card-img-top" src="holder.js/100x180/" alt />
      <div class="card-body">
        <h4 class="card-title">{{list.title}}</h4>
        <div>{{list.description}}</div>
        <div>{{list.boardId}}</div>
        <div>Insert tasks here</div>
        <p class="card-text">Text</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "list",
  props: ["list"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>