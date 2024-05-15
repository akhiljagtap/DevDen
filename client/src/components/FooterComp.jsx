import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
export default function FooterCom() {
    return (
        <footer className=" dark:bg-black  dark:text-white
         text-black border-t border-teal-50   py-4">
            <div className="container mx-auto flex justify-between items-center">
                <p className='text-sm'>&copy; 2024 DevDen. All rights reserved.</p>
                <nav className='flex gap-3'>
                    <Link to="https://github.com/akhiljagtap" className='text-white font-thin
                    tracking-tight text-sm hover:underline'>Github</Link>
                    <Link to="https://www.linkedin.com/in/akhiljagtap/" className='text-white font-thin
                    tracking-tight text-sm hover:underline'>Linkdin</Link>
                    <Link to="https://twitter.com/akhill__24" className='text-white font-thin
                    tracking-tight text-sm hover:underline'>Twitter</Link>

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
        //                 <div>
        //                     <Footer.Title title='Follow us' />
        //                     <Footer.LinkGroup col>
        //                         <Footer.Link
        //                             href='https://github.com/akhiljagtap'
        //                             target='_blank'
        //                             rel='noopener noreferrer'
        //                         >
        //                             Github
        //                         </Footer.Link>
        //                         <Footer.Link
        //                             href='https://www.linkedin.com/in/akhiljagtap/'
        //                             target='_blank'
        //                             rel='noopener noreferrer'
        //                         >
        //                             Linkdin
        //                         </Footer.Link>

        //                     </Footer.LinkGroup>
        //                 </div>
        //                 <div>
        //                     <Footer.Title title='Legal' />
        //                     <Footer.LinkGroup col>
        //                         <Footer.Link href='#'>Privacy Policy</Footer.Link>
        //                         <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
        //                     </Footer.LinkGroup>
        //                 </div>
        //             </div>
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
        //             </div>

        //         </div>
        //     </div>
        // </Footer>


    );
}