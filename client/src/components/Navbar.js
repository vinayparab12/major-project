import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css'; // boostrap package is called 
import { NavLink } from 'react-router-dom'; // Helps to stop the reload of the website with this use className instead of just class
import { UserContext } from '../App';


const Navbar = () =>{

  const {state,dispatch} = useContext(UserContext);


    const RenderMenu = () =>{
        if(state){
            return (
                <>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home<span class="sr-only"></span></NavLink>
                </li>
                
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/getstarted">Interview<span class="sr-only"></span></NavLink>
                </li>
                
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink> 
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">LogOut</NavLink>
                </li>
                </>
            )
        }else{
            return(
                <>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">Home<span class="sr-only"></span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/registration">Registration</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/getstarted">Interview<span class="sr-only"></span></NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink> 
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                </li>      
                <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">LogOut</NavLink>
                </li>       
                </>
            )
        }
    }
  return (
    <>
    {/* The Navbar is added using bootstrap code as below */}
    <nav className="navbar navbar-expand-lg navbar-light background">
        <NavLink className="navbar-brand" to="#">&nbsp;&nbsp;&nbsp;MOCK INTERVIEW</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">  {/* Here this line and above line helps to move the nav bar towards R.H.S. */}
           
            <RenderMenu />     
                
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar; // At the last this line helps to export or transport Navbar wherever it is necessary
