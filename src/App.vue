<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="main"></router-view>
    <router-view name="item"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Item from "./components/Item.vue";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Item
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  padding-top: 70px;
}
</style>
