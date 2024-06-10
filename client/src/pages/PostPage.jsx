import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comments from "../components/Comments";
import PostCard from '../components/PostCard';

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                if (res.ok) {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchRecentPosts();
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center min-h-screen'>
                <p className='text-red-500'>Failed to load the post. Please try again later.</p>
            </div>
        );
    }

    return (
        <main className='p-3 flex flex-col mx-auto min-h-screen bg-black w-full'>
            <h1 className='text-3xl text-white mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                {post && post.title}
            </h1>
            <Link
                to={`/search?category=${post && post.category}`}
                className='self-center mt-5'
            >
                <Button color='gray' pill size='xs'>
                    {post && post.category}
                </Button>
            </Link>
            <div className='flex justify-center items-center mt-10'>
                <img
                    src={post && post.image}
                    alt={post && post.title}
                    className='p-3 w-96 h-auto object-cover'
                />
            </div>
            <div className='flex justify-between text-yellow-200 p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic '>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div className='p-5 max-w-2xl mx-auto w-full post-content text-white uppercase
             text-sm font-thin bg-bg5 rounded-lg '>

                <div dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            </div>
            < Comments postId={post && post._id} />
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className='flex flex-wrap gap-5 mt-5 justify-center'>
                    {recentPosts &&
                        recentPosts.map((recentPost) => (
                            <PostCard key={recentPost._id} post={recentPost} />
                        ))}
                </div>
            </div>
        </main>
    );
}
