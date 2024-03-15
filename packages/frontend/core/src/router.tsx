import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    lazy: () => import('./pages/index'),
  },
  {
    path: '/auth/:authType',
    lazy: () => import('./pages/auth'),
  },
  {
    path: '/sign-in',
    lazy: () => import('./pages/sign-in'),
  },
] satisfies [...RouteObject[]];

export const router = createBrowserRouter(routes);
