import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mt-24 text-black mb-2 tracking-tighter ">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full 
      sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold leading-tight mb-2 " for="first-name">
            username
          </label>
          <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline placeholder:text-sm text-xs"
            id="username" type="text" placeholder="username" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 leading-tight " for="email">
            Email
          </label>
          <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder:text-sm
          focus:shadow-outline text-xs" id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2 leading-tight " for="password">
            Password
          </label>
          <input onChange={handleChange} className="shadow text-xs placeholder:text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 
          leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder='password' />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-green-600 text-white px-2 py-1
           font-medium rounded hover:opacity-90 outline-none tracking-tighter ">Create my account</button>
        </div>
      </form>
      <div className="text-gray-700 text-sm mt-1 flex items-center">


        <span className="mr-1">Already have an account?</span>
        <Link to={"/signin"} className="text-blue-600 hover:underline font-medium">Sign In</Link>
      </div>
    </div>
  )















  // return (

  //   <div classNameNameName='min-h-screen mt-20'>
  //     <div classNameNameName='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
  //       {/* left */}
  //       <div classNameNameName='flex-1'>
  //         <Link to='signin' classNameNameName='font-bold dark:text-white text-4xl'>
  //           <span classNameNameName='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
  //             Akhil's
  //           </span>
  //           Blog
  //         </Link>
  //         <p classNameNameName='text-sm mt-5'>
  //           You can sign up with your email and password.

  //         </p>
  //       </div>
  //       {/* right */}

  //       <div classNameNameName='flex-1'>
  //         <form classNameNameName='flex flex-col gap-4' onSubmit={handleSubmit}>
  //           <div>
  //             <Label value='Your username' />
  //             <TextInput
  //               type='text'
  //               placeholder='Username'
  //               id='username'
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <Label value='Your email' />
  //             <TextInput
  //               type='email'
  //               placeholder='abc@gmail.com'
  //               id='email'
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div>
  //             <Label value='Your password' />
  //             <TextInput
  //               type='password'
  //               placeholder='Password'
  //               id='password'
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <Button
  //             gradientDuoTone='purpleToPink'
  //             type='submit'
  //             disabled={loading}
  //           >
  //             {loading ? (
  //               <>
  //                 <Spinner size='sm' />
  //                 <span classNameNameName='pl-3'>Loading...</span>
  //               </>
  //             ) : (
  //               'Create a account'
  //             )}
  //           </Button>
  //           {/* <OAuth /> */}
  //         </form>
  //         <div classNameNameName='flex gap-2 text-sm mt-5'>
  //           <span>Already Have an account?</span>
  //           <Link to={"/signin"} classNameNameName='text-blue-500'>
  //             Signin
  //           </Link>
  //         </div>
  //         {errorMessage && (
  //           <Alert classNameNameName='mt-5' color='failure'>
  //             {errorMessage}
  //           </Alert>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}