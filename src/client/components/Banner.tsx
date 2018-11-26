import * as React from 'react'

const Banner = ({ message }: { message: string }) =>
    <div className="bg-red-lightest border border-red-light text-red-dark px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{ message }</span>
        <span className="absolute pin-t pin-b pin-r px-4 py-3">
        </span>
    </div>


export default Banner
