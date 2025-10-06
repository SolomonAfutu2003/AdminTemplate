import React from 'react'

const Stats = ({dataTitle,dataCount,dataPercent}) => {
    return (
        <div>
            <section className='grid grid-cols-5 gap-5'>
                <div className='bg-white flex flex-col items-center gap-3 p-3 rounded-lg shadow-[#00000038] shadow-lg'>
                    <h3 className='text-2xl'>{dataTitle}</h3>
                    <p className='text-4xl'>{dataCount}</p>
                    <span>{dataPercent}</span>
                </div>
                <div className='bg-white flex flex-col items-center gap-3 p-3 rounded-lg shadow-[#00000038] shadow-lg'>
                    <h3 className='text-2xl'>{dataTitle}</h3>
                    <p className='text-4xl'>{dataCount}</p>
                    <span>{dataPercent}</span>
                </div>
                <div className='bg-white flex flex-col items-center gap-3 p-3 rounded-lg shadow-[#00000038] shadow-lg'>
                    <h3 className='text-2xl'>{dataTitle}</h3>
                    <p className='text-4xl'>{dataCount}</p>
                    <span>{dataPercent}</span>
                </div>
                <div className='bg-white flex flex-col items-center gap-3 p-3 rounded-lg shadow-[#00000038] shadow-lg'>
                    <h3 className='text-2xl'>{dataTitle}</h3>
                    <p className='text-4xl'>{dataCount}</p>
                    <span>{dataPercent}</span>
                </div>
                <div className='bg-white flex flex-col items-center gap-3 p-3 rounded-lg shadow-[#00000038] shadow-lg'>
                    <h3 className='text-2xl'>{dataTitle}</h3>
                    <p className='text-4xl'>{dataCount}</p>
                    <span>{dataPercent}</span>
                </div>
            </section>
        </div>
    )
}

export default Stats