import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import styled from "styled-components";
import { Link } from 'react-router-dom'

import { plus } from '../utils/Icons';
import Buttons from "../Components/Buttons/Button";

const Login = () => {
    const {login, error, isLoading} = useLogin()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
    }

    return (
        <FormStyled className="signup" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <div className="input-control">
            <label>Username:</label>
            <input 
            type="username" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
            </div>

            <div className="input-control">
            <label>Password:</label>
            <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            </div>

            <div className="submit-btn">
            <Buttons 
                    name={'Login'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    disabled={isLoading}
                />
                </div>
                <div className="links">
                <h5>Don't have an account?</h5>
              <Link to="/signup">SignUp</Link>
              
            </div>
            {error && <div className="error">{error} </div>}
            </FormStyled>
    )
}

const FormStyled = styled.form`
 max-width: 450px;
  margin: 100px auto; /* Centers the form and adds top margin */
  padding: 45px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    color: #333;
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .input-control {
    margin-bottom: 1.2rem;
    
    label {
      display: block;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #444;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border-radius: 5px;
      border: 1px solid #ccc;
      background: #f9f9f9;
      font-size: 1rem;
      color: #333;
      transition: all 0.3s ease;

      &:hover, &:focus {
        border-color: #007bff;
        background: #fff;
        box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.2);
      }
    }
  }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
            margin: 1rem;
        }
    }

    .links {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    a {
      text-decoration: none;
      color: var(--color-accent);
      font-weight: 500;
      font-size: 1.1rem;
      margin-left: 0.5rem;

      &:hover {
        text-decoration: underline;
      }
    }
    }

  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
`;

export default Login