import React from 'react'

export default function PreLoader() {
  return (
    <div className='flex items-center justify-center flex-col mt-36'>
        <img className='w-36 h-36' src="./preloader/preloadergreen.svg" alt="pictures" />
        <h3 className='text-white text-lg word -mt-3'>درحال جست و جوی مخاطب...</h3>
    </div>
  )
}
