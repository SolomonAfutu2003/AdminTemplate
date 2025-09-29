import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkBtn = ({ text, icon, to, className }) => {
    return (
        <div>
            <NavLink to={to} className={className}>
                {text}
                {icon}
            </NavLink>
        </div>
    )
}

export default LinkBtn