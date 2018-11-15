import * as React from 'react'
import LogoutButton from '../components/LogoutButton';

export default class Dashboard extends React.Component {
    protectedRoute = () => {
        fetch('http://localhost:8080/dashboard/protectedRoute', {
            method: 'GET'
        }).then(res => console.log(res.json()))
    }
    render() {
        return (
            <div> 
                <LogoutButton />
                <button onClick={this.protectedRoute}> Protected</button>
                I am a protected dashboard route
            </div>
        )
    }
}
