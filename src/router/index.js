import { createRouter, createWebHashHistory } from "vue-router"
import homePage from "../views/home-page"
import aboutPage from "../views/about-page"
import boardPreview from "../components/board-preview"
const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: homePage,
        },
        {
            path: "/about",
            name: "about",
            component: aboutPage,
        },
        {
            path: "/board/:id",
            name: "board-preview",
            component: boardPreview,
        },
        // {
        //   path: '/toy/:id',
        //   name: 'toy-details',
        //   component:toyDetails,
        // },
        // {
        //   path: '/toy/edit/:id?',
        //   name: 'toy-edit',
        //   component: toyEdit,
        // },
    ],
})

export default router
