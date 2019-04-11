<template>
  <div class="item">
    <b-container v-if="loading" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </b-container>
    <b-container v-else>
      <b-row>
        <b-col cols="12" sm="6" md="4" lg="4" xl="4">
          <img :src="list.pict_url" alt="Image" class="card-img-top">
        </b-col>
        <b-col cols="12" sm="6" md="8" lg="8" xl="8">
          <h1>{{list.title}}</h1>
          <h3>
            <strong>
              <span>￥</span>
              {{list.zk_final_price}}
              <del>￥{{list.reserve_price}}</del>
            </strong>
          </h3>
          <div>
            <a target="_blank" :href="coupon_share_url" class="btn btn-danger btn-lg">领券购买</a>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Item",
  data() {
    return {
      id: 0,
      platform: 0,
      loading: true,
      coupon_share_url: "",
      list: {}
    };
  },
  methods: {
    getItemDetail() {
      let isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        this.platform = 2;
      } else {
        this.platform = 1;
      }
      this.id = this.$route.params.id;
      this.coupon_share_url = localStorage.getItem(this.id);
      this.$http
        .get("/alimama/quanGetItemDetail.php", {
          params: {
            id: this.id,
            platform: this.platform
          }
        })
        .then(res => {
          this.loading = false;
          let result = res.data.results.n_tbk_item[0];
          console.log(result);
          this.list.cat_leaf_name = result.cat_leaf_name;
          this.list.cat_name = result.cat_name;
          this.list.item_url = result.item_url;
          this.list.material_lib_type = result.material_lib_type;
          this.list.nick = result.nick;
          this.list.num_iid = result.num_iid;
          this.list.pict_url = result.pict_url;
          this.list.provcity = result.provcity;
          this.list.reserve_price = result.reserve_price;
          this.list.seller_id = result.seller_id;
          this.list.title = result.title;
          this.list.user_type = result.user_type;
          this.list.volume = result.volume;
          this.list.zk_final_price = result.zk_final_price;
        })
        .catch(function(error) {
          // console.log(error);
        })
        .then(function() {
          // always executed
        });
    }
  },
  created: function() {
    this.getItemDetail();
  },
  mounted() {
    window.onbeforeunload = function(e) {
      localStorage.removeItem(this.id);
    };
  },
  watch: {
    $route(to, from) {
      this.getItemDetail();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
h1 {
  font-size: 1.5rem;
  font-weight: normal;
}
h3 {
  strong {
    color: red;
    del,
    span {
      font-size: 1rem;
      color: #bbb;
      font-weight: normal;
    }
  }
}
</style>
