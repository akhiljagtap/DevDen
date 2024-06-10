import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice.js';



// import OAuth from '../components/OAuth';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const disabledButton = !formData.username || !formData.password


    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { loading, error: errorMessage } = useSelector(state => state.user)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            return signInFailure("All feilds are requied.")
        }
        try {
            dispatch(signInStart())

            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {

                dispatch(signInFailure(data.message))

            }

            if (res.ok) {

                dispatch(signInSuccess(data))
                navigate('/');

            }
        } catch (error) {
            dispatch(signInFailure(error.message))


        }
    };

    const onChange = () => {

    }

    return (

        <div className="flex flex-col items-center min-h-screen bg-black">
            <h2 className="text-2xl font-bold mt-24  mb-2 tracking-tighter text-white ">Sign In</h2>
            <form onSubmit={handleSubmit} className="bg-bg3 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className="mb-4">
                    <label className="block text-white text-sm font-semibold leading-tight mb-2" for="username">
                        Username
                    </label>
                    <input onChange={handleChange} className="shadow appearance-none border bg-bgcolor rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline placeholder:text-sm text-xs font-roboto"
                        id="username" type="text" placeholder="username" />
                </div>
                <div className="mb-6">
                    <label className="block text-white font-bold mb-2  leading-tight text-xs" for="password">
                        Password
                    </label>
                    <input onChange={handleChange} className="shadow appearance-none border bg-bgcolor rounded w-full py-2 px-3 text-gray-700 mb-3  
            leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm " id="password" type="password" placeholder='password' />
                </div>
                <div className="flex items-center justify-center">
                    <button className={`bg-green-600 text-white px-2 py-1 font-medium rounded 
                    outline-none tracking-tighter ${disabledButton ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`} disabled={disabledButton}>Sign In</button>
                </div>
            </form>
            <Link to={"/forgotpassword"} className='text-blue-500 text-sm font-medium tracking-normal hover:underline'
            >
                Forgotten password ?</Link>
            <div class="text-gray-700 text-sm mt-1 flex items-center ">


                <span class="mr-1 text-white  text-xs">Don't have an account ?</span>
                <Link to={"/signup"} class="text-blue-500 hover:underline font-medium">Create account</Link>
            </div>

        </div>

    )






    //     <div classNameName='min-h-screen mt-20'>
    //         <div classNameName='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    //             {/* left */}
    //             <div classNameName='flex-1'>
    //                 <Link to='signin' classNameName='font-bold dark:text-white text-4xl'>
    //                     <span classNameName='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
    //                         Akhil's
    //                     </span>
    //                     Blog
    //                 </Link>
    //                 <p classNameName='text-sm mt-5'>
    //                     You can sign up with your email and password.

    //                 </p>
    //             </div>
    //             {/* right */}

    //             <div classNameName='flex-1'>
    //                 <form classNameName='flex flex-col gap-4' onSubmit={handleSubmit}>
    //                     <div>
    //                         <Label value='Your username' />
    //                         <TextInput
    //                             type='text'
    //                             placeholder='Username'
    //                             id='username'
    //                             onChange={handleChange}
    //                         />
    //                     </div>
    //                     <div>
    //                         <Label value='Your password' />
    //                         <TextInput
    //                             type='password'
    //                             placeholder='Password'
    //                             id='password'
    //                             onChange={handleChange}
    //                         />
    //                     </div>
    //                     <Button
    //                         gradientDuoTone='purpleToPink'
    //                         type='submit'
    //                         disabled={loading}
    //                     >
    //                         {loading ? (
    //                             <>
    //                                 <Spinner size='sm' />
    //                                 <span classNameName='pl-3'>Loading...</span>
    //                             </>
    //                         ) : (
    //                             'Login'
    //                         )}
    //                     </Button>

    //                     {/* <OAuth /> */}
    //                 </form>
    // <Link to={"/forgotpassword"}><p classNameName='text-blue-500 text-sm mt-3'>Forgot password?</p></Link>
    // <div classNameName='flex gap-2 text-sm mt-5'>

    //                     <span>Don't have an account?</span>
    //                     <Link to='/signup' classNameName='text-blue-500'>
    //                         Create new account
    //                     </Link>
    //                 </div>
    //                 {errorMessage && (
    //                     <Alert classNameName='mt-5 font-semibold' color='failure'>
    //                         {errorMessage}
    //                     </Alert>
    //                 )}
    //             </div>
    //         </div>
    //     </div>
    // );
}