import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';





// import OAuth from '../components/OAuth';

export default function forgotpassword() {
    const navigate = useNavigate()
    const [formdata, setFormdata] = useState({})
    const [error, setError] = useState(false)
    const [loading, setloading] = useState(false)

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.id]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formdata.email === "") {
            setloading(false)
            setError("please enter email")
        }
        try {
            setloading(true)
            const res = await fetch("/api/auth/forgotpassword", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formdata),
            })
            if (res.ok) {
                <Toaster richColors />
                toast.success(`Email has been sent to -${formdata.email}`)
                setloading(false)
                // alert("email sent ")

            }

        } catch (error) {
            console.log("error occured")
            setloading(false)

        }

    }


    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                {/* left */}
                <div className='flex-1'>
                    <Link to='signin' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Akhil's
                        </span>
                        Blog
                    </Link>

                </div>
                {/* right */}

                <div className='flex-1 mx-auto'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className=''>
                            <Label value='Email' />
                            <TextInput
                                type='email'
                                placeholder='Email'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>

                        <button className='	bg-green-600 p-1 hover:opacity-95 font-semibold rounded-sm'
                            // gradientDuoTone='purpleToBlue'
                            type='submit'
                            disabled={!formdata.email}

                        >{loading ? "Sending" : "Send reset password link"}

                            {/* {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                ''
                            )} */}
                        </button>
                        {/* <OAuth /> */}
                    </form>
                    {error && <p className='text-red-600 font-semibold text-sm'>{error}</p>}

                    {/* {errorMessage && (
                        <Alert className='mt-5 font-semibold' color='failure'>
                            {errorMessage}
                        </Alert>
                    )} */}
                </div>
            </div>
        </div>
    );
}