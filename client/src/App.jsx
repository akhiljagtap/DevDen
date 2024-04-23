
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import PostCreate from './pages/PostCreate'
import Updatepost from './pages/Updatepost'
import PostPage from './pages/PostPage'
import ScrolltoTop from './components/ScrolltoTop'
import FooterComp from './components/FooterComp'
import Search from './pages/Search'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'





function App() {


  return (
    <BrowserRouter>
      <ScrolltoTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />

        <Route path='/search' element={<Search />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path='/createpost' element={<PostCreate />} />
          <Route path='/updatepost/:postId' element={<Updatepost />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>


      </Routes>
      <FooterComp />


    </BrowserRouter >
  )
}

export default App
