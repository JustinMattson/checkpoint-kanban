<template>
  <div id="app" class="bg-cstm">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style>
#app {
  flex-grow: 1;
  min-height: 100vh;
}
.horizontal-scrollable > .row {
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  position: absolute;
}
.horizontal-scrollable > .row > .col-xs-4 {
  background-color: #ffffffff;
  display: inline-block;
  float: none;
}
.action {
  cursor: pointer;
}
.bg-cstm {
  background: url("https://iso.500px.com/wp-content/uploads/2016/05/stock-photo-154486323-1-1500x652.jpg")
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
}
.text-shadow {
  text-shadow: 1px 1px 5px black;
}
</style>
