﻿export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                  {
                    name: '行政部',
                    path: '/dashboard/admin',

                    routes: [
                      {
                        name: '分公司行政部',
                        path: '/dashboard/admin/admin',
                        component: './Dashboard/Admin/admin',
                      },
                    ],
                  },
                ],
              },
              {
                path: '/workplace',
                name: 'workplace',
                icon: 'tool',
                routes: [
                  { path: '/', redirect: '/workplace/index' },
                  {
                    path: '/workplace/index',
                    name: 'work',
                    icon: 'table',
                    component: './Workplace',
                  },
                  {
                    path: '/workplace/sula',
                    name: 'SulaTable',
                    icon: 'table',
                    component: './Workplace/SulaTableList',
                  },
                  {
                    path: '/workplace/pro',
                    name: 'ProTable',
                    icon: 'table',
                    component: './Workplace/ProTableList',
                  },
                  {
                    path: '/workplace/model',
                    name: 'ModelTable',
                    icon: 'table',
                    component: './Workplace/ModelTableList',
                  },
                ],
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/test',
                name: 'test',
                icon: 'table',
                component: './test',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
