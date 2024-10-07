import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Todo = lazy(() => import('./pages/todo'));
const Login = lazy(() => import('./pages/login'));
const Join = lazy(() => import('./pages/join'));
const My = lazy(() => import('./pages/my'));

export default function Router() {
  return (
    <Routes>
      <Suspense fallback={<div>Loading...</div>}>
        <Route
          path='/'
          element={<Todo />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/join'
          element={<Join />}
        />
        <Route
          path='/my'
          element={<My />}
        />
      </Suspense>
    </Routes>
  );
}
