import React from 'react'
import axios from 'axios'

import DepartmentForm from "./Form"

class DepartmentList extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[]
        }
    }

    componentDidMount(){
        axios.get("http://dct-ticket-master.herokuapp.com/departments",{
            headers:{
                "x-auth":localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const departments=response.data
            this.setState({departments})
        })
    }

    handleSubmit=(formData)=>{
        axios.post("http://dct-ticket-master.herokuapp.com/departments",formData,{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            if(response.data.hasOwnProperty("errors")){
                alert(response.data.message)
            }else{
                const departments=response.data
                this.setState(prevState=>({
                    departments:prevState.departments.concat(departments)
                }))
            }
        })
    }

    handleRemove=(id)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}`,{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            this.setState(prevState=>({
                departments:prevState.departments.filter(department=>department._id!==response.data._id)
            }))
        })
    }

    render(){
        return(
            <div className='row'> 
                <div className='col-md-8'>
                    <h1>Listing Department-{this.state.departments.length}</h1>
                    <ul>
                        {
                            this.state.departments.map(department=>{
                                return <li key={department._id}>{department.name}<button onClick={()=>{
                                    this.handleRemove(department._id)
                                }} className="btn btn-danger"> Remove </button></li>
                            })
                        }
                    </ul>
                </div>

                <div className='col-md-4'>
                    <DepartmentForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        )
    }
}

export default DepartmentList