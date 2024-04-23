import { Avatar, Button, Dropdown, Navbar, TextInput, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { toogleTheme } from '../redux/theme/themeSlice';


function Header() {
  const { theme } = useSelector(state => state.theme)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setsearchTerm] = useState('')
  const path = useLocation().pathname
  const dispatch = useDispatch()
  // const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)
  const location = useLocation()
  const navigate = useNavigate()
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

  if (loading) return (
    <div className='flex justify-center items-center min-h-screen mx-auto'>
      <Spinner size="xl"></Spinner>
    </div>
  )


  return (
    <Navbar className='border-b-2 '>
      <Link to={"/"} className=' self-center  whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        rounded text-white'>Akhil's</span>
        Blog
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput type='text'
          placeholder='search...'
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
          className='hidden lg:inline'></TextInput>

      </form>

      <Button className='w-12 h-12 lg:hidden' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-12 hidden sm:inline' color="gray" pill onClick={() => dispatch(toogleTheme())}>
          {/* <FaMoon /> */}
          {theme === "dark" ? <FaMoon /> : <FaSun />}
        </Button >
        <Link to={"/dashboard"} >
          {currentUser ? (
            <Dropdown arrowIcon={false}
              inline
              label={
                <Avatar className='object-cover'
                  rounded
                  alt='User'
                  img={currentUser.avtar}
                />

              }

            >
              <Dropdown.Header>

                <span className='block text-sm font-semibold'>@{currentUser.username}</span>
                <span className='truncate font-medium '>{currentUser.email}</span>
              </Dropdown.Header>

              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item><p className='font-semibold '>Profile</p></Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item className='text-red-600  dark:text-red-500 ' onClick={handleSignout}>
                <p className='font-semibold'>{loading ? "Signingout" : "Signout"}</p></Dropdown.Item>


            </Dropdown>
          ) : (

            <Button gradientDuoTone="purpleToBlue">
              Signin
            </Button>
          )}
          <Navbar.Toggle />
        </Link>
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"} >
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>

      </Navbar.Collapse>







    </Navbar >
  )
}

export default Header