<template>
  <div class="main" ref="main">
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
          <div class="card">
            <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}">
              <img
                :src="item.pict_url"
                :alt="item.title"
                class="card-img-top"
                @click="coupon($event)"
                :url="item.coupon_share_url"
                :id="item.item_id"
              >
            </b-link>
            <div class="card-body">
              <h4 class="card-title">
                <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}">
                  <span
                    @click="coupon($event)"
                    :url="item.coupon_share_url"
                    :id="item.item_id"
                  >{{item.title}}</span>
                </b-link>
              </h4>
              <h4>
                <strong>
                  <span>￥</span>
                  {{item.zk_final_price}}
                  <del>￥{{item.reserve_price}}</del>
                </strong>
              </h4>
              <b-button variant="danger" size="sm">{{item.coupon_info | quan}}</b-button>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="text-center">努力加载中ヾ(◍°∇°◍)ﾉﾞ</div>
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
      pageNo: 1,
      coupon_share_url: "",
      loading: true,
      isLoading: false,
      platform: 1
    };
  },
  methods: {
    getItem() {
      if (this.$route.params.q) {
        this.q = this.$route.params.q;
      } else {
        this.q = "9块9";
      }
      this.$http
        .get("/alimama/quanGetDgMaterialOptional.php", {
          params: {
            query: this.q,
            pageNo: this.pageNo,
            platform: this.platform
          }
        })
        .then(res => {
          this.loading = false;
          let result = res.data.result_list.map_data;
          result.forEach(v => {
            this.list.push(v);
          });
          console.log(this.list);
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
    coupon(event) {
      localStorage.setItem(
        event.target.attributes.id.nodeValue,
        event.target.attributes.url.nodeValue
      );
    },
    scroll(x) {
      if (this.platform === 1) {
        x = "scroll";
      } else {
        x = "touchend";
      }
      window.addEventListener(
        x,
        e => {
          let scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          let bottomOfWindow =
            document.documentElement.offsetHeight -
              scrollTop -
              window.innerHeight <=
            200;
          console.log(bottomOfWindow, this.isLoading);
          if (bottomOfWindow && this.isLoading === false) {
            this.isLoading = true;
            console.log(222);
            this.pageNo++;
            this.getItem();
          }
        },
        true
      );
    },
    isPhone() {
      let isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(
        navigator.userAgent
      );
      if (isMobile) {
        this.platform = 2;
      } else {
        this.platform = 1;
      }
    }
  },
  created() {
    this.isPhone();
    this.getItem();
    this.scroll();
  },
  beforeDestroy() {
    // this.$bus.$emit("csu", this.coupon_share_url);
  },
  watch: {
    $route(to, from) {
      this.list = [];
      this.getItem();
    }
  },
  filters: {
    quan: function(value) {
      if (value) {
        // return value.split("减")[1] + "券";
        let quan = value.split("减")[1]
          ? value.split("减")[1]
          : value.split("无")[0];
        return quan + "券";
      }
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
    strong {
      font-size: 1.3rem;
      color: #dc3545;
      span {
        font-size: 0.8rem;
        color: #000;
      }
      del {
        font-size: 0.8rem;
        color: #bbb;
        font-weight: normal;
      }
    }
  }
}
</style>
