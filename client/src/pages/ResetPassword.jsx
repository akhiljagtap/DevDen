import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';





// import OAuth from '../components/OAuth';

export default function ResetPassword() {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({})
    const [error, setError] = useState(false)
    const [loading, setloading] = useState(false)
    const { id, token } = useParams()

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.id]: e.target.value })
    }
    // console.log(formdata);


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formdata.password) {
            setError("please enter password")
        }
        try {
            setloading(true)
            const res = await fetch(`/api/auth/resetpassword/${id}/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata),
            })
            if (res.ok) {
                setloading(false)
                toast.success("Your Password has been updated. please login again!")
                navigate("/signin")
            }




        } catch (error) {
            setloading(false)
            console.log("error occured", error)

        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-3 text-center tracking-tighter leading-tight">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlfor="password" className="block text-gray-700 text-sm font-bold mb-2 leading-tight">New password</label>
                        <input onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3
                         text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm"
                            id="password" type="password" placeholder="reset password" />
                    </div>
                    <div className='flex '>
                        <button type="submit" className="mx-auto px-2 bg-green-600 text-white
                     hover:opacity-90 focus:outline-none text-sm tracking-tight
                      font-medium">Reset
                        </button>

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
    //                 <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
    //                     <div>

    //                         <Label value='Reset password' />
    //                         <TextInput
    //                             type='password'
    //                             placeholder='Reset password'
    //                             id='password'
    //                             onChange={handleChange}
    //                         />
    //                     </div>

    //                     <button className='	bg-green-600 p-1 hover:opacity-95 font-semibold rounded-sm'
    //                         // gradientDuoTone='purpleToBlue'
    //                         type='submit'
    //                         disabled={!formdata.password}


    //                     >{loading ? "Updating" : "Reset password"}
    //                         {/* {loading ? (
    //                             <>
    //                                 <Spinner size='sm' />
    //                                 <span className='pl-3'>Loading...</span>
    //                             </>
    //                         ) : (
    //                             'Send'
    //                         )} */}
    //                     </button>
    //                     {/* <OAuth /> */}
    //                 </form>

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