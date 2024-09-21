import { Route, Routes } from 'react-router-dom';
import Todo from './pages/todo';
import Login from './pages/login';
import Join from './pages/join';
import My from './pages/my';
import RedirectRoute from './components/RedirectRoute';

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
      <Route element={<RedirectRoute />}>
        <Route
          path='/join'
          element={<Join />}
        />
        <Route
          path='/my'
          element={<My />}
        />
      </Route>
    </Routes>
  );
}
