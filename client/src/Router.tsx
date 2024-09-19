import { Route, Routes } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/login';
import Singup from './pages/signup';
import My from './pages/my';

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
        path='/my'
        element={<My />}
      />
    </Routes>
  );
}
