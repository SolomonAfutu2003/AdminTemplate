import './App.css'
import { Routes, Route } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout'
import BlogDashboard from './pages/BlogDashboard'
import BlogPosts from './pages/BlogPosts'
import FormsAndComponents from './pages/FormsAndComponents'
import ProtectedRoute from "./components/ProtectedRoute";
import Errors from './pages/Errors'
import AddNewPost from './pages/AddNewPost'
import Tables from './pages/Tables'
import UserProfile from './pages/UserProfile'
import Login from './auth/pages/LoginPage'


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
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
