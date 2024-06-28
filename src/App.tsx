import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import AddPost from './pages/AddPost';
import About from './pages/About';
import Contacts from './pages/Contacts';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/new-post">Add</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<AddPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
