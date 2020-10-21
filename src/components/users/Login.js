import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            passowrd:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://dct-ticket-master.herokuapp.com/users/login",formData)
        .then((response)=>{
            if(response.data.hasOwnProperty("error")){
                alert(response.data.error)
            }else{
                const token=response.data.token
                localStorage.setItem("authToken",token)
                this.props.history.push("/")
                window.location.reload()
            }
        })
    }

    render(){
        return(
            <div>
                <h2>Login to your account</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email" id="email"/> <br/>

                    <label htmlFor="password">password</label>
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password" id="password"/> <br/>

                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Login