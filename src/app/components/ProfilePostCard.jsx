import React from 'react'
import Link from 'next/link'
function ProfilePostCard() {
  return (
    <>
      <Link href={'/profile/post'} >
        <div className='border-2 w-[15vw] h-[15vw] max-md:w-[30vw] max-md:h-[30vw] lg:w-[12vw] lg:h-[12vw]'
        >

        </div>
      </Link>
    </>
  )
}

export default ProfilePostCard