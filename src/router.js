import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}
Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: importComponent('DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: '/',
                    name: 'Dashboard',
                    meta: {title : 'Dashboard'},
                    component: importComponent('Dashboard'),
                },
                {
                    path: '/user',
                    name: 'User',
                    meta: {title : 'Users'},
                    component: importComponent('DataHotel/User'),
                },
                {
                    path: '/kamar',
                    name: 'Kamar',
                    meta: {title : 'Kamars'},
                    component: importComponent('DataHotel/Kamar'),
                },
                {
                    path: '/tamu',
                    name: 'Tamu',
                    meta: {title : 'Tamus'},
                    component: importComponent('DataHotel/Tamu'),
                },
                {
                    path: '/karyawan',
                    name: 'Karyawan',
                    meta: {title : 'Karyawans'},
                    component: importComponent('DataHotel/Karyawan'),
                },
                {
                    path: '/profile',
                    name: 'Profile',
                    meta: {title : 'Profiles'},
                    component: importComponent('DataHotel/Profile'),
                },
            ],
        },

        //register
        {
            path: '/register',
            name: 'Register',
            meta: { title: 'Register' },
            component: importComponent('Register'),
        },
        //login
        {
            path: '/login',
            name: 'Login',
            meta: { title: 'Login' },
            component: importComponent('Login'),
        },
        //index
        {
            path: '/home',
            name: 'Home',
            meta: { title: 'Home' },
            component: importComponent('Home'),
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.name != "Login" && localStorage.getItem("token") == null && to.name!="Register" && to.name != "Home"){
        next('home')
        document.to.meta.title = "Home"
    }
    
    document.title = to.meta.title;
    next();
});

export default router;
