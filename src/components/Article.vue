<template>
  <div class="main" ref="main">
    <b-container v-if="loading" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
    </b-container>
    <b-container v-else>
      <h2 class="text-center" style="width:100%;">推荐文章</h2>
      <b-row>
        <b-col
          class="mb-3"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="3"
          v-for="item in list"
          :key="item.content_id"
        >
          <div class="card">
            <b-link :href="item.clink" :title="item.title" target="_blank">
              <img
                :src="item.images.string[0]"
                :alt="item.title"
                :title="item.title"
                class="card-img-top"
                :id="item.content_id"
              />
            </b-link>
            <div class="card-body">
              <h4 class="card-title">
                <b-link :href="item.clink" :title="item.title" target="_blank">
                  <span :id="item.content_id">{{item.title}}</span>
                </b-link>
              </h4>
              <h4>作者：{{item.author_nick}}</h4>
              <h4>发布时间：{{item.update_time | time}}</h4>
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
      loading: true,
      isLoading: false,
      platform: 1,
      timestamp: new Date().getTime(),
      cid: Math.ceil(Math.random()*10)
    };
  },
  methods: {
    getContent() {
      this.$http
        .get("/alimama/quanGetTbkContent.php", {
          params: {
            beforeTimestamp: this.timestamp,
            type: 1, // 图文
            cid: this.cid
          }
        })
        .then(res => {
          this.loading = false;
          console.log(res);
          let result = res.data.result.data.contents.map_data;
          result.forEach(v => {
            this.list.push(v);
          });
          this.timestamp = res.data.result.data.last_timestamp;
          this.isLoading = false;
        })
        .catch(() => {});
    },
    scroll(x) {
      if (this.platform === 1) {
        x = "scroll";
      } else {
        x = "touchend";
      }
      window.addEventListener(
        x,
        () => {
          let scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          let bottomOfWindow =
            document.documentElement.offsetHeight -
              scrollTop -
              window.innerHeight <=
            200;
          if (bottomOfWindow && this.isLoading === false) {
            this.isLoading = true;
            this.getContent();
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
    this.getContent();
    this.scroll();
  },
  watch: {
    $route() {
      this.list = [];
      this.getContent();
    }
  },
  filters: {
    time: function(value) {
      if (value) {
        return new Date(Number(value)).toLocaleDateString();
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
</style>