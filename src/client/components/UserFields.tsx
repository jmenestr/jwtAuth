import * as React from 'react'

interface Props {
    onFirstNameChange: React.EventHandler<React.ChangeEvent>
    onLastNameChange: React.EventHandler<React.ChangeEvent>
    firstName: string;
    lastName:string
}
const UserFields = (props: Props) =>
    <div className="mb-4 flex justify-center">
        <div className='flex-1 mr-4'>
            <label
            className="inline-block text-grey-darker text-sm font-bold mb-2"
            htmlFor="firstName"
            >
            First Name
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={props.firstName}
            onChange={props.onFirstNameChange}
            />
        </div>

        <div className='flex-1'>
            <label
            className="inline-block text-grey-darker text-sm font-bold mb-2"
            htmlFor="lastName"
            >
            Last Name
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={props.lastName}
            onChange={props.onLastNameChange}
            />
        </div>
    </div>

export default UserFields
