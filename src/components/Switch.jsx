import React from 'react'

const Switch = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-blue-500" : "bg-gray-400"
            }`}
    >
        <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"
                }`}
        />
    </button>
);


export default Switch
