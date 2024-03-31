import React, { useState,useEffect } from 'react';
import connect from '../assets/connect.png';
import axios from 'axios';
import Select from 'react-select';

// const options =[
//     {value:"datascience",label:'Data Science'},
//     {value:"python",label:'Python A to Z'},
//     {value:"dsa",label:'DSA in Python'},
//     {value:"ai",label:'AI'},
//     {value:"machinelearning",label:'Machine Learning'},
//     {value:"UI/UX",label:'UI/UX Designing'},
//     {value:"webdevelopment",label:'Web Development'}
// ]

export default function Contact(){
    // code for g sheets do not change
    const[msg, setMsg] = useState('')
    const[selectedOptions, setSelectedOptions] = useState([])
    // Hook for JSON data 
    const[userData, setuserData] = useState({
        Name:'',
        Email:'',
        Phone:'',
        CourseRequested:selectedOptions,
    })

    const [courses, setCourses] = useState([]);

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
      }
    };

    fetchData();
  }, []);
    const options = courses.map(course => ({
        value: course._id, // Assuming _id is the product ID in your database
        label: course.title
    }));

    console.log(options)
    // code for handlingChange JSON data 
    function handleChange(e){
        const{name,value} = e.target
        setuserData(prevuserData =>({
            ...prevuserData,
            [name]:value
        }))
    }
    // code for g sheets do not change
    const handleOptions = (selectedOption) =>{
        setSelectedOptions(selectedOption)
        // code for JSON data 
        const selectedValues = selectedOption.map(option => option.value)
        setuserData(prevuserData =>({
            ...prevuserData,
            CourseRequested:selectedValues
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // code for JSON data submission
        console.log(userData)
        // code for g sheets do not change
        const formEle = document.querySelector('form');
        const formData = new FormData(formEle);
        const selectedValues = selectedOptions.map(option => option.value).join(', ')
        formData.append('CourseRequested', selectedValues);
        axios.post('https://script.google.com/macros/s/AKfycbw_Ri9r6WuDhyFi1SUGgKzlMEL_KHb8GMvbugyWNY4Tt5515jV2QxOs7nTj-Udg2Wff/exec', formData)
          .then(response => {
            const message = response.data;
            if (message.startsWith("Your message was successfully sent")) {
              setMsg("Your message was successfully sent!");
            } else {
              setMsg(message);
            }
          })
          .catch(error => {
            setMsg(error);
          });
      };
      
      
    return(
<div>
    {/* Contact Form */}
    <div className="flex items-center justify-center">
        <h1 className="md:text-3xl text-2xl font-medium leading-tight pt-10 mt-20">
            <span className='text-orange font-bold'>Courses Offered</span>
        </h1>
    </div>
    <div className='flex mt-10 items-center justify-center'>
        <p className="md:text-xl font-medium text-gr leading-relaxed md:text-center md:px-20 px-10 mb-10" style={{ lineHeight: '1.8' }}>
            We would love to hear from you! Contact us for inquiries, partnerships, or any questions you may have.<br/> Reach out to us via the contact form below.
        </p>
    </div>
    <div className="flex justify-center">
        {/* Image */}
        <div className="mt-8 mr-6">
            <img src={connect} alt="Connect" className="max-w-md" />
        </div>
        {/* Contact Form */}
        <div className="ml-6">
            <form onSubmit={handleSubmit} className="form items-center mt-4 mb-10 border rounded-xl border-gray-300 bg-gray-100 p-8">
                <div className="mb-4">
                    <div>
                        <label htmlFor="username" className="font-medium text-subheading text-sm">Username</label>
                        <input
                            type="text"
                            name='Name'
                            value={userData.Name}
                            onChange={handleChange}
                            className="block w-96 border border-gray-300 rounded-lg px-4 py-2 mt-1"
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className="font-medium text-subheading text-sm">Email Address</label>
                        <input
                            type="email"
                            name='Email'
                            value={userData.Email}
                            onChange={handleChange}
                            className="block w-96 border border-gray-300 rounded-lg px-4 py-2 mt-1"
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="phone" className="font-medium text-subheading text-sm">Phone Number</label>
                        <input
                            type="phone"
                            name='Phone'
                            value={userData.Phone}
                            onChange={handleChange}
                            className="block w-96 border border-gray-300 rounded-lg px-4 py-2 mt-1"
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="course" className="font-medium text-subheading text-sm">Course Looking for</label>
                        <div style={{width:'100%'}}>
                            <Select 
                                options={options}
                                value ={selectedOptions}
                                onChange = {handleOptions}
                                isMulti ={true}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="bg-orange hover:bg-orange-200 text-white font-medium py-2 px-8 rounded-3xl focus:outline-none mt-4">Update</button>
                </div>
                <span className='text-green font-bold pl-10'>{msg}</span>
            </form>
        </div>
    </div>
</div>

    )
}