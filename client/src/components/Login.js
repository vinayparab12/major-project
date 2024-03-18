import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css';
import icons from '../images/Login_image.png';
import { UserContext } from '../App';

const Login = () => {

  const {state,dispatch} = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
  
    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  
    const data = await res.json();
  
    if (data.error) {
      window.alert(data.error);
      handleClear();
    } else {
      dispatch({type:"USER",payload:true});
      window.alert('Login Successfully !!!');
      console.log('Login Successfully !!!');
  
      // Set the cookie here
      document.cookie = `jwtoken=${data.token}; expires=${new Date(Date.now() + 2592000000)}; path=/`;
      
      // Log the cookie to the console
      console.log(document.cookie);
  
      navigate('/');
    }
  };
  

  const handleClear = () => {
    // Clear the form fields
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div
                className="registration-image"
                style={{
                  position: 'relative',
                  border: '2px solid white',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <figure style={{ margin: 0 }}>
                  <img
                    src={icons}
                    alt="registration"
                    className="img-fluid"
                    style={{ maxWidth: '80%', height: 'auto' }}
                  />
                </figure>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="login-form"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '50px',
                }}
              >
                <h2 className="mb-4">User Login</h2>
                <form method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      id="emailid"
                      name="email"
                      autoComplete="off"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="off"
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>

                  <>
                    <button
                      type="submit"
                      className="btn btn-primary mr-2"
                      style={{ color: 'black', marginTop: '10px', marginRight: '5px' }}
                      onClick={loginUser}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClear}
                      style={{ color: 'black', marginTop: '10px' }}
                    >
                      Clear
                    </button>
                  </>
                </form>
                <p className="mt-3">
                  Not registered yet?{' '}
                  <NavLink to="/registration" className="registration-link">
                    Register here!
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
