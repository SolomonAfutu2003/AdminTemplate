import React from 'react'

const Header = ({mainText,subText}) => {
  return (
    <div className='w-full h-64 bg-blue-300'>
        <h1 className='text-4xl'>{mainText}</h1>
        <p className='text-2xl'>{subText}</p>
    </div>
  )
}

export default Header