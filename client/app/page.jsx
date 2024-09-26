'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './globals.css';
import Signup from './components/Signup/page';
import Login from './components/Login/page';

const Home = () => {
    const [showSignup, setShowSignup] = useState(false);  // State to manage the signup visibility
    const [showSignin, setShowSignin] = useState(false); // State to manage the signin visibility
    const signupRef = useRef(null);  // Ref to track the signup component
    const signinRef = useRef(null); // Ref to track the login component

    // Function to handle the signup button click
    const handleSignupClick = () => {
        setShowSignup(true);  // Show the signup component
        setShowSignin(false); // Ensure login component is hidden
    };

    // Function to handle the signin button click
    const handleSigninClick = () => {
        setShowSignin(true); // Show the login component
        setShowSignup(false); // Ensure signup component is hidden
    };

    // Function to handle clicks outside the signup/login components
    const handleOutsideClick = (event) => {
        if (signupRef.current && !signupRef.current.contains(event.target)) {
            setShowSignup(false);  // Hide the signup component if clicked outside
        }
        if (signinRef.current && !signinRef.current.contains(event.target)) {
            setShowSignin(false); // Hide the login component if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showSignup, showSignin]);

    return (
        <main className='flex flex-row h-full w-full relative'>
            {/* Signup component container */}
            <div 
                ref={signupRef}  // Attach ref to signup div
                className={`signup z-20 absolute top-10 left-1/4 m-6 p-5 w-7/12 h-5/6 transition-opacity duration-500 ease-in-out 
                ${showSignup ? 'opacity-100 visible' : 'opacity-0 invisible'}`} // Transition for visibility
            >
                <Signup /> {/* Signup component */}
            </div>

            {/* Login component container */}
            <div 
                ref={signinRef}  // Attach ref to signin div
                className={`signin z-20 absolute top-10 left-1/4 m-6 p-5 w-7/12 h-5/6 transition-opacity duration-500 ease-in-out 
                ${showSignin ? 'opacity-100 visible' : 'opacity-0 invisible'}`} // Transition for visibility
            >
                <Login /> {/* Login component */}
            </div>

            {/* Left section */}
            <div className={`left h-screen w-3/6 bg-black font-inconsolata transition-all duration-300 
                ${showSignin || showSignup ? 'blur-sm' : ''}`}> {/* Blur effect when signup or signin is visible */}
                <div className="nav w-full h-auto flex justify-end">
                    <Image
                        src="/assets/icons/logo.svg"
                        width={76}
                        height={76}
                        alt="logo"
                        className='object-contain'
                    />
                </div>

                <div className="title pl-10 flex justify-evenly flex-col">
                    <div>
                        <h1 className='text-8xl'>
                            <span className='text-blue-800'>Collab</span>
                            <span className='text-yellow-300'>Nest</span>
                        </h1>
                        <br />
                        <h2 className='text-4xl'>Where ideas hatch <br /> into startups...</h2>
                    </div>

                    <div className="bttn flex space-x-6 mt-10">
                        <button className="w-24 h-10 rounded-xl bg-blue-700" onClick={handleSigninClick}>Log in</button>
                        <button className="w-24 h-10 rounded-xl bg-blue-700" onClick={handleSignupClick}>
                            Sign up
                        </button> {/* Handle signup button click */}
                    </div>

                    <div className="last mt-5 pt-20">
                        <h1 className='text-yellow-300 text-3xl'>Welcome ideator!!</h1>
                        <p className='flex flex-wrap text-3xl'>Your journey starts here. Discover co-founders, share ideas, and build the future. Together, let’s create something amazing</p>
                    </div>
                </div>
            </div>

            {/* Right section */}
            <div className={`right h-screen w-1/2 relative transition-all duration-300 
                ${showSignup || showSignin ? 'blur-sm' : ''}`}> {/* Blur effect when signup or signin is visible */}
                <Image
                    src="/assets/img/landingPage.svg"
                    layout='fill'
                    objectFit='cover' // Ensures the image covers the container without distortion
                    className='h-full w-full'
                    alt='img'
                />
            </div>
        </main>
    );
};

export default Home;
