import React, { useEffect, useState } from 'react'
import { Sidebar } from "flowbite-react"
import { HiUser, HiArrowSmRight, HiAnnotation, HiChartPie } from "react-icons/hi"
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { signoutSuccess } from '../redux/user/userSlice'
import { HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi2'



function DashSidebar() {
  const { currentUser, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
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
      const res = await fetch("/api/user/signout", {
        method: "POST"
      })
      if (!res.ok) {
        const data = await res.json()
        console.log(data.message);
      } else {
        dispatch(signoutSuccess())

      }
    } catch (error) {
      console.log(error.message);

    }
  }

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items >
        <Sidebar.ItemGroup  >
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item active={tab === "profile"} icon={HiUser} className="font-semibold" label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" as="div">
              Profile</Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=dash"}>
            <Sidebar.Item active={tab === "dash"} icon={HiChartPie} className="font-semibold" labelColor="dark" as="div">
              Dashboard</Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item active={tab === "posts"} className="font-semibold" icon={HiDocumentText} as="div">Post</Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item active={tab === "users"} className="font-semibold" icon={HiOutlineUserGroup} as="div">Users</Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to={"/dashboard?tab=comments"}>
              <Sidebar.Item active={tab === "comments"} className="font-semibold" icon={HiAnnotation} as="div">Comments</Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item className="text-red-600 dark:text-red-600 font-semibold" icon={HiArrowSmRight} onClick={handleSignout} >
            Signout</Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>

    </Sidebar>
  )
}

export default DashSidebar