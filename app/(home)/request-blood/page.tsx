"use client"
// components/DonationForm.tsx
import React, { useState } from 'react';
import GuestForm from '../../components/GuestForm';
import SubscriberForm from '../../components/dashboard/user/SubscriberForm';

const RequestBlood: React.FC = () => {
    const [isSubscriber, setIsSubscriber] = useState(false);

    return (
        <div className="max-w-lg mx-auto p-5 bg-background shadow-md rounded-lg">
            <h1 className="text-2xl font-bold text-center text-primary">Blood Request Form</h1>
            <div className="mt-5">
                <button onClick={() => setIsSubscriber(false)} className={`w-1/2 p-2 ${!isSubscriber ? 'bg-primary text-white' : 'bg-secondary text-black'}`}>Guest</button>
                <button onClick={() => setIsSubscriber(true)} className={`w-1/2 p-2 ${isSubscriber ? 'bg-primary text-white' : 'bg-secondary text-black'}`}>Subscriber</button>
            </div>
            {isSubscriber ? <SubscriberForm /> : <GuestForm />}
        </div>
    );
};

export default RequestBlood;
