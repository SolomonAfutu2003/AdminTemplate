import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'


const ClientLayout = () => {
  // const [visibility, setVisibility] = useState({});

  // useEffect(() => {
  //   const saved = localStorage.getItem("cmsVisibility");
  //   if (saved) {
  //     setVisibility(JSON.parse(saved));
  //   }
  // }, []);

  return (
    <div >
      <Navbar />
      <Outlet />
    </div>
  )
}

export default ClientLayout