import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state={
            customer:{}
        }
    }

    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`http://dct-ticket-master.herokuapp.com/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const customer=response.data
            this.setState({customer})
        })
    }

    render(){
        return(
            <div>
                <h1>Customer Show</h1>
                <p>{this.state.customer.name}-{this.state.customer.email}-{this.state.customer.mobile}</p>
                <Link to={`/customers/edit/${this.props.match.params.id}`}>Edit</Link>
                <Link to="/customers">back</Link>
            </div>
        )
    }
}

export default CustomerShow