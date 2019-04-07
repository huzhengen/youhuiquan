<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col
          class="mb-3"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          v-for="item in list"
          :key="item.item_id"
        >
          <b-card
            :img-src="item.pict_url"
            :img-alt="item.title"
            :item-id="item.item_id"
            :title="item.title"
            ref="card"
            img-top
            @click="toDetail"
          >
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Main",
  data() {
    return {
      list: [],
      q: ""
    };
  },
  methods: {
    getItem() {
      console.log(this.$route.params.q);
      if (this.$route.params.q) {
        this.q = this.$route.params.q;
      } else {
        this.q = "9块9";
      }
      this.$http
        .get("https://52djw.com/alimama/getDgMaterialOptional.php", {
          params: {
            query: this.q,
            pageNo: 1
          }
        })
        .then(res => {
          console.log(res);
          let result = res.data.result_list.map_data;
          // let result = JSON.parse(response.data).result_list.map_data
          this.list = result;
          console.log(this.list);
        })
        .catch(function(error) {
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
    toDetail() {
      console.log(this.$refs.card.item.id);
      let item_id = this.$refs.card.item.id;
      this.$router.pushpush({ name: "item", params: { id: item_id } });
    }
  },
  created: function() {
    this.getItem();
  },
  watch: {
    $route(to, from) {
      this.getItem();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  font-size: 0.8rem;
}
</style>
