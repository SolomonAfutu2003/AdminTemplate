import React from 'react'

const Btn = ({text,icon,style,onClick,onMouseEnter}) => {
  return (
    <div>
        <button className={style} onClick={onClick} onMouseEnter={onMouseEnter}>
            {icon}
            {text}
        </button>
    </div>
  )
}

export default Btn