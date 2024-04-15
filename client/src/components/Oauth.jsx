import { Button } from 'flowbite-react'
import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import { app } from '../Firebase'

function Oauth() {
    const handleGoogleClick = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: "select_account" })
        try {
            const result = await signInWithPopup(provider, auth)
            console.log(result);

        } catch (error) {
            console.log(error);

        }

    }

    return (
        <Button onClick={handleGoogleClick} className='mt-2 mr-2 ml-3'>Continue with google</Button>
    )
}

export default Oauth