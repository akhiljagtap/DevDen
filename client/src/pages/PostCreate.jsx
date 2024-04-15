import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, FileInput, Select, TextInput, Spinner } from "flowbite-react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../Firebase.js"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"


function PostCreate() {
    const { currentUser } = useSelector((state) => state.user)
    const [file, setfile] = useState(null)
    const [imageUploadProgress, setimageUploadProgress] = useState(null)
    const [imageUploadError, setimageUploadError] = useState(null)
    const [formdata, setFormdata] = useState({})
    const [publishError, setpublishError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // console.log(imageUploadError, imageUploadProgress);
    // console.log(formdata);
    const uploadImage = async () => {
        try {
            if (!file) {
                setimageUploadError("Please select file")
                return;
            }
            setimageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageref = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageref, file)
            uploadTask.on(
                'state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setimageUploadProgress(progress.toFixed(0))
                },
                (error) => {

                    setimageUploadError("image upload failed", error)
                    setimageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setimageUploadError(null)
                        setimageUploadProgress(null)
                        setFormdata({ ...formdata, image: downloadURL })
                    })
                }


            )

        } catch (error) {

            setimageUploadError("iamge upload failed.")
            setimageUploadProgress(null)
            console.log(error);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            setLoading(true)
            const res = await fetch("/api/post/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()
            if (!res.ok) {
                setpublishError(data.message)
                setLoading(false)
                return
            }
            if (res.ok) {
                setLoading(false)
                setpublishError(null)
                navigate(`/post/${data.slug}`)

            }

        } catch (error) {
            setLoading(false)
            setpublishError("Something went wrong")

        }

    }









    return (
        <div className='mx-auto min-h-screen p-3 max-w-3xl'>
            <h1 className='text-center font-semibold my-7 text-3xl'>Create post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Title' id='title' required
                        className='flex-1' onChange={(e) => setFormdata({ ...formdata, title: e.target.value })} />
                    <Select onChange={(e) => setFormdata({ ...formdata, category: e.target.value })}>
                        <option value="uncategorize">Select a catogory</option>
                        <option value="javascript">Javascript</option>
                        <option value="nextjs">Next-js</option>
                        <option value="reactjs">Javascript/React-js</option>
                        <option value="reactjs">Javascript/Angular-js</option>
                        <option value="nodejs">Node/Express-js</option>
                        <option value="nodejs">Other</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4
                 border-teal-400 border-dotted p-3'>
                    <FileInput type="file" accept='images/*' onChange={(e) => setfile(e.target.files[0])} ></FileInput>
                    <Button type='button' gradientDuoTone="purpleToBlue" size="sm"
                        onClick={uploadImage} pill>
                        {imageUploadProgress ? <Spinner size="md" className='flex mx-auto' /> : "Upload image"}</Button>
                </div>
                {imageUploadError && <p className='text-red-700'>{imageUploadError}</p>}
                {formdata.image && <img src={formdata.image} alt='upload'
                    className="w-24 h-24 object-cover"></img>}
                <ReactQuill onChange={(value) => setFormdata({ ...formdata, content: value })} required
                    className='h-72 mb-7 dark:text-white'
                    placeholder='Write something...' theme='snow' />

                <Button type='submit' gradientDuoTone="purpleToBlue" className='bg-red-400'>
                    {loading ? <Spinner size="md" className='mx-auto' /> : "Create post"} </Button>

                {publishError && <p className='text-red-500'>{publishError}</p>}
            </form>
        </div>





    )
}

export default PostCreate