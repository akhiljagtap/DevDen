import React, { useEffect, useState } from 'react'
import { Navbar, Spinner } from "flowbite-react"
import { HiArrowSmRight, HiAnnotation, HiChartPie } from "react-icons/hi"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { signoutSuccess } from '../redux/user/userSlice'
import { TbUsers } from "react-icons/tb";
import { BiSolidCommentEdit } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import "../App.css"


function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const [loading, setloading] = useState(false)
  const [tab, settab] = useState("")

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search)
    const tabFromUrl = urlSearch.get("tab")
    if (tabFromUrl) {
      settab(tabFromUrl)
    }
  })
  console.log(tab)

  const handleSignout = async () => {
    try {
      setloading(true)
      const res = await fetch("/api/user/signout", {
        method: "POST"
      })
      if (!res.ok) {
        setloading(false)
        const data = await res.json()
        console.log(data.message);
      } else {
        setloading(false)
        dispatch(signoutSuccess())

      }
    } catch (error) {
      setloading(false)
      console.log(error.message);

    }
  }

  // return (







  // <div className=" h-screen mt-20 ">
  //   //   <Sidebar className='w-full md:w-56 overflow-hidden'>
  //   //     <Sidebar.Items >
  //   //       <Sidebar.ItemGroup >
  //   //         <Link to={"/dashboard?tab=profile"}>
  //   //           <Sidebar.Item active={tab === "profile"} icon={HiUser} className="font-thin  text-white" label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" as="div">
  //   //             Your profile
  //   //           </Sidebar.Item>
  //   //         </Link>
  //   //         <Link to={"/dashboard?tab=dash"}>
  //   //           <Sidebar.Item active={tab === "dash"} icon={HiChartPie} className="font-semibold text-white" labelColor="dark" as="div">
  //   //             Dashboard
  //   //           </Sidebar.Item>
  //   //         </Link>
  //   //         {currentUser.isAdmin && (
  //   //           <Link to={"/dashboard?tab=posts"}>
  //   //             <Sidebar.Item active={tab === "posts"} className="font-thin text-white" icon={HiDocumentText} as="div">
  //   //               Posts
  //   //             </Sidebar.Item>
  //   //           </Link>
  //   //         )}
  //   //         {currentUser.isAdmin && (
  //   //           <Link to={"/dashboard?tab=users"}>
  //   //             <Sidebar.Item active={tab === "users"} className="font-thin text-white" icon={HiOutlineUserGroup} as="div">
  //   //               Users
  //   //             </Sidebar.Item>
  //   //           </Link>
  //   //         )}
  //   //         {currentUser.isAdmin && (
  //   //           <Link to={"/dashboard?tab=comments"}>
  //   //             <Sidebar.Item active={tab === "comments"} className="font-thin text-white" icon={HiAnnotation} as="div">
  //   //               Comments
  //   //             </Sidebar.Item>
  //   //           </Link>
  //   //         )}

  //   //         <Sidebar.Item className="font-thin" icon={HiArrowSmRight} onClick={handleSignout}>
  //   //           {loading ? <div className='flex justify-center items-center min-h-screen'>
  //   //             <Spinner size="xl"></Spinner>
  //   //           </div> : "Signout"}
  //   //         </Sidebar.Item>
  //   //       </Sidebar.ItemGroup>
  //   //     </Sidebar.Items>
  //   //   </Sidebar>
  //   // </div>
  // )
  return (
    <div className="min-h-screen flex mt-14">
      <div className="min-w-56 border border-bg5 max-w-44 bg-black text-white">
        <div className="p-4  ">
          {/* Sidebar content */}
          <ul className="space-y-8  ">
            <li className={` hover:bg-bg5 rounded-lg   p-1 flex items-center
               ${tab === "/" ? 'bg-bg5' : 'bg-black'}`} >
              <Link to={"/"} ClassName="text-blue-500" className='text-white gap-3 font-semibold flex items-center'>
                <AiFillHome size={25} />

                Home
              </Link>
            </li>
            <li className={` hover:bg-bg5 rounded-lg   p-1 flex items-center
               ${tab === "profile" ? 'bg-bg5' : 'bg-black'}`} >
              <Link to={"/dashboard?tab=profile"} ClassName="text-blue-500" className='text-white gap-3 font-semibold flex items-center'>
                <img src={currentUser.avtar} className='w-6 h-6 rounded-full max-w-6 min-w-6' />
                Your account
              </Link>
            </li>
            <li className={` hover:bg-bg5 rounded-lg  p-1 flex items-center ${tab === "dash" ? 'bg-bg5' : 'bg-black'}`}>
              <Link to={"/dashboard?tab=dash"} className='text-white flex items-center gap-3'>
                <HiChartPie size={25} className='max-w-6 min-w-6' />
                Dashboard
              </Link>
            </li>
            {currentUser.isAdmin && (
              <li className={` hover:bg-bg5 rounded-lg  p-1 flex  items-center ${tab === "posts" ? 'bg-bg5' : 'bg-black'}`} >
                <Link to={"/dashboard?tab=posts"} className='text-white flex items-center gap-3'>
                  <HiAnnotation className='max-w-6 min-w-6' size={25} />
                  Posts
                </Link>
              </li>
            )}
            {currentUser.isAdmin && (
              <li className={` hover:bg-bg5 rounded-lg  p-1 flex items-center ${tab === "users" ? 'bg-bg5' : 'bg-black'}`}>
                <Link to={"/dashboard?tab=users"} className='text-white flex  items-center gap-3'>
                  <TbUsers className='max-w-6 min-w-6' size={22} />
                  Users
                </Link>
              </li>
            )}
            {currentUser.isAdmin && (
              <li className={` hover:bg-bg5 rounded-lg  p-1 flex  items-center ${tab === "comments" ? 'bg-bg5' : 'bg-black'}`}>
                <Link to={"/dashboard?tab=comments"} className='text-white flex items-center gap-2'>
                  <BiSolidCommentEdit className='max-w-6 min-w-6' size={25} />
                  Comments
                </Link>
              </li>
            )}
            <li className=' hover:bg-bg5 rounded-lg p-1 flex items-center '>
              <button className="text-red-500 font-semibold flex items-center gap-3" onClick={handleSignout}>
                <HiArrowSmRight size={25} />
                {loading ? (
                  <div className='flex justify-center items-center min-h-screen '>
                    <Spinner size="xl"></Spinner>

                  </div>
                ) : (
                  "Log out"
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

    </div>

  )
}

export default DashSidebar