<template>
  <div class="main">
    <b-container v-if="loading" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </b-container>
    <b-container v-else>
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
          <div
            class="card"
            @click="coupon"
            ref="coupon"
            :url="item.coupon_share_url"
            :id="item.item_id"
          >
            <b-link
              :to="{ name: 'item', params: { id: `${item.item_id}` }, query: { coupon: `${item.coupon_share_url}` }}"
            >
              <img :src="item.pict_url" :alt="item.title" class="card-img-top">
            </b-link>
            <div class="card-body">
              <h4 class="card-title">
                <b-link
                  :to="{ name: 'item', params: { id: `${item.item_id}` }, query: { coupon: `${item.coupon_share_url}` }}"
                >{{item.title}}</b-link>
              </h4>
              <b-button variant="danger">{{item.coupon_info}}</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      list: [],
      q: "",
      coupon_share_url: "",
      loading: true
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
        .get("https://52djw.com/alimama/quanGetDgMaterialOptional.php", {
          params: {
            query: this.q,
            pageNo: 1
          }
        })
        .then(res => {
          console.log(res);
          this.loading = false;
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
    coupon() {
      // console.log(this.$refs);
      // this.$refs.coupon.forEach(i => {
      //   console.log(i);
      // });
      // console.log(this.$refs.coupon.attributes.url.nodeValue);
      // this.coupon_share_url = this.$refs.coupon.attributes.url.nodeValue;
      // console.log("click");
      // this.$bus.$emit("coupon", this.coupon_share_url);
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
<style scoped lang="less" rel="stylesheet/less">
.card {
  h3,
  h4 {
    font-size: 0.8rem;
    a {
      color: #000;
    }
  }
}
</style>
