import React, { useState } from 'react';

const SubscriberForm: React.FC = () => {
    const [formData, setFormData] = useState({
        bloodType: '',
        location: '',
        date: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponseMessage("Thank you! Your request has been submitted.");
        setFormData({
            bloodType: '',
            location: '',
            date: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <label className="block mb-2 mt-4 text-secondary">Blood Type:</label>
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required className="w-full p-2 border border-secondary rounded">
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
            </select>

            <label className="block mb-2 mt-4 text-secondary">Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-2 border border-secondary rounded" />

            <label className="block mb-2 mt-4 text-secondary">Preferred Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-2 border border-secondary rounded" />

            <button type="submit" className="mt-4 w-full p-2 bg-primary text-white rounded hover:bg-red-600">Submit Request</button>
            {responseMessage && <div className="mt-4 text-center text-primary">{responseMessage}</div>}
        </form>
    );
};

export default SubscriberForm;
