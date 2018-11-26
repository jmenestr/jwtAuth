import * as React from 'react'
import classnames from 'classnames'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    name: string;
    inline?: boolean;
}
const Input = (props: InputProps) => {
 return <div className={classnames("mb-4 mr-2", { 'flex-1': props.inline})}>
    <label
      className="inline-block text-grey-darker text-sm font-bold mb-2"
      htmlFor={props.name}
    >
      { props.label }
    </label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      id={props.name}
      type={props.type}
      name={props.name}
      placeholder={ props.placeholder }
      value={props.value}
      onChange={props.onChange}
    />
  </div>
}

export default Input
