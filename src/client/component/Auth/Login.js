import React, { Component } from 'react';
import './Login.css'

function Login() {
    return (
        <div className="Login">
            <span>id: </span>
            <input className="id"></input>
            <span>pw: </span>
            <input className="password"></input>
        </div>
    );
}

export default Login;