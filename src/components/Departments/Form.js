import React from 'react'

class DepartmentForm extends React.Component{

    constructor(){
        super()
        this.state={
            name:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name
        }
        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="department">Name</label>
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" id="department" className='form-control'/>
                    </div>
                    
                    <input type="submit" value="Add Department" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default DepartmentForm