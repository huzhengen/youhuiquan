<template>
    <div class="main" ref="main">
        <b-container v-if="loading" class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </b-container>
        <b-container v-else>
            <div v-if="index">
                <div>
                    <b-tabs content-class="mt-3" fill>
                        <b-tab title="爆品实时榜Top200" active>
                            <b-row>
                                <b-col class="mb-3" cols="6" sm="6" md="4" lg="3" xl="3" v-for="(item, index) in hotList"
                                       :key="index">
                                    <div class="card">
                                        <b-link :to="{ name: 'item', params: { id: `${item.num_iid}` }}" target="_blank">
                                            <img :src="item.pict_url" :alt="item.title" class="card-img-top"
                                                 @click="coupon($event)" :url="item.coupon_click_url" :id="item.num_iid">
                                        </b-link>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <b-link :to="{ name: 'item', params: { id: `${item.num_iid}` }}"
                                                        target="_blank">
                                                <span @click="coupon($event)" :url="item.coupon_click_url"
                                                      :id="item.num_iid">{{item.title}}</span>
                                                </b-link>
                                            </h4>
                                            <h4>
                                                <strong>
                                                    <span>￥</span>
                                                    {{item.zk_final_price}}
                                                    <del>￥{{item.reserve_price}}</del>
                                                </strong>
                                            </h4>
                                            <b-button variant="danger" size="sm" @click="coupon($event)"
                                                      :to="{ name: 'item', params: { id: `${item.num_iid}` }}"
                                                      target="_blank" :url="item.coupon_click_url" :id="item.num_iid">
                                                {{item.coupon_info | quan}}
                                            </b-button>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <div class="text-center">努力加载中ヾ(◍°∇°◍)ﾉﾞ</div>
                        </b-tab>
                        <b-tab title="品牌清仓Top200">
                            <b-row>
                                <b-col class="mb-3" cols="6" sm="6" md="4" lg="3" xl="3" v-for="(item, index) in qingCangList"
                                       :key="index">
                                    <div class="card">
                                        <b-link :to="{ name: 'item', params: { id: `${item.num_iid}` }}" target="_blank">
                                            <img :src="item.pict_url" :alt="item.title" class="card-img-top"
                                                 @click="coupon($event)" :url="item.coupon_click_url" :id="item.num_iid">
                                        </b-link>
                                        <div class="card-body">
                                            <h4 class="card-title">
                                                <b-link :to="{ name: 'item', params: { id: `${item.num_iid}` }}"
                                                        target="_blank">
                                                <span @click="coupon($event)" :url="item.coupon_click_url"
                                                      :id="item.num_iid">{{item.title}}</span>
                                                </b-link>
                                            </h4>
                                            <h4>
                                                <strong>
                                                    <span>￥</span>
                                                    {{item.zk_final_price}}
                                                    <del>￥{{item.reserve_price}}</del>
                                                </strong>
                                            </h4>
                                            <b-button variant="danger" size="sm" @click="coupon($event)"
                                                      :to="{ name: 'item', params: { id: `${item.num_iid}` }}"
                                                      target="_blank" :url="item.coupon_click_url" :id="item.num_iid">
                                                {{item.coupon_info | quan}}
                                            </b-button>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <div class="text-center">努力加载中ヾ(◍°∇°◍)ﾉﾞ</div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
            <div v-else>
                <b-row>
                    <b-col class="mb-3" cols="6" sm="6" md="4" lg="3" xl="3" v-for="(item, index) in list"
                           :key="index">
                        <div class="card">
                            <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}" target="_blank">
                                <img :src="item.pict_url" :alt="item.title" class="card-img-top"
                                     @click="coupon($event)" :url="item.coupon_share_url" :id="item.item_id">
                            </b-link>
                            <div class="card-body">
                                <h4 class="card-title">
                                    <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}"
                                            target="_blank">
                                                <span @click="coupon($event)" :url="item.coupon_share_url"
                                                      :id="item.item_id">{{item.title}}</span>
                                    </b-link>
                                </h4>
                                <h4>
                                    <strong>
                                        <span>￥</span>
                                        {{item.zk_final_price}}
                                        <del>￥{{item.reserve_price}}</del>
                                    </strong>
                                </h4>
                                <b-button variant="danger" size="sm" @click="coupon($event)"
                                          :to="{ name: 'item', params: { id: `${item.item_id}` }}"
                                          target="_blank" :url="item.coupon_share_url" :id="item.item_id">
                                    {{item.coupon_amount}}元券
                                </b-button>
                            </div>
                        </div>
                    </b-col>
                </b-row>
                <div class="text-center">努力加载中ヾ(◍°∇°◍)ﾉﾞ</div>
            </div>
        </b-container>
    </div>
