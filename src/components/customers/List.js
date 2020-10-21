import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

class CustomersList extends React.Component{
    constructor(){
        super()
        this.state={
            customers:[]
        }
    }

    componentDidMount(){
        axios.get("http://dct-ticket-master.herokuapp.com/customers",{
            headers:{
                "x-auth":localStorage.getItem("authToken")      
            }
        })
        .then(response=>{
            const customers=response.data
            this.setState({customers})
        })
    }

    handleRemove=(id)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`,{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            this.setState(prevState=>({
                customers:prevState.customers.filter(customer=>customer._id!==response.data._id)
            }))
        })
    }


    render(){
        return(
            <div>
                <h2>Listing Customers-{this.state.customers.length}</h2>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th> Name </th>
                            <th> Mobile </th>
                            <th> email </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.customers.map((customer,i)=>{
                                return(
                                    <tr>
                                        <td> {i+1} </td>
                                        <td> {customer.name} </td>
                                        <td> {customer.mobile} </td>
                                        <td> {customer.email} </td>
                                        <td>
                                            <button onClick={()=>{
                                            this.handleRemove(customer._id)
                                            }} className="btn btn-danger">Remove</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {/* <ul>
                    {
                        this.state.customers.map(customer=>{
                            return <li key={customer._id}><Link to={`/customers/${customer._id}`}>{customer.name}</Link>-{customer.email}-{customer.mobile}<Link to={`/customers/${customer._id}`}>show</Link>
                            
                            </li>
                        })
                    }
                </ul> */}

                <Link to="/customers/new" className="btn btn-primary">Add Customer</Link>
            </div>
        )
    }
}

export default CustomersList