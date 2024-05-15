
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Modal, TextInput, Spinner } from "flowbite-react"
import { useSelector, useDispatch } from "react-redux"
import {
    updateStart, updateSuccess, updateFailure,
    deleteStart, deleteSuccess, deleteFailure, signoutSuccess
} from '../redux/user/userSlice'

import { Link } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../Firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BiEditAlt } from "react-icons/bi";

function DashProfile() {
    const filePickerRef = useRef()
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadingProgress, setimageFileUploadingProgress] = useState(null)
    const [imageFileUploadingError, setimageFileUploadingError] = useState(null)
    const [formdata, setformdata] = useState({})
    const [showModal, setshowModal] = useState(false)
    const [loading, setloading] = useState(false)
    const [eror, seteror] = useState(null)

    // console.log(imageFileUploadingError, imageFileUploadingProgress);


    const { currentUser, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleImgaeChange = (e) => {

        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    // useEffect(() => {
    //     if (imageFile) {
    //         uploadImage()
    //     }
    // }, [imageFile])
    // setimageFileUploadingError(null)

    const uploadImage = async () => {
        setloading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name;
        const storageref = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageref, imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                setloading(true)
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setimageFileUploadingProgress(progress)
                setimageFileUploadingProgress(null)

            },
            (error) => {
                setimageFileUploadingError("Could not upload image")
                setimageFileUploadingProgress(null)
                setImageFile(null)
                setloading(false)
                setImageFileUrl(null)


            },
            () => {
                setloading(false)
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)
                    setformdata({ ...formdata, avtar: downloadURL })

                })
            }


        )

    }
    useEffect(() => {
        if (imageFile) {
            setloading(true)
            uploadImage()
        }
        setloading(false)
    }, [imageFile])




    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.id]: e.target.value })
    }
    // console.log(formdata);

    const handleSubmit = async (e) => {
        e.preventDefault()
        // if (Object.keys(formdata).length === 0) {
        //     return dispatch(updateFailure("No changes made."))
        //     // console.log("nothing to update");


        // }
        try {
            if (Object.keys(formdata).length === 0) {
                return dispatch(updateFailure("No changes made."))
                // console.log("nothing to update");
            }

            dispatch(updateStart())

            setloading(true)
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()
            if (!res.ok) {
                setloading(false)
                dispatch(updateFailure(data.message))
            } else {
                setloading(false)
                dispatch(updateSuccess(data))
            }
        } catch (error) {
            setloading(false)
            console.log(error);
            dispatch(updateFailure(error.message))

        }

    }






    const handleDelete = async (e) => {
        setshowModal(false)
        try {
            dispatch(deleteStart())
            // error(null)
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            if (!res.ok) {
                dispatch(deleteFailure(data.message))
            } else {
                dispatch(deleteSuccess(data))

            }

        } catch (error) {
            dispatch(deleteFailure("Something went wrong."))

        }
    }
    const handleSignout = async () => {
        try {
            const res = await fetch("/api/user/signout", {
                method: "POST"
            })
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess())

            }
            const data = await res.json()
        } catch (error) {
            console.log(error.message);

        }
    }

    // if (loading) return (
    //     <div className='flex justify-center items-center min-h-screen mx-auto'>
    //         <Spinner size="lg"></Spinner>
    //     </div>
    // )








    return (
        <div className='max-w-lg mx-auto p-3 w-full mt-16'>
            <h1 className='font-semibold my-7 text-center text-3xl'>Profile</h1>
            <form className='flex flex-col gap-3 ' onSubmit={handleSubmit} >
                <input type='file' accept='image/*' hidden ref={filePickerRef} onChange={handleImgaeChange}></input>
                <div className=' relative w-32 h-32 self-center' onClick={() => filePickerRef.current.click()}>
                    {
                        imageFileUploadingProgress && (
                            <CircularProgressbar value={imageFileUploadingProgress}
                                text={`${imageFileUploadingProgress}%`}
                                strokeWidth={5}
                                styles={{
                                    root: {
                                        width: '100%',
                                        height: '100%',
                                        position: "absolute",
                                        top: 0,
                                        left: 0
                                    },
                                    path: {
                                        stroke: `rgba(62,152,199)${imageFileUploadingProgress}/100`
                                    }
                                }} />
                        )
                    }
                    {/* <img  className='w-32 h-32 rounded-full border-4 border[lightgray] object-cover cursor-pointer'
                        src={imageFileUrl || currentUser.avtar} /> */}
                    <div className="relative flex items-center">
                        <img
                            className='w-32 h-32 rounded-full border-4 border-[lightgray] object-cover cursor-pointer'
                            src={imageFileUrl || currentUser.avtar}
                            alt="User Image"
                        />
                        {/* Edit icon button */}
                        <button
                            className="ml-2 text-white rounded-full p-2 cursor-pointer relative"

                        >
                            <BiEditAlt className='hover:text-yellow-200' size={30} />
                            {/* Tooltip */}

                        </button>
                    </div>




                </div>
                {
                    imageFileUploadingError && <Alert>{imageFileUploadingError}</Alert>
                }
                <TextInput type='text' id='username' placeholder='username'
                    defaultValue={currentUser.username} onChange={handlechange}></TextInput>
                <TextInput type='email' id='email' placeholder='email'
                    defaultValue={currentUser.email} onChange={handlechange}></TextInput>
                <TextInput type='password' id='password'
                    onChange={handlechange}></TextInput>
                <Button gradientDuoTone="purpleToBlue" type='submit' disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Update"}</Button>



                {
                    currentUser.isAdmin && (
                        <Link to={"/createpost"}>
                            <Button className='w-full' type='button' disabled={loading} gradientDuoTone="purpleToPink">
                                Create a post
                            </Button>
                        </Link>
                    )
                }

            </form>
            {error && <p className='text-red-600 mt-3'>{error}</p>}
            <div className='flex justify-between mt-2 text-red-500 cursor-pointer'>
                <span onClick={() => setshowModal(true)}>Delete</span>
                <span onClick={handleSignout}>Signout</span>
            </div>
            <Modal show={showModal} onClose={() => setshowModal(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='font-semibold '>Delete account</h3>
                        {/* <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' /> */}
                        <h3 className='text-md mb-4 text-gray-700'>Delete your account permanently?</h3>
                        <div className='flex justify-between gap-4'>
                            <Button className='text-blue-600 hover:bg-blue-200' color="transperant"
                                pill onClick={handleDelete}>Delete</Button>
                            <Button onClick={() => setshowModal(false)} color="transperant"
                                className='text-blue-600 hover:bg-blue-200' pill>Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashProfile