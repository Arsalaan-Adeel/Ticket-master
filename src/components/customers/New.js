import React from 'react'
import CustomerForm from "./Form"
import axios from 'axios'

class CustomerNew extends React.Component{

    handleSubmit=(formData)=>{
        axios.post("http://dct-ticket-master.herokuapp.com/customers",formData, {
            headers:{
                'x-auth':localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty("errors")){
                alert(response.data.message)
            }else{
                this.props.history.push("/customers")
            }
        })
    }

    render(){
        return(
            <div>
                <h1>Add Customer</h1>

                <CustomerForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default CustomerNew