import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
const Createusers = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState({
        username: '',
        email: '',
        password: '',
        favCourses: [],
        isAdmin: '',
    });
    const [courses, setCourses] = useState([]);
    const[error,setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/course/');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCourses(data);
          } catch (error) {
            console.error('Error fetching data:', error.message);
            toast.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
      }, []);

    const options = courses.map(course => ({
        value: course._id,
        label: course.title
    }));

    console.log(options)
    
    const [selectedOptions, setSelectedOptions] = useState([]);

    function handleChange(e) {
        const { value, name } = e.target;
        setUsers(prevUsers => ({
            ...prevUsers,
            [name]: value
        }));
    }

    function handleOptions(selectedOption) {
        const selectedValues = selectedOption.map(option => option.value);
        setSelectedOptions(selectedOption);
        setUsers(prevUsers => ({
            ...prevUsers,
            favCourses: selectedValues
        }));
    }

    const handleSubmit  = async (event) => {
        event.preventDefault();
    try {

        // Handle user registration
        const userInfoJSON = localStorage.getItem('userInfo');
        const userInfo = JSON.parse(userInfoJSON);
        const { token } = userInfo;
        const JWTtoken = token;
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${JWTtoken}`,
            },
        };

        console.log(users)
        const registerResponse = await axios.post(`http://localhost:5000/auth/register`, users, config)
        console.log(registerResponse)
        toast.success("User added successfully!");
        } catch (error) {
            setError(error.message);
            toast.error(error);
        }
        
        navigate('/userlist')
        console.log(users);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 border border-gray-300 rounded-md shadow-lg mt-8">
                <h1 className="text-2xl font-semibold text-center mb-6">Add User</h1>
                <div className="flex mb-6">
                    <div className="w-1/2 mr-4">
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            value={users.username}
                            onChange={handleChange}
                            placeholder='Username'
                            name='username'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            value={users.email}
                            onChange={handleChange}
                            placeholder='Email'
                            name='email'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                            required
                        />
                    </div>
                </div>
                <div className="flex mb-6">
                    <div className="w-1/2 mr-4">
                        <label htmlFor='password'>Create Password</label>
                        <input
                            type='password'
                            value={users.password}
                            onChange={handleChange}
                            placeholder='Password'
                            name='password'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor='courses'>Select Courses</label>
                        <Select
                            options={options}
                            value={selectedOptions}
                            onChange={handleOptions}
                            isMulti={true}
                            className="block w-full"
                        />
                    </div>
                </div>
                <fieldset className="mb-6">
                    <legend className="text-lg font-medium">Make Admin?</legend>
                    <input
                        type="radio"
                        id="true"
                        name="isAdmin"
                        className="mr-2"
                        onChange={() => setUsers(prevUsers => ({ ...prevUsers, isAdmin: true }))}
                    />
                    <label htmlFor="true"> Yes</label>
                    <br />
                    <input
                        type="radio"
                        id="false"
                        name="isAdmin"
                        className="mr-2"
                        onChange={() => setUsers(prevUsers => ({ ...prevUsers, isAdmin: false }))}
                    />
                    <label htmlFor="false"> No</label>
                </fieldset>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange hover:bg-orangeshade focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Createusers;
