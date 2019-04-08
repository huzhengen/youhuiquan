<template>
  <div class="header mb-3">
    <b-container>
      <b-navbar toggleable="sm">
        <b-navbar-brand :to="`/`">52优惠券</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown text="女装">
              <b-dropdown-item :to="`/q/连衣裙`">连衣裙</b-dropdown-item>
              <b-dropdown-item :to="`/q/半身裙`">半身裙</b-dropdown-item>
              <b-dropdown-item :to="`/q/热裤`">热裤</b-dropdown-item>
            </b-nav-item-dropdown>
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
      </b-navbar>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      text: ""
    };
  },
  methods: {
    toQ(event) {
      // if (event) event.preventDefault();
      if (this.text) {
        this.$router.push({ name: "q", params: { q: this.text } });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  border-bottom: 1px solid #ccc;
}
</style>
