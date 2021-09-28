import React, { Component } from 'react';
import './Login.css';
import api from '../utils/api.utils';


class Sign extends Component {
    
    state = {
        name: "",
        email: "",
        password: "",
        message: ""
    }

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
            await api.signup(this.state);
            this.props.history.push('/');
        } catch (error) {
            this.setState({
                message: 'Sign up error'
            })
        }
    }


    render() {
        return (
            <div>
                <div className='login-form'>
                    <h1>Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Username</label>
                        <input type='text' name='name' value={this.state.name} placeholder='Username' onChange={this.handleInput}/>
                        <label>Email</label>
                        <input type='email' name='email' value={this.state.email} placeholder='Email' onChange={this.handleInput}/>
                        <label>Password</label>
                        <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/>
                        <button type="submit">SIGN UP</button>
                    </form>
                    {this.state.message && <div>{this.state.message}</div>}
                </div>
            </div>
        )
    };
};

export default Sign;