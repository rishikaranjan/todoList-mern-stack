import { Helmet } from "react-helmet-async"
import React, { useState, useContext, useEffect } from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from 'axios';
import {Store} from '../Store';
import { baseURL } from '../lib';


export const SigninScreen = () => {

    const navigate = useNavigate();

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {userInfo} = state;



    const signinHandler = async (e) => {

        e.preventDefault();

        try 
        {

          const { data } = await axios.post(
            `${baseURL}/api/users/signin`, 
          {
            email,
            password,

          });

          ctxDispatch({type: 'USER_SIGNIN', payload: data});
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate('/');

        } 
        
        catch (err) 
        {
            console.log(err);
        }

      };




      useEffect(() => {

        if(userInfo) {
            navigate('/');
        }

      }, [navigate, userInfo]);



      

    return (

        <div className="signinScreen">

            <Helmet> Sign In </Helmet>

            <input type="text" placeholder="Email" 
            onChange = {(event) => {
                setEmail(event.target.value);
            }}/>


            <input type="password" placeholder="Password"
            onChange = {(event) => {
                setPassword(event.target.value);
            }}/>

            <button onClick={signinHandler}>Sign In</button>

            <div>New user?{' '}
              <Link to= '/signup'>Sign Up</Link>
            </div>


        </div>
    )
}