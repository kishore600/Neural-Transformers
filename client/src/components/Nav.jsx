import { useEffect, useState } from 'react'
import React from 'react'
import Logo from '../assets/logo.png'
import Neural from '../assets/Neural.png'
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const [currentActivePage, setCurrentActivePage] = useState('Home');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user,setUser] = useState(null)
  // const[istrue, setIstrue] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    const data = localStorage.getItem('userInfo')
    if(data){
      setUser(data)
    }else{
      setUser(null)
    }
  })
  const logout = () => {
    console.log("Logout button clicked");
    localStorage.removeItem("userInfo");
    console.log("userInfo removed from localStorage");
    navigate('/');
    console.log("Navigated to the home page");
  };
  let links =[
    {name:"Home", link:"/"},
    {name:"About", link:"/about"},
    {name:"Courses", link:"/courses"},
    {name:"Services", link:"/services"},
    {name:"Products", link:"/product"},
    {name:"Connect", link:"/connect"},
    {name:"Enrolled Courses", link:"/enrolled"}
    
    // {name:"Login", link:"/login"},
  ]

  if (JSON.parse(user)?.isAdmin) {
    // links.push({ name: "Create Course", link: "/create" });
  }
  function navigateHome(){
    setCurrentActivePage('Home');
    navigate('/')
  }
  return (
    <div className="z-10 shadow-md w-full fixed top-0 left-0 ">
      <div className='md:flex items-center justify-between bg-white py-4 md:px-5 px-4'>
        <div className='cursor-pointer flex items-center' onClick={navigateHome}>
          <span className='mr-1 pt-2 md:flex items-center'>
            <img src={Logo} alt="Logo" className="w-9 h-auto pb-2"/>
            <img src={Neural} alt="Logo" className="w-50 h-auto pl-4 pb-2 hidden md:block"/>
          </span>
        </div>
        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all-duration-500 ease-in ${open ? 'shadow-md' : ''} ${open ? 'top-20 opacity-100' : 'top-[-490px]'} `}>
          {
            links.map((link) => (
              <li key={link.name} className='md:ml-8 text-md justify-center mr-4 md:my-0 my-7'>
                <Link to={link.link} className={`font-regular ${
                  currentActivePage === link.name ? 'text-purple' : 'text-black'
                } hover:text-purple focus:text-purple duration-500`}
                onClick={() => setCurrentActivePage(link.name)}>{link.name}</Link>
              </li>
            ))
          }
          {JSON.parse(user)?.isAdmin &&  
            <div className="relative">
            <button 
              className="bg-blue-500 text-black px-4 py-2  rounded focus:outline-none focus:bg-blue-600"
              onClick={toggleDropdown}
            >
              Admin
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                <ul>
                <Link to='/courselist'>
                  <li className="border-b hover:bg-gray-100">
                  Courses
                  </li>
                  </Link>
                  <Link to='/userlist'>
                  <li className="border-b hover:bg-gray-100">
                  Users
                  </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          }
          {
            user ? (
              <div onClick={logout}>
                <Button> Logout </Button>
              </div>
            ) : (
              <div>
                <Link to='/login'>
                  <Button> Login </Button>
                </Link>
              </div>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Nav;


// import { useEffect, useState } from 'react';
// import React from 'react';
// import Logo from '../assets/logo.png';
// import Neural from '../assets/Neural.png';
// import Button from './Button';
// import { Link, useNavigate } from 'react-router-dom';

// const Nav = () => {
//   const [currentActivePage, setCurrentActivePage] = useState('Home');
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const data = localStorage.getItem('userInfo');
//     setUser(data);
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const logout = () => {
//     localStorage.removeItem('userInfo');
//     navigate('/');
//   };

//   const links = [
//     { name: 'Home', link: '/' },
//     { name: 'About', link: '/about' },
//     { name: 'Courses', link: '/courses' },
//     { name: 'Services', link: '/services' },
//     { name: 'Products', link: '/product' },
//     { name: 'Connect', link: '/connect' }
//   ];

//   // if (JSON.parse(user)?.isAdmin) {
//   //   links.push({ name: 'Create Course', link: '/create' });
//   // }

//   function navigateHome() {
//     setCurrentActivePage('Home');
//     navigate('/');
//   }

//   return (
//     <div className="z-10 shadow-md w-full fixed top-0 left-0">
//       <div className="md:flex items-center justify-between bg-white py-4 md:px-5 px-4">
//         <div className="cursor-pointer flex items-center" onClick={navigateHome}>
//           <span className="mr-1 pt-2 md:flex items-center">
//             <img src={Logo} alt="Logo" className="w-9 h-auto pb-2" />
//             <img src={Neural} alt="Logo" className="w-50 h-auto pl-4 pb-2 hidden md:block" />
//           </span>
//         </div>
//         <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
//           <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
//         </div>
//         <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all-duration-500 ease-in ${open ? 'shadow-md' : ''} ${open ? 'top-20 opacity-100' : 'top-[-490px]'}`}>
//           {links.map((link) => (
//             <li key={link.name} className="md:ml-8 text-md justify-center mr-4 md:my-0 my-7">
//               <Link
//                 to={link.link}
//                 className={`font-regular ${currentActivePage === link.name ? 'text-purple' : 'text-black'} hover:text-purple focus:text-purple duration-500`}
//                 onClick={() => setCurrentActivePage(link.name)}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//           {JSON.parse(user)?.isAdmin &&
//             <div className="relative">
//               <button
//                 className="bg-blue-500 text-black px-4 py-2  rounded focus:outline-none focus:bg-blue-600"
//                 onClick={toggleDropdown}
//               >
//                 Admin
//               </button>
//               {isOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
//                   <ul>
//                     <Link to='/courselist'>
//                       <li className="border-b hover:bg-gray-100">Courses</li>
//                     </Link>
//                     <Link to='/userlist'>
//                       <li className="border-b hover:bg-gray-100">Users</li>
//                     </Link>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           }
//           {user ? (
//             <div onClick={logout}>
//               <Button>Logout</Button>
//             </div>
//           ) : (
//             <div>
//               <Link to='/login'>
//                 <Button>Login</Button>
//               </Link>
//             </div>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Nav;
