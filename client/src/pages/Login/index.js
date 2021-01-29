import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/mutations"
import Auth from "../../utils/auth";
import './index.css';

function Login(props) {
  const [formState, setFormState] = useState({ username: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { username: formState.username, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div className="LoginSection">
      <div className="LoginContainer">
        <div className="LoginTitle">Login</div>
        <form className="LoginCredentials" onSubmit={handleFormSubmit}>
          <div className="LoginUsername">
            <label for="username">username</label>
            <input 
              className="LoginUsernameInputField" 
              id="username" 
              name="username" 
              type="input" 
              onChange={handleChange}
            />
          </div>
          <div className="LoginPassword">
            <label for="password">password</label>
            <input 
              className="LoginPasswordInputField" 
              id="pwd" 
              name="password" 
              type="password" 
              onChange={handleChange} 
            />
          </div>
          <button className="LoginBtn" type="submit">Login</button>
          <Link className="SignupLink" to="/signup">Signup Instead</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;