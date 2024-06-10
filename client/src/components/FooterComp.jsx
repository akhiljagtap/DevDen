import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
import { FaXTwitter } from "react-icons/fa6";
export default function FooterCom() {
    return (
        <footer className=" bg-black  text-white
        py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className='text-sm'>&copy; 2024 DevDen. All rights reserved.</p>
                <nav className='flex gap-3'>
                    <Link to="https://github.com/akhiljagtap" className='text-white font-medium
                    tracking-tight  hover:underline'><BsGithub className='hover:underline ' /></Link>
                    <Link to="https://www.linkedin.com/in/akhiljagtap/" className='text-white font-medium
                    tracking-tight  hover:underline'><BsLinkedin /></Link>
                    <Link to="https://twitter.com/akhill__24" className='text-white font-medium
                    tracking-tight  hover:underline'><FaXTwitter /></Link>

                </nav>
            </div>
        </footer>
        // <Footer container classNameName='border border-t-8 border-teal-500'>
        //     <div classNameName='w-full max-w-7xl mx-auto'>
        //         <div classNameName='grid w-full justify-between sm:flex md:grid-cols-1'>
        //             <div classNameName='mt-5'>
        //                 <Link
        //                     to='/'
        //                     classNameName='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
        //                 >
        //                     <span classNameName='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
        //                         Akhil's
        //                     </span>
        //                     Blog
        //                 </Link>
        //             </div>
        //             <div classNameName='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
        //                 <div>
        //                     <Footer.Title title='About' />
        //                     <Footer.LinkGroup col>
        //                         <Footer.Link
        //                             href='/about'
        //                             target='_blank'
        //                             rel='noopener noreferrer'
        //                         >
        //                             Akhil's Blog
        //                         </Footer.Link>
        //                     </Footer.LinkGroup>
        //                 </div>
        //                     <Footer.Title title='Follow us' />
        //                             href='https://github.com/akhiljagtap'
        //                             Github
        //                             href='https://www.linkedin.com/in/akhiljagtap/'
        //                             Linkdin
        //                     <Footer.Title title='Legal' />
        //                         <Footer.Link href='#'>Privacy Policy</Footer.Link>
        //                         <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
        //         </div>
        //         <Footer.Divider />
        //         <div classNameName='w-full sm:flex sm:items-center sm:justify-between'>
        //             <Footer.Copyright
        //                 href='#'
        //                 by="Akhil's blog"
        //                 year={new Date().getFullYear()}
        //             />
        //             <div classNameName="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
        //                 <Footer.Icon href='https://github.com/akhiljagtap' icon={BsGithub} />
        //                 <Footer.Icon href='https://www.linkedin.com/in/akhiljagtap/' icon={BsLinkedin} />
        //                 <Footer.Icon href='https://www.instagram.com/akhill__24/?hl=en' icon={BsInstagram} />
        //     </div>
        // </Footer>
    );
}