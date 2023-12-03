import Layout from './components/Layout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import User from './pages/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
