import Vue from 'vue'
import Router from 'vue-router'
import Header from '../components/Header'
import Main from '../components/Main'
import Item from '../components/Item'
import Article from '../components/Article'

Vue.use(Router)

export default new Router({
    routes: [{
        name: 'root',
        path: '/',
        components: {
            header: Header,
            main: Main,
        },
    },
    {
        name: 'q',
        path: '/q/:q',
        components: {
            header: Header,
            main: Main,
        }
    },
    {
        name: 'item',
        path: '/item/:id',
        components: {
            header: Header,
            item: Item,
        }
    },
    {
        name: 'article',
        path: '/article/',
        components: {
            header: Header,
            article: Article,
        }
    },
    ]
})