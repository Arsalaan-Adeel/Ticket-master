import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class TicketList extends React.Component {
    constructor() {
        super()
        this.state = {
            tickets: []
        }
    }
    componentDidMount() {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response => {
                const tickets = response.data
                this.setState({ tickets })
            }))
    }
    handleRemove = (id) => {
        axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response => {
                this.setState((prevState => ({
                    tickets: prevState.tickets.filter(tkt => tkt._id !== response.data._id)
                })))
            })
    }
    render() {
        return (
            <div>
                <h2>Listing Tickets - {this.state.tickets.length}</h2>
                <ul>
                    {this.state.tickets.map(tkt => {
                        return <li key={tkt._id}>
                            <Link to={`/tickets/${tkt._id}`}>{tkt.code}</Link>{tkt.message}-{tkt.priority}
                            <Link to={`/tickets/${tkt._id}`}>Show</Link>
                            <button onClick={() => {
                                this.handleRemove(tkt._id)
                            }}>remove</button>
                        </li>
                    })}
                </ul>
                <Link to="/tickets/new">Add Ticket</Link>
            </div>
        )
    }
}
export default TicketList