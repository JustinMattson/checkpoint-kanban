<template>
  <div class="home container-fluid">
    <div class="row d-flex p-5">
      <div class="col text-light">
        <h1>Welcome to KanBan Boards!</h1>
        <div>&nbsp;</div>
        <h2>This is a description of our Boards app visible without authentication. On this site you can manage projects.</h2>
        <h3>Log in to get started!</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
.row {
  background-image: url("https://iso.500px.com/wp-content/uploads/2016/05/stock-photo-154486323-1-1500x652.jpg");
  background-repeat: no-repeat;
  text-shadow: 1px 1px 5px black;
  min-height: 100vh;
  /* display: flex; */
  /* flex-direction: column; */
  /* flex-grow: 1; */
}
</style>