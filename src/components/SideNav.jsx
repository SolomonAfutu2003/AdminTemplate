import React, { useState } from 'react'
import LinkBtn from './LinkBtn'
import { 
  AlertOctagon, 
  Columns3, 
  FilePlus, 
  Menu, 
  Notebook, 
  Pencil, 
  Table2, 
  User2,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Navigation,
  Eye,
  X
} from 'lucide-react'

const SideNav = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prev => !prev)
  }

  const closeMobileMenu = () => {
    setOpen(false)
  }

  const menuItems = [
    { to: "/blog_dashboard", text: "Blog Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/blog_posts", text: "Blog Posts", icon: <Notebook size={18} /> },
    { to: "/products_page", text: "Products", icon: <ShoppingBag size={18} /> },
    { to: "/services_page", text: "Services", icon: <Settings size={18} /> },
    { to: "/user_profile", text: "User Profile", icon: <User2 size={18} /> },
    { to: "/post_editor", text: "Post Editor", icon: <FilePlus size={18} /> },
    { to: "/service_editor", text: "Service Editor", icon: <Settings size={18} /> },
    { to: "/visibility_editor", text: "Visibility Editor", icon: <Eye size={18} /> },
    { to: "/navigation_menu", text: "Navigation Menu", icon: <Navigation size={18} /> },
    { to: "/product_editor", text: "Product Editor", icon: <ShoppingBag size={18} /> },
  ]

  const MenuContent = () => (
    <>
      <div className='p-5 border-b border-b-gray-400 flex justify-between items-center'>
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button 
          onClick={closeMobileMenu}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <LinkBtn
              to={item.to}
              text={item.text}
              icon={item.icon}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `hover:border-l-4 hover:border-l-blue-600 hover:bg-gray-100 py-3 px-5 text-sm flex flex-row-reverse gap-3 justify-end items-center transition-all duration-200 ${
                  isActive
                    ? "border-l-4 border-l-blue-600 text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            />
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <section className='relative '>
     <section className='sticky top-0 left-0 z-30 h-screen'>
          {/* Desktop Sidebar */}
          <div className='hidden h-full w-64 bg-white lg:block shadow-lg shadow-[#0000003f]'>
            <MenuContent />
          </div>
    
          {/* Mobile Menu Button */}
          <div className='lg:hidden fixed top-4 left-4 z-50'>
            <button 
              onClick={handleToggle}
              className='bg-blue-500 text-white rounded-full w-12 h-12 flex justify-center items-center shadow-lg hover:bg-blue-600 transition-colors'
            >
              <Menu size={24} />
            </button>
          </div>
    
          {/* Mobile Sidebar Overlay */}
          {open && (
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMobileMenu}
            />
          )}
    
          {/* Mobile Sidebar */}
          <div className={`
            lg:hidden fixed top-0 left-0 h-full w-80 bg-white z-40 shadow-2xl transform transition-transform duration-300 ease-in-out
            ${open ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <MenuContent />
          </div>
    
          {/* Mobile Close Area */}
          {open && (
            <div 
              className="lg:hidden fixed inset-0 z-30"
              onClick={closeMobileMenu}
            />
          )}
     </section>
    </section>
  )
}

export default SideNav