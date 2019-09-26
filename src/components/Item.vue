<template>
    <div class="item">
        <b-container v-if="loading" class="text-center">
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner"></b-spinner>
        </b-container>
        <b-container v-else>
            <b-row class="itemDetail">
                <b-col cols="12" sm="6" md="4" lg="4" xl="4">
                    <img :src="list.pict_url" alt="Image" class="card-img-top">
                </b-col>
                <b-col cols="12" sm="6" md="8" lg="8" xl="8">
                    <h1 class="mt-2">{{list.title}}</h1>
                    <h6>
                        <span>最近一个月销量：{{list.volume}}</span>/
                        <span>店铺：{{list.nick}}</span>
                    </h6>
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
            <b-row class="recommendList mt-3">
                <b-col class="mb-3" cols="12" sm="6" md="4" lg="3" xl="3" v-for="item in recommendList" :key="item.item_id">
                    <div class="card">
                        <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}" target="_blank">
                            <img :src="item.pict_url" :alt="item.title" class="card-img-top" @click="coupon($event)" :url="item.coupon_share_url" :id="item.item_id">
                        </b-link>
                        <div class="card-body">
                            <h4 class="card-title">
                                <b-link :to="{ name: 'item', params: { id: `${item.item_id}` }}" target="_blank">
                                    <span @click="coupon($event)" :url="item.coupon_share_url" :id="item.item_id">{{item.title}}</span>
                                </b-link>
                            </h4>
                            <h4>
                                <strong>
                                    <span>￥</span>
                                    {{item.zk_final_price}}
                                    <del>￥{{item.reserve_price}}</del>
                                </strong>
                            </h4>
                            <b-button variant="danger" size="sm" @click="coupon($event)" :to="{ name: 'item', params: { id: `${item.item_id}` }}" target="_blank" :url="item.coupon_share_url" :id="item.item_id">{{item.coupon_amount}}元券</b-button>
                        </div>
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
            list: {},
            recommendList: []
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
                    this.list = {
                        cat_leaf_name: result.cat_leaf_name,
                        cat_name: result.cat_name,
                        item_url: result.item_url,
                        material_lib_type: result.material_lib_type,
                        nick: result.nick,
                        num_iid: result.num_iid,
                        pict_url: result.pict_url,
                        provcity: result.provcity,
                        reserve_price: result.reserve_price,
                        seller_id: result.seller_id,
                        title: result.title,
                        user_type: result.user_type,
                        volume: result.volume,
                        zk_final_price: result.zk_final_price,
                    }
                    // this.list.cat_leaf_name = result.cat_leaf_name;
                    // this.list.cat_name = result.cat_name;
                    // this.list.item_url = result.item_url;
                    // this.list.material_lib_type = result.material_lib_type;
                    // this.list.nick = result.nick;
                    // this.list.num_iid = result.num_iid;
                    // this.list.pict_url = result.pict_url;
                    // this.list.provcity = result.provcity;
                    // this.list.reserve_price = result.reserve_price;
                    // this.list.seller_id = result.seller_id;
                    // this.list.title = result.title;
                    // this.list.user_type = result.user_type;
                    // this.list.volume = result.volume;
                    // this.list.zk_final_price = result.zk_final_price;
                    this.getItem(this.list.cat_leaf_name, this.platform);
                })
                .catch(function() {})
                .then(function() {});
        },
        getItem(q, platform) {
            let randomPageNo = Math.ceil(Math.random() * 20);
            this.$http
                .get("/alimama/quanGetDgMaterialOptional.php", {
                    params: {
                        query: q,
                        pageNo: randomPageNo,
                        platform: platform
                    }
                })
                .then(res => {
                    let result = res.data.result_list.map_data;
                    this.recommendList = result;
                })
                .catch(() => {});
        },
        coupon(event) {
            localStorage.setItem(
                event.target.attributes.id.nodeValue,
                event.target.attributes.url.nodeValue
            );
        }
    },
    created: function() {
        this.getItemDetail();
    },
    mounted() {
        window.onbeforeunload = function() {
            localStorage.removeItem(this.id);
        };
    },
    watch: {
        $route() {
            this.getItemDetail();
        }
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
.itemDetail {
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

    h6 {
        font-size: 0.8rem;
    }
}
</style>