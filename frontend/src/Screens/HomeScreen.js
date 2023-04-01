import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Navbar} from '../Components/Navbar'
import { baseURL } from '../lib';



export const HomeScreen = () => {

    const navigate = useNavigate();

    const {state} = useContext(Store);
    const {userInfo} = state;

    const [tasks, setTasks] = useState([]);
    const [sortType, setSortType] = useState('None');


    const handleSortChange = (event) => {
        setSortType(event.target.value);
    }


    const sortData = [...tasks].sort((a, b) => {

        switch(sortType) {

            case 'Priority':
                return a.priority > b.priority ? 1 : -1;
                break;

            case 'Status':
                return a.status > b.status ? 1 : -1;
                break;

            case 'Due Date':
                return a.dueDate > b.dueDate ? 1 : -1;
                break;

            case 'None':
                return a.updatedAt < b.updatedAt ? 1 : -1;
                break;
        }
    });

    const deleteHandler = async (id) => {
        try {

            await axios.delete(
                `${baseURL}/api/tasks/${id}`,
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                }
            );
            fetchData();
        }

        catch(err) {
            console.log(err);
        }
    };


    const fetchData = async () => {

        try {
            const {data} = await axios.get(
                `${baseURL}/api/tasks/`, 
                {
                    headers: {authorization: `Bearer ${userInfo.token}`}
                }
            ); 
            setTasks(data);
        }

        catch (err) {
            console.log(err);
        }

    };



    useEffect(() => {

            fetchData();

    }, [userInfo]);





    return (
        <div className="homeScreen">

            <Navbar/>

            <div className="sortTask">

                <button onClick={() => {
                    navigate('/create');
                }}>Create</button>


                <h1>Sort by:</h1>
                <select  name='option' onChange={handleSortChange}>
                    <option value="None">None</option>
                    <option value="Due Date">Due Date</option>
                    <option value="Priority">Priority</option>
                    <option value="Status">Status</option>
                </select>

            </div>
     
      
            {
            userInfo && 
            (
            <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>

            <tbody>
            {
            sortData.map((task) => (

                <tr>

                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td><button onClick={() => {
                navigate(`/${task._id}`);
                }}>View</button></td>

                <td><button onClick={() => {
                navigate(`/edit/${task._id}`);
                }}>Edit</button></td>

                <td><button onClick={() => {
                deleteHandler(task._id);
                }}>Delete</button></td>

                </tr>

            ))
            }
            </tbody>
            </table>

            )
            }
         
        </div>
    )
}