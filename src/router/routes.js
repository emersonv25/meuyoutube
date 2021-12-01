export default [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login'),
        meta: {
          guest: true
        }
      },
      {
        path: '/register',
        name: 'Registro',
        component: () => import('../views/auth/Register'),
        meta: {
          guest: true
        }
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '*',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/perfil',
        name: 'Perfil',
        component: () => import('../views/auth/Perfil'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/Upload'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/play/:id',
        name: 'Play',
        component: () => import('../views/Play'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/My',
        name: 'MeusVideos',
        component: () => import('../views/MeusVideos'),
        meta: {
          requiresAuth: true
        }
      },
]