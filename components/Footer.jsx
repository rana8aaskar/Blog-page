import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black items-center'>
      <Image src={assets.logo_light} alt='' width={120} height={100} className='mt-3 mb-3'/>
       <p className='text-sm text-white'>All rights reserved. Copyright @blogger</p>
        <div className='flex'>
            <Image src={assets.facebook_icon} alt='' width={40}/>
            <Image src={assets. twitter_icon} alt='' width={40}/>
            <Image src={assets.googleplus_icon} alt='' width={40}/>
        </div>
    </div>
  )
}

export default Footer
