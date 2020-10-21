import React from'react'

class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            mobile:''
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
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile
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
                        <label htmlFor="email">email</label>
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" id="email" className='form-control'/>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor="number">mobile</label>
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" id="number" className='form-control'/>
                    </div>
                    

                    <input type="submit" className="btn btn-secondary"/>

                </form>
            </div>
        )
    }
}

export default CustomerForm