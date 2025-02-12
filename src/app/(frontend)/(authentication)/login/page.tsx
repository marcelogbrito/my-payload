"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage: React.FC = () => {
    const router = useRouter();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        console.log('Email:', email);
        console.log('Password:', password);

        if (!email || !password) {
            alert('Both email and password are required.');
            return;
        }

        // Call the login action
        const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API}/users/login`, { 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include', //important for cookie handling
            },
         });

         if(!response.ok) {
             alert('Login failed');
             return;
         }
         const result = await response.json();
         router.refresh()
         router.push('/');
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;