import React, { useEffect, useState } from 'react'
import { Sidebar, Spinner } from "flowbite-react"
import { HiUser, HiArrowSmRight, HiAnnotation, HiChartPie } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { signoutSuccess } from '../redux/user/userSlice'
import { HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi2'



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

  return (
    <div className=" h-screen mt-20 ">
      <Sidebar className='w-full md:w-56 overflow-hidden'>
        <Sidebar.Items >
          <Sidebar.ItemGroup >
            <Link to={"/dashboard?tab=profile"}>
              <Sidebar.Item active={tab === "profile"} icon={HiUser} className="font-thin  text-white" label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" as="div">
                Your profile
              </Sidebar.Item>
            </Link>
            <Link to={"/dashboard?tab=dash"}>
              <Sidebar.Item active={tab === "dash"} icon={HiChartPie} className="font-semibold text-white" labelColor="dark" as="div">
                Dashboard
              </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=posts"}>
                <Sidebar.Item active={tab === "posts"} className="font-thin text-white" icon={HiDocumentText} as="div">
                  Posts
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item active={tab === "users"} className="font-thin text-white" icon={HiOutlineUserGroup} as="div">
                  Users
                </Sidebar.Item>
              </Link>
            )}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=comments"}>
                <Sidebar.Item active={tab === "comments"} className="font-thin text-white" icon={HiAnnotation} as="div">
                  Comments
                </Sidebar.Item>
              </Link>
            )}

            <Sidebar.Item className="font-thin" icon={HiArrowSmRight} onClick={handleSignout}>
              {loading ? <div className='flex justify-center items-center min-h-screen'>
                <Spinner size="xl"></Spinner>
              </div> : "Signout"}
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  )
}

export default DashSidebar