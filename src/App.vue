<template>
    <div id="app">
        <router-view name="header"></router-view>
        <router-view name="main"></router-view>
        <router-view name="item"></router-view>
        <router-view name="article"></router-view>
        <router-view name="timelimit"></router-view>
    </div>
</template>
<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Item from "./components/Item.vue";
import Article from "./components/Article.vue";
import TimeLimit from "./components/TimeLimit.vue";

export default {
    name: "App",
    components: {
        Header,
        Main,
        Item,
        Article,
        TimeLimit
    }
};
</script>
<style lang="less" rel="stylesheet/less">
body {
    margin: 0;
    padding: 0;
    color: #666;
}

#app {
    padding-top: 70px;
}

@media screen and (max-width: 992px) {
    #app {
        padding-top: 105px;
    }
}

@media screen and (min-width: 576px) and (max-width: 968px) {
    #app {
        padding-top: 144px;
    }
}

@media screen and (max-width: 575px) {
    #app {
        padding-top: 70px;
    }
}

.card {

    h3,
    h4 {
        font-size: 0.9rem;
        color: #666;

        a {
            color: #666;
        }

        strong {
            font-size: 1.3rem;
            color: #dc3545;

            span {
                font-size: 0.8rem;
                color: #666;
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
