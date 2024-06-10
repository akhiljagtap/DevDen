import { Avatar, Button, Dropdown, Navbar, TextInput, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { TbUser } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { AiOutlineSearch } from 'react-icons/ai';
import "../App.css";



function Header() {
  // const { theme } = useSelector(state => state.theme)
  const [isovered, setisovered] = useState(false)
  const [isMouseovered, setisMouseOvered] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  const [searchTerm, setsearchTerm] = useState('')
  const [isExpanded, setisExpanded] = useState(false)
  const path = useLocation().pathname
  const dispatch = useDispatch()
  // const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  // console.log(currentUser)
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, settab] = useState("")

  const isActive = location.pathname === '/'
  const isAboutActive = location.pathname === '/about'

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search)
    const tabFromUrl = urlSearch.get("tab")
    if (tabFromUrl) {
      settab(tabFromUrl)
    }
  })

  const handleSignout = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/user/signout", {
        method: "POST"
      })
      if (!res.ok) {
        setLoading(false)
        const data = await res.json()
        console.log(data.message);
      } else {
        setLoading(false)
        dispatch(signoutSuccess())

      }
    } catch (error) {
      setLoading(false)
      console.log(error.message);

    }
  }
  // console.log(searchTerm);



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl)
    }

  }, [location.search])

  const handleSubmit = (e) => {
    setsearchTerm('')
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)

  }

  const handleMouseEnter = () => {
    setisMouseOvered(true)
  }

  const handleMouseLeave = () => {
    setisMouseOvered(false)
  }

  const handleFocus = () => {
    setisExpanded(true)

  }
  const handleBlur = () => {
    setisExpanded(false)
  }







  if (loading) return (
    <div className='flex justify-center items-center min-h-screen mx-auto'>
      <Spinner size="xl"></Spinner>
    </div>
  )


  return (
    <Navbar className='border-b-1 bg-bg4 text-white fixed top-0 left-0 w-full z-10 '>
      {/* <Link to={"/"} className=' self-center  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded text-white'>DevDen</span>
      </Link> */}

      {/* <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600
       to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300
        dark:focus:ring-purple-800 font-medium rounded-lg text-md px-3 py-2.5 text-center me-2 mb-2">
        <Link to={"/"}>DevDen</Link>
      </button> */}

      <div class="flex items-center">
        {/* <Link to={"/dashboard "}><MdDensitySmall className='' size={20} /></Link> */}
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/code-4059153-3364039@0.png"
          className="w-8 h-8 mr-2 " alt="logo" />
        <h1 class="text-2xl  text-white font-medium tracking-tighter leading-tight" ><Link to={"/"}>DevDen</Link></h1>
      </div>


      <form onSubmit={handleSubmit}>
        <div className="relative w-10 md:w-96 ">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <AiOutlineSearch className="text-white " size={18} />
          </div>
          <input
            type="text"
            className={`bg-bg5 pl-10 p-1 placeholder:text-sm focus:outline-none outline-none
            border-none ${isExpanded ? 'w-full rounded-full' : 'w-48 rounded-full'
              } transition-width duration-300`}
            placeholder="Search article"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>


      </form>








      <div className='flex gap-2 md:order-2 '>

        <Link to={"/dashboard" ? '/' : ''} >
          {currentUser ? (
            <Dropdown arrowIcon={false}

              inline
              className='bg-bg3 shadow-sm shadow-bg2  '
              label={

                <div className='relative' onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <Avatar
                    className={`object-cover flex items-center border-black border-4 rounded-full 
                    `}
                    size="sm"
                    rounded
                    alt='User'
                    img={currentUser.avtar}
                  />
                  {isMouseovered && (
                    <div className=' absolute text-center text-white  text-xs bg-slate-700 px-1 py-0.5 
                    rounded-sm'>
                      {currentUser.username}
                    </div>
                  )}
                </div>

              }





            >
              <Dropdown.Header >
                <span className='flex items-center '>
                  <TbUser className='text-white mr-2' size={20} /> {/* User icon */}
                  <span className='font-semibold tracking-tight text-white'>{currentUser.username}</span>
                </span>
                <span className='flex items-center mt-2'>
                  <MdOutlineEmail className='text-white mr-2' size={20} /> {/* User icon */}
                  <span className='font-medium text-white tracking-tight'>{currentUser.email}</span>
                </span>
                {/* <span className='truncate text-sm font-thin '>{currentUser.email}</span> */}
              </Dropdown.Header>

              <Dropdown.Item className='mt-3 custom-dropdown-item'>
                <Link to={"/dashboard?tab=profile"} className="flex items-center ">
                  <p className='font-semibold flex text-white'>
                    <MdOutlineModeEdit size={20} className="mr-2 text-white" />
                    Edit profile
                  </p>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className='mt-3 custom-dropdown-item'>
                <Link to={"/dashboard" ? '/' && '/dashboard' : ''} className="flex items-center">
                  <RiShareBoxLine className='mr-2 text-white' size={20} /> {/* Icon */}
                  <p className="text-white font-semibold ">View more</p> {/* Text */}
                </Link>
              </Dropdown.Item >

              <Dropdown.Item className='mt-3 custom-dropdown-item flex items-center'>
                <PiSignOutBold className='mr-2 text-white' size={20} />
                <p className='text-white font-semibold' onClick={handleSignout}>Log out</p>
              </Dropdown.Item>


            </Dropdown>
          ) : (


            <>

              <div className="flex justify-center">


                <div className='flex items-center space-x-4'>

                  {/* <button onMouseEnter={() => setisovered(true)}
                    onMouseLeave={() => setisovered(false)} className='bg-white  text-black rounded-lg font-semibold
                    flex items-center tracking-tight p-0.5 hover:bg-gray-200 '><Link to={'/signin'}>signin</Link>

                    <div className='flex items-center mt-0.5 ml-2'>
                      {isovered ? (<TiArrowRight className='w-5 h-5 transition-all' />) : (
                        <MdKeyboardArrowRight className='w-5 h-5 transition-all' />
                      )}
                    </div>
                  </button> */}

                  <button><Link to={'/signin'} className='hover:underline hover:text-blue-300'>sign in</Link></button>


                </div>
              </div>


            </>

          )
          }
          <Navbar.Toggle />
        </Link >
      </div >

      <Navbar.Collapse>

        <Navbar.Link active={isActive} as={"div"}>
          <Link className={`font-semibold  flex p-1  text-white  uppercase tracking-tight
          transition-all ${isActive ? 'text-blue-400' : 'text-white'}
           `} to={"/"}>Posts</Link>
        </Navbar.Link>
        <Navbar.Link active={isAboutActive} as={"div"}>
          <Link className={`font-semibold  flex p-1  text-white tracking-tight uppercase 
          transition-all  ${isAboutActive ? 'text-blue-400' : 'text-gray-500'}
           `} to={"/about"}>Connect us</Link>
        </Navbar.Link>


      </Navbar.Collapse>

    </Navbar >
  )
}












export default Header