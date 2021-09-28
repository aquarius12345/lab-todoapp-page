import React from 'react';
import { Component } from 'react';
import './Login.css';
import api from '../utils/api.utils';


class Login extends Component {
    state = {
        email: "",
        password: "",
        message: ""
    };

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState ({
            [name]: value
        })
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        //console.log(this.state);
        try {
            await api.login(this.state);
            this.props.history.push('/');
        } catch (error) {
            this.setState({
                message: 'Login error'
            })
        }
    }

    render() {
        return (
            <div>
                <div className='login-form'>
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                        
                        <label>Email</label>
                        <input type='email' name='email' value={this.state.email} placeholder='Email' onChange={this.handleInput}/>
                        <label>Password</label>
                        <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/>
                        <button type="submit">LOGIN</button>
                    </form>
                    {this.state.message && <div>{this.state.message}</div>}
                </div>
                
            </div>
        )
    };
};

export default Login;