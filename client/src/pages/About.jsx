import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { VscError } from "react-icons/vsc";

function About() {
    const [feedback, setfeedback] = useState({})
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const navigate = useNavigate()
    // console.log(feedback)
    const handleChnage = (e) => {
        setfeedback({ ...feedback, [e.target.id]: e.target.value.trim() })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(feedback).length === 0) {
            seterror("Feedback can not be empty!")
            return
        }

        try {
            seterror(null)
            const res = await fetch("/api/feedback/feedbackmsg", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedback),

            })
            const data = await res.json()
            if (res.ok) {
                <Toaster richColors />
                toast.success("Thanks for your Feedback."), {
                    toastClassName: 'custom-toast',
                }
                navigate("/")
                setfeedback('')

            }

        } catch (error) {
            console.log(error, "feedback error!");

        }

    }







    if (loading) return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spinner size="xl"></Spinner>
        </div>
    )

    return (
        <div className='flex min-h-screen justify-center bg-black '>
            <div className='max-w-2xl  text-center mx-auto p-3'>
                <div>
                    <h1 className='font-semibold my-7 mt-20 text-white text-center text-3xl tracking-tighter'>About DevDen</h1>
                    <div className='text-md font-thin  flex flex-col gap-6 text-gray-400'>
                        <p>Welcome to the DevDen.This blog was created by Akhil Jagtap, as personal
                            project to share his thoughts and ideas with world. Akhil is MERN stack developer
                            who loves to write about technology,coding & everything in between.
                        </p>

                        <p>
                            On this blog you'll find articles on the topic such as
                            software developement ,DSA and coading realted.Akhil is always exploring and learning
                            new technologies.So be sure to check back often for new content.
                        </p>

                        <p>
                            We encourage you to leave <Link className='text-green-400 text-sm underline font-semibold tracking-tighter' to={"/post/AngularJs"}>Comments</Link> on our posts and enagage with
                            other leaders.We belive that community of learners help each other to
                            grow and improve.
                        </p>
                        <nav className='flex items-center mx-auto gap-3 '>

                            <Link to="https://www.linkedin.com/in/akhiljagtap/" className='text-white font-thin
                    tracking-tight text-sm hover:underline'><img src='https://tse3.mm.bing.net/th?id=OIP.EweiZI5x1TFwSg9aJw6pZgHaHa&pid=Api&P=0&h=180 ' className='filte\
                     invert w-6 h-6 ml-1'></img></Link>
                            <Link to="https://twitter.com/akhill__24" className='text-white font-thin
                    tracking-tight text-sm hover:underline'><img src='https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png' className='filte\
                     invert w-5  h-5'></img></Link>
                        </nav>

                        <div class="container mx-auto mt-6 p-8 bg-black rounded-lg shadow-lg">
                            <h1 class="text-2xl font-bold mb-6 tracking-tighter text-white leading-tight
                            ">Send Us Your Feedback</h1>
                            {error && <p className='text-red-500 flex items-center gap-3 font-medium text-sm tracking-tight mb-5'>{error}<span><VscError className='mx-auto ' size={20} /></span></p>}
                            <form onSubmit={handleSubmit}>
                                <input onChange={handleChnage} type="text" placeholder="Enter your feedback" id='feed' name="feedback"
                                    class="w-full px-4 py-2 mb-6 border border-black bg-bg3 rounded-md focus:outline-none" />
                                <button type="submit" className="mx-auto px-3 py-1
                                 bg-green-600 text-white hover:opacity-90 focus:outline-none text-sm tracking-tighter font-semibold">
                                    {loading ? <Spinner /> : "Send"}
                                </button>
                            </form>
                        </div>



                        <p className='text-white font-semibold'>Thanks and regards.</p>

                        <img className='w-10 h-10 mx-auto flex flex-col' src='https://cdn3d.iconscout.com/3d/premium/thumb/code-4059153-3364039@0.png' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About