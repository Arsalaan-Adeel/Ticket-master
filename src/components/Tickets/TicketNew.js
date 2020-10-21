import React from 'react'
import TicketForm from './TicketForm'
import axios from 'axios'

class TicketNew extends React.Component {
    handleSubmit = (formData) => {
        axios.post('http://dct-ticket-master.herokuapp.com/tickets', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                console.log(response)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push("tickets")
                }
            })
    }
    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <TicketForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}
export default TicketNew