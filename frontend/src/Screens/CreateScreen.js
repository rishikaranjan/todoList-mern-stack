import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';


export const CreateScreen = () => {

    const navigate = useNavigate();


    const {state} = useContext(Store);
    const {userInfo} = state;




    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('1 - High');
    const [status, setStatus] = useState('Not started');


    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    }



    const createHandler = async () => {

        try {


            const {data} = await axios.post(
                `${baseURL}/api/tasks/`,

                {
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    priority: priority,
                    status: status,
                },
 
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                },

               
            );

        }

        catch(err) {

            console.log(err);
        }

    };



    return (
        <div className="createScreen">

        <form>

            <input type='text' placeholder="Title" required
            onChange={(e) => {
                setTitle(e.target.value);
            }}
            />

            <input type='text' placeholder="Description" required
            onChange={(e) => {
                setDescription(e.target.value);
            }}
            />

            <input type='text' placeholder="Due Date" required
            onChange={(e) => {
                setDueDate(e.target.value);
            }}
            />


            <div>Priority</div>
            <select  name='option' onChange={handlePriorityChange} required>
                <option value="1 - High">1 - High</option>
                <option value="2 - Medium">2 - Medium</option>
                <option value="3 - Low">3 - Low</option>
            </select>


            <button onClick={() => {
                createHandler();
                navigate('/');
            }}>Create</button>

        </form>

        </div>
    )
}