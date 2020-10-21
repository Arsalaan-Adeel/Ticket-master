import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }

    componentDidMount(){
        axios.get("http://dct-ticket-master.herokuapp.com/employees",{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty("errors")){
                alert(response.data.message)
            }else{
                const employees=response.data
                this.setState({employees})
            }
        })
        
    }

    
    handleRemove=(id)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`,{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })

        .then(response=>{
            this.setState(prevState=>({
                employees:prevState.employees.filter(employee=>employee._id!==response.data._id)
            }))
        })
    }

    render(){
        return(
            <div>
                <h1>Listing Employees-{this.state.employees.length}</h1>
                <ul>
                    {
                        this.state.employees.map(employee=>{
                        return <li key={employee._id}>{employee._id}-{employee.name}-{employee.email}-{employee.mobile}-{employee.department.name} <button onClick={()=>{
                            this.handleRemove(employee._id)
                        }} className="btn btn-danger">Remove</button></li>
                        })
                    }
                </ul>

                <Link to="/employees/new" className="btn btn-primary">Add Employee</Link>
            </div>
        )
    }
}

export default EmployeeList