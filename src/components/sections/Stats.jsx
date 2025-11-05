import React from 'react'
import LinkBtn from '../LinkBtn'

const Stats = ({ dataTitle, dataCount, style, loader,icon,text,linkStyle }) => {
    return (
        <section>
            <div className={`bg-white p-5 rounded-lg h-50 shadow-[#00000038] shadow-lg ${style}`}>
                <h3 className='text-xl font-semibold'>{dataTitle}</h3>
                <p className='text-5xl font-medium'>{dataCount}</p>
                <div>{loader}</div>
                <LinkBtn icon={icon} text={text} className={`text-orange-700 text-sm ${linkStyle}`} />
            </div>
        </section>
    )
}

export default Stats