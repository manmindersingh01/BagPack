import React from 'react'
import { Darkmode } from './darkmode'
import { SignIn, UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className=' flex justify-between items-center'>
      <div className=' flex justify-center items-center space-x-1'>
        <span className='text-sm'>logo</span>
        <h1 className=' font-bold'>DropBag</h1>
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