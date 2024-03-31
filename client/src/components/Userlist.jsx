import React, { useState,useEffect } from 'react';
import { Divider, Table, Modal, Input, Button } from 'antd';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Select from 'react-select';
import _ from 'lodash';

export default function Userlist() {
    const { Option } = Select;

    const columns = [
        {
            title: 'SNo',
            dataIndex: '_id',
            key: '_id'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt'
        },
        {
            title: 'favCourses',
            dataIndex: 'favCourses',
            key: 'favCourses',
            // render: (favCourses) => (
            //     <Select defaultValue={favCourses[0]} style={{ width: 120 }}>
            //         {favCourses.map(courseId => (
            //             <Option key={courseId} value={courseId}>{courseId}</Option>
            //         ))}
            //     </Select>
            // )
            render: (record) => (
                <span>
                    <Button onClick={() => handleView1(record)} className="action-button border px-5 py-1 text-black mr-2 edit">
                        View Courses
                    </Button>
                </span>
            )
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            key: 'isAdmin',
            render: (text, record) => (
                text ? <span style={{ color: 'green', fontWeight: 'bold' }}>True</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>False</span>
            )
        },
        
        {
            title: 'Action',
            dataIndex: 'action', 
            key: 'action',
            render: (text, record) => (
                <span>
                    <button onClick = {() => handleView(record)} className="action-button border border-blue text-blue px-5 py-1 mr-2 edit">Edit</button>
                    <button onClick={() => deleteUser(record._id)} className="action-button border border-red text-red px-5 py-1 delete">Delete</button>
                </span>
            )
        }
    ];

    const deleteUser = async (userId) => {
        try {
            const userInfoJSON = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoJSON);
            const { token } = userInfo;
            const JWTtoken = token;
    
            const config = {
                headers: {
                    Authorization: `Bearer ${JWTtoken}`,
                },
            };
    
            const response = await axios.delete(`http://localhost:5000/user/${userId}`, config);
    
            if (response.status === 200) {
                toast.success("User deleted successfully!");
                fetching(); // Fetch the updated user list
            } else {
                toast.error("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error.message);
            toast.error("Failed to delete user.");
        }
    };

    const [table, setTable] = useState([]);
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [editedRow, setEditedRow] = useState(null);
    const [isAdminValue, setIsAdminValue] = useState(false);
    const [favCour,setFavCour] = useState([{}])
    const [viewFavCour,setViewFavCour] = useState([{}])
    const[selectedOptions, setSelectedOptions] = useState([])

    const [courses, setCourses] = useState([]);

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
      }
    };
    useEffect(() => {

      fetchData();

        // console.log(selectedOptions);
        
    }, []);
    const options = courses.map(course => ({
        value: course._id, // Assuming _id is the product ID in your database
        label: course.title
    }));

    useEffect(() => {
        if (editedRow) {
             setSelectedOptions(
                editedRow.favCourses.map(courseId => ({
                    value: courseId._id,
                    label: courseId.title
                }))
            );
        } else {
            setSelectedOptions([]); 
        }
    }, [editedRow]);

    const fetching = async () => {
        try {
          const userInfoJSON = localStorage.getItem('userInfo');
          const userInfo = JSON.parse(userInfoJSON);
          const { token } = userInfo;
          const JWTtoken = token;
          console.log(token);
          const config = {
            headers: {
              Authorization: 'Bearer ' + JWTtoken,
            },
          };
          const response = await axios.get('http://localhost:5000/user', config);
          setTable(response.data);
        } catch (error) {
          console.log(error.message);
        }
      };
    
      React.useEffect(() => {
        fetching();
      }, []);

    const handleView = (record) =>{
        setEditedRow({...record})
        setVisible(true)
    }
    const handleView1 = (record) => {
        console.log(record);
        // if (Array.isArray(record.favCourses)) {
            setFavCour(record.favCourses);
            setViewFavCour(record)
            setVisible1(true);
        // } else {
        //     console.error("favCourses is not an array");
        // }
    }

    const handleClose = () =>{
        setVisible(false)
    }
    const handleClose1 = () =>{
        setVisible1(false)
    }
    
    const handleOptions = (selectedOption) => {
        setSelectedOptions(selectedOption);
        
    };       
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRow(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfoJSON = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoJSON);
            const { token } = userInfo;
            const JWTtoken = token;
    
            const config = {
                headers: {
                    Authorization: `Bearer ${JWTtoken}`,
                },
            };
    
            const selectedOptionValues = selectedOptions.map(option => option.value).filter(Boolean);

            editedRow.favCourses = selectedOptionValues;

            console.log(editedRow)
    
    
            const registerResponse = await axios.put(`http://localhost:5000/user/${editedRow._id}`, editedRow, config);
            console.log(registerResponse);
            toast.success("User Updated successfully!");
            fetching();
            setVisible(false);
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };
    

    // const filteredOptions = options.filter(option => !selectedOptions.some(selected => selected.value === option.value));

    return (
        <div className="flex flex-col min-h-screen">
        <div className='mt-32'>
    <div className='flex justify-between'>
        <div className="font-semibold text-2xl text-subtitle ml-12">
            <h1 className='user-select-none'>User Info</h1>
        </div>
        <Link to ='/createuser'>
        <button className='border px-2 text-green mr-5'>+ Add New</button>
        </Link>
    </div>
            <div>
            <div className="flex-grow overflow-y-auto ml-12">
                <Divider />
                <Table
                    columns={columns}
                    dataSource={table.map(item => ({
                        key: item._id,
                        _id: item._id,
                        username: item.username,
                        email: item.email,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                        favCourses : item.favCourses,
                        isAdmin: item.isAdmin 
                        // ? <span style={{ color: 'green', fontWeight: 'bold' }}>True</span> : <span style={{ color: 'red', fontWeight: 'bold' }}>False</span> 
                    }))}
                />
                <Modal
                    title="User Courses"
                    visible={visible1}
                    onCancel={handleClose1}
                    footer={[
                        <Button key="cancel" onClick={handleClose1}>
                            Close
                        </Button>
                    ]}
                >
                    {viewFavCour?.length ?  
                        viewFavCour?.map((course, index) => (
                            <div className='bg-purple p-5 mt-4' key={index}>
                                <p className='text-center text-xl mb-5 text-white'>Title : {course.title}</p>
                                <p className='text-center text-white'>ID : {course._id}</p>
                            </div>
                        ))
                        : <h1>No courses Selected</h1>
                    }


                </Modal>
                
                <Modal
                    title="Edit Details"
                    visible={visible}
                    onCancel={handleClose}
                    footer={[
                        <Button key="cancel" onClick={handleClose}>
                            Cancel
                        </Button>,
                        // <Button key="submit" type="primary" style={{ backgroundColor: 'blue', borderColor: 'blue' }} > 
                        //     Save
                        // </Button>
                    ]}
                >
                   {editedRow &&  ( 
                    
                <form onSubmit={handleSubmit} className="w-full p-8 border border-gray-300 rounded-md shadow-lg mt-8">
                <h1 className="text-2xl font-semibold text-center mb-6">Add User</h1>
                <div className="flex mb-6">
                    <div className="w-1/2 mr-4">
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            value={editedRow.username}
                            onChange={handleInputChange}
                            placeholder='Username'
                            name='username'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            value={editedRow.email}
                            onChange={handleInputChange}
                            placeholder='Email'
                            name='email'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                        />
                    </div>
                </div>
                    <div className="w-[300px]">
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            value={editedRow.password}
                            onChange={handleInputChange}
                            placeholder='Password'
                            name='password'
                            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-4"
                        />
                    </div>
                    <div className='mt-3' style={{ width: '100%' }}>
    <label htmlFor="course" className="font-medium text-subheading text-sm">Add Course or Edit Course</label>
    <div style={{ width: '100%' }}>
        <Select 
            options={options} // Use filteredOptions instead of options
            value={selectedOptions}
            onChange={handleOptions}
            isMulti={true}
            className="w-[300px]" // Apply custom class name to set a specific width
            style={{ width: '100%' }} // Apply inline style to ensure full width
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
        checked={editedRow?.isAdmin === true} // Check if isAdmin is true
        onChange={() => setEditedRow(prevUsers => ({ ...prevUsers, isAdmin: true }))}
    />
    <label htmlFor="true"> Yes</label>
    <br />
    <input
        type="radio"
        id="false"
        name="isAdmin"
        className="mr-2"
        checked={editedRow?.isAdmin === false} // Check if isAdmin is false
        onChange={() => setEditedRow(prevUsers => ({ ...prevUsers, isAdmin: false }))}
    />
    <label htmlFor="false"> No</label>
</fieldset>


                <button
                    type="submit"
                    // onClick={handleClose} 
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange hover:bg-orangeshade focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange"
                >
                    Submit
                </button>
            </form>
                )}
                </Modal>   
                </div> 
            </div>
        </div>
        </div>
    );
}

