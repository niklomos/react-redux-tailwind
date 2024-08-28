import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserEdit from "./components/userEdit";
import UserInsert from "./components/userInsert";
import UserList from "./components/UserList";
import Layout from "./layout/layout";



const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/users" element={<UserList />} />
        <Route path="/insert" element={<UserInsert />} />
        <Route path="/edit/:id" element={<UserEdit />} />
      </Route>
    </Routes>
  </Router>
  )
};

export default App;

