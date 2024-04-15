import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, FileInput, Select, TextInput } from "flowbite-react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../Firebase.js"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"


function Updatepost() {
    const { currentUser, loading } = useSelector((state) => state.user)
    const [file, setfile] = useState(null)
    const [imageUploadProgress, setimageUploadProgress] = useState(null)
    const [imageUploadError, setimageUploadError] = useState(null)
    const [formdata, setFormdata] = useState({})
    const [publishError, setpublishError] = useState(null)
    const navigate = useNavigate()
    const { postId } = useParams()

    // console.log(formdata);

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()
                if (!res.ok) {
                    console.log(data.message);
                    setpublishError(data.message)
                    return
                }
                if (res.ok) {
                    setpublishError(null)
                    setFormdata(data.posts[0])
                }
            }

            fetchPost()


        } catch (error) {

        }

    }, [postId])
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
            const res = await fetch(`/api/post/updateposts/${formdata._id}/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            })
            const data = await res.json()
            if (!res.ok) {
                setpublishError(data.message)
                return
            }
            if (res.ok) {
                setpublishError(null)
                navigate(`/post/${data.slug}`)

            }

        } catch (error) {
            setpublishError("Something went wrong")

        }


    }





    return (
        <div className='mx-auto min-h-screen p-3 max-w-3xl'>
            <h1 className='text-center font-semibold my-7 text-3xl'>Update post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Title' id='title' required value={formdata.title}
                        className='flex-1' onChange={(e) => setFormdata({ ...formdata, title: e.target.value })} />
                    <Select value={formdata.category} onChange={(e) => setFormdata({ ...formdata, category: e.target.value })}>
                        <option value="uncategorize">Select a catogory</option>
                        <option value="javascript">Javascript</option>
                        <option value="nextjs">Next-js</option>
                        <option value="reactjs">Javascript/React-js</option>
                        <option value="reactjs">Javascript/Angular-js</option>
                        <option value="nodejs">Node/Express-js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4
                 border-teal-400 border-dotted p-3'>
                    <FileInput type="file" accept='images/*' onChange={(e) => setfile(e.target.files[0])}></FileInput>
                    <Button type='button' gradientDuoTone="purpleToBlue" size="sm"
                        onClick={uploadImage} >
                        {imageUploadProgress ? "Uploading..." : "Upload image"}</Button>
                </div>
                {imageUploadError && <p className='text-red-700'>{imageUploadError}</p>}
                {formdata.image && <img src={formdata.image} alt='upload'
                    className="w-24 h-24 object-cover"></img>}
                <ReactQuill onChange={(value) => setFormdata({ ...formdata, content: value })} value={formdata.content}
                    required className='h-72 mb-7' placeholder='Write something...' theme='snow' />

                <Button type='submit' gradientDuoTone="purpleToBlue" className='bg-red-400' disabled={loading}>
                    {loading ? "please wait" : "Update post"}</Button>

                {publishError && <p className='text-red-600'>{publishError}</p>}
            </form>
        </div>





    )
}

export default Updatepost