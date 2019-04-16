<template>
  <div class="header">
    <b-navbar toggleable="sm" fixed="top">
      <b-container>
        <b-navbar-brand :to="`/`">52优惠券</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="`/q/${cat}`" v-for="cat in cats" :key="cat.id">{{cat}}</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form v-on:submit.prevent>
              <b-form-input
                v-model="text"
                class="mr-sm-2"
                placeholder="搜索"
                @keyup.enter="toQ($event)"
              ></b-form-input>
              <b-button class="my-2 my-sm-0" @click="toQ($event)">搜索</b-button>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      text: "",
      cats: []
    };
  },
  created() {
    this.getCats();
  },
  watch: {
    $route(to, from) {
      this.getCats();
    }
  },
  methods: {
    toQ(event) {
      if (this.text) {
        this.$router.push({ name: "q", params: { q: this.text } });
      }
    },
    getCats() {
      this.$http
        .get("/alimama/cats.json")
        .then(res => {
          let catsArr = res.data.cats
            .sort(function() {
              return 0.5 - Math.random();
            })
            .slice(0, 4);
          this.cats = catsArr;
          console.log(this.cats);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  border-bottom: 1px solid #ccc;
  background-color: #fff;
}
</style>
