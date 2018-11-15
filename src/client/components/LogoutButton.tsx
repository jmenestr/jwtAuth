import * as React from 'react'
import { logout } from '../store/auth';
import { connect } from 'react-redux';

interface OwnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface MappedDispatch {
    logout: () => void;
}

const mapDispatchToProps = (dispatch): MappedDispatch =>( {
    logout: () => dispatch(logout.action())
})
const LogoutButtonComponent = ({logout, ...props}: MappedDispatch & OwnProps) =>
    <button {...props} onClick={logout} > Logout </button>

const LogoutButton = connect(null, mapDispatchToProps)(LogoutButtonComponent)
export default LogoutButton
