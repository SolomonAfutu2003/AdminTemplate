import './App.css'
import { Routes, Route } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout'
import BlogDashboard from './pages/Admin/BlogDashboard'
import BlogPosts from './pages/Admin/BlogPosts'
import FormsAndComponents from './pages/Admin/FormsAndComponents'
import ProtectedRoute from "./components/ProtectedRoute";
import Errors from './pages/Admin/Errors'
import AddNewPost from './pages/Admin/AddNewPost'
import Tables from './pages/Admin/Tables'
import UserProfile from './pages/Admin/UserProfile'
import Login from './auth/pages/LoginPage'
import HeaderEditor from './editors/HeaderEditor'
import NavEditor from './editors/NavEditor'
import StatsEditor from './editors/StatsEditor'
import ClientLayout from './Layout/ClientLayout'
import Home from './pages/Client/Home'
import VisibilityEditor from './editors/VisibilityEditor'



function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/' element={<BlogDashboard />} />
            <Route path='/blog_posts' element={<BlogPosts />} />
            <Route path='/forms_and_components' element={<FormsAndComponents />} />
            <Route path='/errors' element={<Errors />} />
            <Route path='/add_new_post' element={<AddNewPost />} />
            <Route path='/tables' element={<Tables />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/header_editor' element={<HeaderEditor />} />
            <Route path='/nav_editor' element={<NavEditor />} />
            <Route path='/stats_editor' element={<StatsEditor />} />
            <Route path='/visibility_editor' element={<VisibilityEditor />} />
          </Route>
          <Route element={<ClientLayout />}>
            <Route path='/home' element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
