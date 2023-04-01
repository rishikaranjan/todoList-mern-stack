import React, { useContext, useState, useEffect } from "react";
import { Store } from "../Store";
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';


export const EditScreen = () => {

    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id} = params;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('1 - High');
    const [status, setStatus] = useState('Not started');

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    }


    const editHandler = async () => {

        try {
            const {data} = await axios.put(
                `${baseURL}/api/tasks/${id}`,
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

    

    useEffect(() => {

        const fetchData = async () => {

            try {
                const {data} = await axios.get(
                    `${baseURL}/api/tasks/${id}`, 
                    {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    }
                ); 
                
                console.log(data);

                setTitle(data.title);
                setDescription(data.description);
                setDueDate(data.dueDate);
                setPriority(data.priority);
                setStatus(data.status);
            }

            catch (err) {
                console.log(err);
            }

        };

        fetchData();

    }, [userInfo]);




    return (

        <div className="editScreen">
            <form>

                <input type='text' placeholder="Title" required defaultValue={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                />

                <input type='text' placeholder="Description" required defaultValue={description}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
                />

                <input type='text' placeholder="Due Date" required defaultValue={dueDate}
                onChange={(e) => {
                    setDueDate(e.target.value);
                }}
                />

                <div>Priority</div>
                <select  name='option' onChange={handlePriorityChange} required defaultValue={priority}>
                    <option value="1 - High">1 - High</option>
                    <option value="2 - Medium">2 - Medium</option>
                    <option value="3 - Low">3 - Low</option>
                </select>

                <div>Status</div>
                <select  name='option' onChange={handleStatusChange} required defaultValue={status}>
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>


                <button onClick={() => {
                    editHandler();
                    navigate('/');
                }}>Update</button>

            </form>
        </div>
    )
}