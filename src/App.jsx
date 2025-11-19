import './App.css'
import { Routes, Route } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout'
import BlogDashboard from './pages/Admin/BlogDashboard'
import BlogPosts from './pages/Admin/BlogPosts'
import ProtectedRoute from "./components/ProtectedRoute";
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
import ServiceEditor from './editors/ServiceEditor'
import Service from './pages/Admin/Service'
import About from './pages/Client/About'
import OurProducts from './pages/Client/OurProducts'
import ServicePage from './pages/Client/ServicePage'
import Blog from './pages/Client/Blog'


function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path='/blog_dashboard' element={<BlogDashboard />} />
            <Route path='/blog_posts' element={<BlogPosts />} />
            <Route path='/products_page' element={<Product />} />
            <Route path='/services_page' element={<Service />} />
            <Route path='/user_profile' element={<UserProfile />} />
            <Route path='/post_editor' element={<PostEditor />} />
            <Route path="/blogs/edit/:id" element={<PostEditor />} />
            <Route path="/product/edit/:id" element={<ProductEditor />} />
            <Route path="/service/edit/:id" element={<ServiceEditor />} />
            <Route path='/stats_editor' element={<StatsEditor />} />
            <Route path='/visibility_editor' element={<VisibilityEditor />} />
            <Route path='/navigation_menu' element={<NavigationMenu />} />
            <Route path='/product_editor' element={<ProductEditor />} />
            <Route path='/service_editor' element={<ServiceEditor />} />
          </Route>
        </Route>

        <Route element={<ClientLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<ServicePage />} />
          <Route path='/products' element={<OurProducts />} />
          <Route path='/blog' element={<Blog />} />
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
