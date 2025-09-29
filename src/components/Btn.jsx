import React from 'react'

const Btn = ({text,icon,style,onClick}) => {
  return (
    <div>
        <button className={style} onClick={onClick}>
            {icon}
            {text}
        </button>
    </div>
  )
}

export default Btn