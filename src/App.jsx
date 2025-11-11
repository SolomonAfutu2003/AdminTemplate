import './App.css'
import { Routes, Route } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout'
import BlogDashboard from './pages/Admin/BlogDashboard'
import BlogPosts from './pages/Admin/BlogPosts'
import FormsAndComponents from './pages/Admin/FormsAndComponents'
import ProtectedRoute from "./components/ProtectedRoute";
import Errors from './pages/Admin/Errors'
import Tables from './pages/Admin/Tables'
import UserProfile from './pages/Admin/UserProfile'
import Login from './auth/pages/LoginPage'
import StatsEditor from './editors/StatsEditor'
import ClientLayout from './Layout/ClientLayout'
import Home from './pages/Client/Home'
import VisibilityEditor from './editors/VisibilityEditor'
import PostEditor from './editors/PostEditor'
import ContactUs from './pages/Client/ContactUs'
import Instagram from './pages/Client/Instagram'
import PostPage from './pages/Client/PostPage'
import ProductsPage from './pages/Client/ProductPage'
import NavigationMenu from './pages/Admin/NavigationMenu'
import ProductEditor from './editors/ProductEditor'
import Product from './pages/Admin/Product'





function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/blog_dashboard' element={<BlogDashboard />} />
            <Route path='/blog_posts' element={<BlogPosts />} />
            <Route path='/product' element={<Product />} />
            <Route path='/forms_and_components' element={<FormsAndComponents />} />
            <Route path='/errors' element={<Errors />} />
            <Route path='/tables' element={<Tables />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/post_editor' element={<PostEditor />} />
            <Route path="/blogs/edit/:id" element={<PostEditor />} />
            <Route path="/product/edit/:id" element={<ProductEditor />} />
            <Route path='/stats_editor' element={<StatsEditor />} />
            <Route path='/visibility_editor' element={<VisibilityEditor />} />
            <Route path='/navigation_menu' element={<NavigationMenu />} />
            <Route path='/product_editor' element={<ProductEditor />} />
          </Route>
        </Route>

          <Route element={<ClientLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/contact_us' element={<ContactUs />} />
            <Route path='/instagram_page' element={<Instagram />} />
            <Route path='/post_page/:id' element={<PostPage />} />
            <Route path='/products_page/:id' element={<ProductsPage />} />
          </Route>
       
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
    </>
  )
}

export default App
