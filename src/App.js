import React from 'react'
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'

import Home from "./components/Home"

import Register from "./components/users/Register"
import Login from "./components/users/Login"

import CustomersList from "./components/customers/List"
import CustomerNew from "./components/customers/New"
import CustomerShow from "./components/customers/Show"

import DepartmentList from "./components/Departments/List"

import EmployeeList from "./components/Employees/EmpList"
import EmployeeNew from "./components/Employees/EmpNew"

import TicketList from "./components/Tickets/TicketList"
import TicketNew from "./components/Tickets/TicketNew"


function App(props){
    const handleLogout=()=>{
        localStorage.removeItem("authToken")
        window.location.href="/account/login"
    }
    return(
        <BrowserRouter>
            <div className='container'>
                <h1>Ticket Master</h1>
                <Link to="/">Home</Link>
                {
                    localStorage.getItem("authToken") ? (
                        <div>
                            <Link to="/customers">Customers |</Link>
                            <Link to="/departments">| Departments |</Link>
                            <Link to="/employees">| Employees |</Link>
                            <Link to="/tickets">| Tickets |</Link>

                            <Link to="/account/logout" onClick={handleLogout}>| Logout</Link>
                        </div>
                    ):(
                        <div>
                            <Link to="/account/login">Login</Link>
                            <Link to="/account/register">Register</Link>
                        </div>
                    )
                }
                
                <Switch>
                    <Route path="/" component={Home} exact={true}/>
                    <Route path="/account/register" component={Register}/>
                    <Route path="/account/login" component={Login}/>

                    <Route path="/customers" component={CustomersList} exact={true}/>
                    <Route path="/customers/new" component={CustomerNew}/>
                    <Route path="/customers/:id" component={CustomerShow}/>

                    <Route path="/departments" component={DepartmentList} exact={true}/>

                    <Route path="/employees" component={EmployeeList} exact={true}/>
                    <Route path="/employees/new" component={EmployeeNew}/>

                    <Route path="/tickets" component={TicketList} exact={true}/>
                    <Route path="/tickets/new" component={TicketNew}/>

                    
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App