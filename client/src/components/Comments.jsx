import { Alert, Button, Modal, Spinner, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { MdOutlineDoNotDisturbOn } from "react-icons/md"


export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setloading] = useState(false)
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200) {
            return;
        }
        try {
            setloading(true)
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setloading(false)
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch (error) {
            setloading(false)
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getComments();
    }, [postId]);

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/likecomment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                ...comment,
                                likes: data.likes,
                                numberOfLikes: data.likes.length,
                            }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };



    const handleDelete = async (commentId) => {
        setShowModal(false);
        try {
            if (!currentUser) {
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p className='font-medium'>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={currentUser.avtar}
                        alt=''
                    />
                    <Link
                        to={'/dashboard?tab=profile'}
                        className='text-xs font-semibold text-green-400 text-cyan-600 hover:underline'
                    >
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-green-400 my-5 flex gap-1 tracking-tight'>
                    Want to make comments please -
                    <Link className='text-blue-500 hover:underline' to={'/signin'}>
                        Sign In
                    </Link>
                </div>
            )}
            {currentUser && (
                <form
                    onSubmit={handleSubmit}
                    className=' rounded-md p-3'
                >
                    <Textarea className='bg-bg5 text-white font-semibold tracking-wide resize-none'
                        placeholder='Comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs font-semibold'>
                            {200 - comment.length} characters remaining
                        </p>
                        <button className='bg-blue-700 text-white font-semibold p-1 rounded-full 
                        flex items-center px-2 hover:opacity-90' type='submit' disabled={comment.length === 0}>
                            {loading ? <Spinner size="sm" /> : "Comment"}
                        </button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5'>
                            {commentError}
                        </Alert>
                    )}
                </form>
            )}
            {comments.length === 0 ? (
                <div className="flex flex-col">
                    <div className="flex items-center my-5 text-gray-200">
                        <p className="text-sm font-semibold mr-2">No comments yet!</p>
                        <MdOutlineDoNotDisturbOn color='red' size={20} />
                    </div>
                </div>

            ) : (
                <>
                    <div className='text-sm my-5 text-white flex items-center gap-1'>
                        <p>Total Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            onLike={handleLike}
                            onDelete={(commentId) => {
                                setShowModal(true);
                                setCommentToDelete(commentId);
                            }}
                        />
                    ))}
                </>
            )}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        {/* <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
                        <h3 className='mb-5 text-md text-gray-500 dark:text-gray-400'>
                            Delete comment
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                color='failure'
                                onClick={() => handleDelete(commentToDelete)}
                            >
                                Delete comment permantaly
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}