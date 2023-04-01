import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import {useNavigate, useParams } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { baseURL } from '../lib';



export const ViewScreen = () => {

    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const params = useParams();
    const {id} = params;


    const [task, setTask] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            try {
                const {data} = await axios.get(
                    `${baseURL}/api/tasks/${id}`, 
                    {
                        headers: {authorization: `Bearer ${userInfo.token}`}
                    }
                ); 
                setTask(data);
            }

            catch (err) {
                console.log(err);
            }

        };

        fetchData();

    }, [userInfo]);





    return (
        <div className="viewScreen">
        {
                                        
            <div>

            <h1>Title</h1>
            <div>{task.title}</div>

            <h1>Description</h1>
            <div>{task.description}</div>

            <h1>Due Date</h1>
            <div>{task.dueDate}</div>

            <h1>Priority</h1>
            <div>{task.priority}</div>

            <h1>Status</h1>
            <div>{task.status}</div>
                    
            </div>
                                
        }
                           
        </div>
    )
}