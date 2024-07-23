import React from 'react'
import { Darkmode } from './darkmode'
import { SignIn, UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ArrowDownCircle, BadgePlus, LucideOctagonX } from 'lucide-react'
import Logo from './Logo'
import Image from 'next/image'
function Header() {
  return (
    <div className=' flex justify-between items-center'>
      <div className=' flex justify-center items-center space-x-1 ml-2 '>

        <Image
          src={'https://firebasestorage.googleapis.com/v0/b/dropbag-10e74.appspot.com/o/users%2Fuser_2jYf0H87yf6ynt4eyiTC6Izb1RY%2Ffiles%2FhH0hW1OesYmNRY3VYit9?alt=media&token=54fd304b-a6b8-4225-8729-dcfb917d0b28'}
          alt='BagDrop logo'
          width={42}
          height={42}
        ></Image>

        <h1 className=' font-bold'>BagDrop</h1>
      </div>
      <div className='flex justify-center items-center space-x-2 px-5'>
        <Darkmode />
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode='modal' />
        </SignedOut>
      </div>
    </div>

  )
}

export default Header