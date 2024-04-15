import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from "../components/DashSidebar.jsx"
import DashProfile from "../components/DashProfile.jsx"
import Dashposts from '../components/Dashposts.jsx'
import DashUsers from '../components/DashUsers.jsx'
import Dashcomments from '../components/Dashcomments.jsx'
import DashbordComp from '../components/DashbordComp.jsx'

function Dashboard() {
  const location = useLocation()
  const [tab, settab] = useState("")
  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search)
    const tabFromUrl = urlSearch.get("tab")
    if (tabFromUrl) {
      settab(tabFromUrl)
    }
  })
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56 '>
        <DashSidebar />
      </div>
      {tab === "profile" && < DashProfile />}
      {tab === "posts" && <Dashposts />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <Dashcomments />}
      {tab === "dash" && <DashbordComp />}
    </div>
  )
}

export default Dashboard