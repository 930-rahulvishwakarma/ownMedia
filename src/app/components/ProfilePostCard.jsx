import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
function ProfilePostCard({content}) {
  return (
    <>
      <Link href={'/profile/post'} >
        <div className='w-[15vw] h-[15vw] max-md:w-[30vw] max-md:h-[30vw] lg:w-[12vw] lg:h-[12vw]'
        >
         <Image src={content.postPhoto} alt='posts' width={100} height={100} className='object-cover w-auto h-full ' />
        </div>
      </Link>
    </>
  )
}

export default ProfilePostCard