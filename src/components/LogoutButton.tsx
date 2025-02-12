'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

const LogoutButton: React.FC = () => {
    const router = useRouter();
    const handleLogout = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API}/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        });

        if (!response.ok) {
            alert('Logout failed');
            return;
        }

        const result = response.json();
        console.log('Logout result:', result);

        router.refresh();
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} style={{border: '1px solid #ccc', padding: 10, borderRadius: 10, marginBottom: 16, marginLeft: 16}}>
            Logout
        </button>
    );
};

export default LogoutButton;