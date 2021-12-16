
const routes = [
  {
    path: '/',
    redirect: '/buscar-expediente',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/nuevo-expediente', component: () => import('pages/nuevoExpediente.vue'),name:'nuevo-expediente',
        meta: {
          authRequired: 'true',
        }  
      },
      { path: '/buscar-expediente',
        name: 'buscar-expediente',
        component: () => import('pages/BuscarExpediente.vue'),
        meta: {
          authRequired: 'false',
        }
      },
      { path: '/expediente/:id', component: () => import('pages/expediente.vue') },
      { path: '/Usuarios', component: () => import('pages/Usuarios.vue') ,name:'Usuarios',
      meta: {
        authRequired: 'true',
      }}
    ],
    meta: {
      authRequired: 'true',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
    meta: {
      authRequired: 'true',
    },
  }
]


export default routes
