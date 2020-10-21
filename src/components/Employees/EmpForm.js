import React from 'react'
import axios from 'axios'

class EmployeeForm extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            email:'',
            mobile:'',
            departments:[],
            department: ''
        }
    }

    componentDidMount(){
        axios.get(`http://dct-ticket-master.herokuapp.com/employees`,{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const employees=response.data
            this.setState({employees})
        })


        axios.get("http://dct-ticket-master.herokuapp.com/departments",{
            headers:{
                "x-auth":localStorage.getItem("authToken")
            }
        })
        .then(response=>{
            const departments=response.data
            console.log(departments)
            this.setState({departments})
        })
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleDepartmentChange=(e)=>{
        this.setState({
            department:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            department:this.state.department
        }

        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" id="name" className='form-control'/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" id="email" className='form-control'/>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" id="email" className='form-control'/>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" id="mobile" className='form-control'/>
                    </div>

                    <select onChange={this.handleDepartmentChange}>
                        <option>Department</option>
                        {
                            this.state.departments.map(department=>{
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        }
                        
                    </select>
                    <br/>
                    <input type="submit" value="Add Employee" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default EmployeeForm