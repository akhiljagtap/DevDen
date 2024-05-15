import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import "../App.css";






// import OAuth from '../components/OAuth';

export default function forgotpassword() {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({})
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)


    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.id]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formdata.email === "") {
                setError("are kuch to daal ")
                return;
            }
            setloading(true)
            const res = await fetch("/api/auth/forgotpassword", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata),
            })
            if (res.ok) {
                <Toaster richColors />
                toast.success(`Email has been sent to -${formdata.email}`, {
                    toastClassName: 'custom-toast',

                })
                setloading(false)
                // alert("email sent ")

            }

        } catch (error) {
            console.log("error occured")
            setloading(false)

        }

    }


    return (
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
            <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 class="text-lg font-semibold text-gray-700 mb-3 text-center tracking-tighter leading-tight">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2 leading-tight">Email</label>
                        <input onChange={handleChange} class="shadow appearance-none border rounded w-full py-2 px-3
                         text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm"
                            id="email" type="email" placeholder="your email" />
                    </div>
                    <div className='flex '>
                        <button type="submit" className="mx-auto px-2 bg-green-600 text-white
                     hover:opacity-90 focus:outline-none text-sm tracking-tight
                      font-medium">Send Reset Password Link
                        </button>
                        <Link to={"/signin"} className='text-blue-600 text-xs hover:underline'>Back to login</Link>
                    </div>
                </form>
                {error && <p className='text-red-600'>{error}</p>}
            </div>
        </div>
    )


    // return (
    //     <div className='min-h-screen mt-20'>
    //         <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    //             {/* left */}
    //             <div className='flex-1'>
    //                 <Link to='signin' className='font-bold dark:text-white text-4xl'>
    //                     <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
    //                         Akhil's
    //                     </span>
    //                     Blog
    //                 </Link>

    //             </div>
    //             {/* right */}

    //             <div className='flex-1 mx-auto'>
    //                 <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    //                     <div className=''>
    //                         <Label value='Email' />
    //                         <TextInput
    //                             type='email'
    //                             placeholder='Email'
    //                             id='email'
    //                             onChange={handleChange}
    //                         />
    //                     </div>

    //                     <button className='	bg-green-600 p-1 hover:opacity-95 font-semibold rounded-sm'
    //                         // gradientDuoTone='purpleToBlue'
    //                         type='submit'
    //                         disabled={!formdata.email}

    //                     >{loading ? "Sending" : "Send reset password link"}

    //                         {/* {loading ? (
    //                             <>
    //                                 <Spinner size='sm' />
    //                                 <span className='pl-3'>Loading...</span>
    //                             </>
    //                         ) : (
    //                             ''
    //                         )} */}
    //                     </button>
    //                     {/* <OAuth /> */}
    //                 </form>
    //                 {error && <p className='text-red-600 font-semibold text-sm'>{error}</p>}

    //                 {/* {errorMessage && (
    //                     <Alert className='mt-5 font-semibold' color='failure'>
    //                         {errorMessage}
    //                     </Alert>
    //                 )} */}
    //             </div>
    //         </div>
    //     </div>
    // );
}