import React from 'react'

function About() {
    return (
        <div className='flex min-h-screen justify-center'>
            <div className='max-w-2xl  text-center mx-auto p-3'>
                <div>
                    <h1 className='font-semibold my-7 text-center text-3xl'>About us</h1>
                    <div className='text-md text-gray-500 flex flex-col gap-6'>
                        <p>Welcome to the Akhil's Blog.This blog was created by Akhil Jagtap, as personal
                            project to share his thoughts and ideas with world. Akhil is MERN stack developer
                            who loves to write about technology,coding & everything in between.
                        </p>

                        <p>
                            On this blog you'll find weakly articles on the topic such as web developement,
                            software engineering and programming language.Akhil is always exploring and learning
                            new technologies.So be sure to check back often for new content.
                        </p>

                        <p>
                            We encourage you to leave comments on our posts and enagage with
                            other leaders.We belive that community of learners help each other to
                            grow and improve.
                        </p>
                        <p>Thanks and regards.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About