import { useState } from "react";

import { Link } from 'react-router-dom'
import styled from "styled-components";

import { plus } from '../utils/Icons';
import Buttons from "../Components/Buttons/Button";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(username, email, password)
    }

    return (
        <FormStyled className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="input-control">
            <label>Username:</label>
            <input 
            type="username" 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            />
            </div>

            <div className="input-control">
            <label>Email:</label>
            <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
                    name={'Sign Up'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    disabled={isLoading}
                />
                </div>
                <div className="links">
              <Link to="/login">Login</Link>
            </div>
            {error && <div className="error">{error} </div>}
            </FormStyled>
    )
}

const FormStyled = styled.form`
  max-width: 550px;
  margin: auto;
  padding: 45px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  input, textarea{
        margin: .5rem;
        max-width: 500px;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: #e8f0fe;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
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
    .links{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    a{
        text-decoration: none;
        color: var(--color-accent);
        font-weight: 500;
        font-size: 1.1rem;
        margin-left: .5rem;
        &:hover{
            text-decoration: underline;
        }
    }
    }
`;

export default Signup