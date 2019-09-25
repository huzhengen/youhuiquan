<template>
    <div id="app">
        <router-view name="header"></router-view>
        <router-view name="main"></router-view>
        <router-view name="item"></router-view>
        <router-view name="article"></router-view>
    </div>
</template>
<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Item from "./components/Item.vue";
import Article from "./components/Article.vue";

export default {
    name: "App",
    components: {
        Header,
        Main,
        Item,
        Article
    }
};
</script>
<style lang="less" rel="stylesheet/less">
body {
    margin: 0;
    padding: 0;
}

#app {
    padding-top: 70px;
}

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