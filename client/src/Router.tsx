import { Route, Routes } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/login';
import Singup from './pages/signup';
import MyPage from './pages/mypage';

export default function Router() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Todo />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/sign-up'
        element={<Singup />}
      />
      <Route
        path='/mypage'
        element={<MyPage />}
      />
    </Routes>
  );
}