</template>
<script>
    export default {
        name: "Main",
        data() {
            return {
                list: [],
                hotList: [],
                qingCangList: [],
                hotFavoritesId: null,
                qingCangFavoritesId: null,
                q: "",
                pageNo: 1,
                coupon_share_url: "",
                loading: true,
                isLoading: false,
                platform: 1,
                index: true
            };
        },
        methods: {
            getQ() {
                if (this.$route.params.q) {
                    this.index = false
                    this.q = this.$route.params.q;
                    this.getItem();
                } else {
                    // 首页url没有搜索词
                    // 获取选品库商品
                    this.index = true
                    this.getFavoritesId();
                }
            },
            getFavoritesId() {
                this.$http
                    .get("/alimama/quanGetFavoritesId.php")
                    .then(res => {
                        let favoritesArray = res.data.results.tbk_favorites
                        for(let i=0; i<favoritesArray.length; i++){
                            if(favoritesArray[i].favorites_title === '爆品实时榜'){
                                this.hotFavoritesId = favoritesArray[i].favorites_id
                                this.getHotFavoritesItem();
                            }else if(favoritesArray[i].favorites_title === '品牌清仓'){
                                this.qingCangFavoritesId = favoritesArray[i].favorites_id;
                                this.getQingCangFavoritesItem();
                            }
                        }
                    })
            },
            // 获取爆品实时榜
            getHotFavoritesItem() {
                this.$http
                    .get("/alimama/quanGetFavoritesItem.php", {
                        params: {
                            platform: this.platform,
                            pageSize: 20,
                            unid: '52djwhot',
                            favoritesId: this.hotFavoritesId,
                            pageNo: this.pageNo,
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.loading = false;
                            let result = res.data.results.uatm_tbk_item;
                            result.forEach(v => {
                                this.hotList.push(v);
                            });
                            console.log(this.hotList)
                            this.isLoading = false;
                        }
                    })
                    .catch(() => {
                    });
            },
            // 获取品牌清仓
            getQingCangFavoritesItem() {
                this.$http
                    .get("/alimama/quanGetFavoritesItem.php", {
                        params: {
                            platform: this.platform,
                            pageSize: 20,
                            unid: '52djwhot',
                            favoritesId: this.qingCangFavoritesId,
                            pageNo: this.pageNo,
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.loading = false;
                            let result = res.data.results.uatm_tbk_item;
                            result.forEach(v => {
                                this.qingCangList.push(v);
                            });
                            this.isLoading = false;
                        }
                    })
                    .catch(() => {
                    });
            },
            getItem() {
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
                        this.isLoading = false;
                    })
                    .catch(() => {
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
                            this.pageNo++;
                            if (this.index) {
                                console.log(this.pageNo)
                                this.getHotFavoritesItem();
                            } else {
                                this.getItem();
                            }
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
            this.getQ();
            this.scroll();
        },
        watch: {
            $route() {
                this.list = [];
                this.getQ();
            }
        },
        filters: {
            quan: function (value) {
                if (value) {
                    // return value.split("减")[1] + "券";
                    let quan = value.split("减")[1] ?
                        value.split("减")[1] :
                        value.split("无")[0];
                    return quan + "券";
                }
            }
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
</style>
