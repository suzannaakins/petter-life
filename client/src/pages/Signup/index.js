import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import './index.css';

function Signup(props) {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password,
        firstName: formState.firstName, lastName: formState.lastName
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  return (
    <div className="SignupSection">
      <div className="SignupContainer">
        <div className="SignupTitle">Signup</div>
        <form className="SignupCredentials" onSubmit={handleFormSubmit}>
          <div className="SignupUsername">
            <label for="username">username</label>
            <input 
              className="SignupUsernameInputField" 
              name="username" 
              type="input" 
              onChange={handleChange}
            />
          </div>
          <div className="SignupEmail">
            <label for="email">email</label>
            <input className="SignupEmailInputField" name="email" type="email" onChange={handleChange}></input>
          </div>
          <div className="SignupPassword">
            <label for="password">password</label>
            <input 
              className="SignupPasswordInputField" 
              name="password" 
              type="password" 
              onChange={handleChange}
            />
          </div>
        </form> 
        <button className="SignupBtn" type="submit">Submit</button>
        <Link className="LoginLink" to="/login">Log In Instead</Link>
      </div>
    </div>
  );
}

export default Signup;