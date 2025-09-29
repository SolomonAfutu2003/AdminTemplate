import React from 'react'
import Btn from '../components/Btn'
import profile from "../assets/Image1.jpg"
import { UserPlus } from 'lucide-react'

const UserProfile = () => {
  return (
    <div className='space-y-5'>
      <header>
        <h3 className='text-gray-400'>Overview</h3>
        <h2 className='text-3xl text-gray-600'>User Profile</h2>
      </header>
      <main className='flex gap-4'>
        <section className='w-[30%] bg-white rounded-lg shadow-[#00000038] shadow-lg h-full'>
          <div className='border-b border-b-gray-300 py-4 px-2 flex flex-col items-center gap-3'>
            <div className='w-30 h-30 rounded-full overflow-hidden'>
              <img className='w-full h-full object-cover' src={profile} alt="" />
            </div>
            <div className='text-center'>
              <h3 className='text-2xl text-gray-600'>Solomon Afutu</h3>
              <span className='text-gray-400 font-bold'>Project Manager</span>
            </div>
            <Btn text={"Follow"} icon={<UserPlus size={15} />} style={"border border-blue-500 text-blue-500 transition duration-200 delay-100 ease-in-out hover:text-white hover:bg-blue-500 flex items-center gap-2 px-4 py-1 rounded-full"} />
          </div>

          <div className='p-3 space-y-2'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-400 font-bold'>Workload</p>
              <span className='text-gray-400 text-sm'>74%</span>
            </div>
            <div className='w-full bg-gray-300 h-2 rounded-full'>
              <div className='w-[70%] h-2 bg-blue-500 rounded-full'>
              </div>
            </div>
          </div>

          <div className='border-t border-t-gray-300 p-3 space-y-1'>
            <h4 className='text-gray-400 font-bold'>Description</h4>
            <p className='text-gray-600 font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste repellendus distinctio odit doloribus nemo doloremque ducimus autem perferendis. At ad consectetur enim ipsam saepe unde voluptatem laudantium consequatur dolorem distinctio?</p>
          </div>
        </section>

        <section className='w-[70%] bg-white rounded-lg shadow-[#00000038] shadow-lg h-full'>
          <div className='border-b border-b-gray-300 py-4 px-2'>
            <h3 className='text-gray-500 text-base font-bold'>Account Details</h3>
          </div>
          <form action="" className='p-3 space-y-5'>
            <section className='space-y-3'>
              <div className='flex justify-between gap-3 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="" className='text-gray-500 text-base'>First Name</label>
                  <input type="text" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="" className='text-gray-500 text-base'>Last Name</label>
                  <input type="text" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
                </div>
              </div>
              <div className='flex justify-between gap-3 w-full'>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="" className='text-gray-500 text-base'>Email</label>
                  <input type="email" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <label htmlFor="" className='text-gray-500 text-base'>Password</label>
                  <input type="password" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
                </div>
              </div>
            </section>
            <section className='space-y-3'>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-gray-500 text-base'>Address</label>
                <input type="text" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
              </div>
              <div className='flex justify-between gap-3 w-full'>
                <div className='flex flex-col gap-2 w-[50%]'>
                  <label htmlFor="" className='text-gray-500 text-base'>City</label>
                  <input type="text" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' placeholder='Write' />
                </div>
                <div className='flex flex-col gap-2 w-[30%]'>
                  <label htmlFor="" className='text-gray-500 text-base'>State</label>
                  <select name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3'>
                    <option value="">Choose</option>
                    <option value="">...</option>
                  </select>
                </div>
                <div className='flex flex-col gap-2 w-[20%]'>
                  <label htmlFor="" className='text-gray-500 text-base'>Zip</label>
                  <input type="number" name="" id="" className='w-full border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3' />
                </div>
              </div>
            </section>
            <section>
              <div className='flex flex-col gap-2 w-full'>
                <label htmlFor="" className='text-gray-500 text-base'>Description</label>
                <textarea name="" id="" className='h-[150px] border border-gray-200 transition duration-200 delay-100 ease-in-out outline-0 focus:border-blue-600 focus:shadow-lg focus:shadow-blue-100 hover:border-gray-400 rounded-md py-2 px-3'></textarea>
              </div>
            </section>
            <Btn text={"Update Account"} style={"px-3 py-2 bg-blue-500 text-white rounded-lg"} />
          </form>
        </section>
      </main>
    </div>
  )
}

export default UserProfile