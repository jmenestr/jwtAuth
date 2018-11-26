import * as React from 'react'
import Input from './Input';

interface Props {
    onFirstNameChange: React.EventHandler<React.ChangeEvent>
    onLastNameChange: React.EventHandler<React.ChangeEvent>
    firstName: string;
    lastName:string
}
const UserFields = (props: Props) =>
    <div className="mb-4 flex justify-center">
        <Input inline  name='firstName' label='First Name' placeholder='First Name' value={props.firstName} onChange={props.onFirstNameChange} />
        <Input inline name='lastName' label='Last Name' placeholder='Last Name' value={props.lastName} onChange={props.onLastNameChange} />
    </div>

export default UserFields
