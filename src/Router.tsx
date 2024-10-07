import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AuthLayout from './components/layout/AuthLayout';

const Todo = lazy(() => import('./pages/todo'));
const Login = lazy(() => import('./pages/login'));
const Join = lazy(() => import('./pages/join'));
const My = lazy(() => import('./pages/my'));

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path='/'
          element={<Todo />}
        />
        <Route element={<AuthLayout />}>
          <Route
            path='/login'
            element={<Login />}
          />
          <Route
            path='/join'
            element={<Join />}
          />
        </Route>
        <Route
          path='/my'
          element={<My />}
        />
      </Routes>
    </Suspense>
  );
}
