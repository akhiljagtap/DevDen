import { Button, Select, TextInput, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { GiTerror } from "react-icons/gi";

function Search() {
    const location = useLocation()
    const navigate = useNavigate()
    const [posts, setposts] = useState([])
    const [sidebarData, setsidebarData] = useState({
        searchTerm: "",
        sort: "asc",
        category: "uncategorized"
    })

    const [loading, setLoading] = useState(false)
    const [showMore, setshowMore] = useState(false)


    // console.log(sidebarData);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setsidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl
            })
        }
        const fetchPost = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
            if (!res.ok) {
                setLoading(false)
                return
            }
            if (res.ok) {
                const data = await res.json()
                setposts(data.posts)
                setLoading(false)
                if (data.posts.length === 9) {
                    setshowMore(true)
                } else {
                    setshowMore(false)
                }
            }
        }
        fetchPost()
    }, [location.search])

    const handleChange = (e) => {
        if (e.target.id === "searchterm") {
            setsidebarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === "sort") {
            const order = e.target.value || "asc"
            setsidebarData({ ...sidebarData, sort: order })
        }
        if (e.target.id === "category") {
            const category = e.target.value || "uncategorized"
            setsidebarData({ ...sidebarData, category: category })
        }

    }

    const handleSubmit = (e) => {

        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('category', sidebarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)

    }
    if (loading) return <div className='flex justify-center items-center min-h-screen'>
        <Spinner size="xl"></Spinner>
    </div>










    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search term:</label>
                        <TextInput placeholder='search' id='searchterm'
                            type='text' value={sidebarData.searchTerm} onChange={handleChange}></TextInput>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold' id='sort'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort}>
                            <option value="asc">Latest</option>
                            <option value="desc">Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold' id='category'>Category:</label>
                        <Select onChange={handleChange} value={sidebarData.category}>
                            <option value="uncategorized">uncategorized</option>
                            <option value="next">Next-js</option>
                            <option value="react">React-js</option>
                            <option value="javascript">Javascript</option>
                            <option value="angular">Angular</option>
                        </Select>
                    </div>
                    <Button gradientDuoTone="purpleToBlue" type='submit'>Apply filter</Button>
                </form>
            </div>
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500
                p-3 mt-5'>Post result</h1>
                <>
                    <div className='p-4 flex flex-wrap '>
                        {!loading && posts.length === 0 &&
                            <div className='items-center mx-auto flex flex-col' ><GiTerror size="md" />
                                <p className='font-semibold text-lg justify-center 
                                 mt-10'>Oops no result found for this search -  {sidebarData.searchTerm} </p>
                            </div>

                        }

                        {
                            loading && <p className='text-sm dark:text-white text-gray-500'>Fetching data...</p>
                        }
                        {posts && posts.map((post) => (
                            <PostCard post={post} key={post._id} />))

                        }

                    </div>
                </>
            </div>








        </div>
    )
}

export default Search