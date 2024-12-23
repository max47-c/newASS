import React, { useState } from 'react';

const GuestForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bloodType: '',
        location: '',
        date: '',
        patientName: '',
        urgencyLevel: '',
        hospitalName: '',
        additionalNotes: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResponseMessage("Thank you! Your request has been submitted.");
        setFormData({
            name: '',
            email: '',
            phone: '',
            bloodType: '',
            location: '',
            date: '',
            patientName: '',
            urgencyLevel: '',
            hospitalName: '',
            additionalNotes: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-5">
            <label className="block mb-2 text-secondary">Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-secondary rounded" />

            <label className="block mb-2 mt-4 text-secondary">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border border-secondary rounded" />

            <label className="block mb-2 mt-4 text-secondary">Phone Number:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border border-secondary rounded" />

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

            <label className="block mb-2 mt-4 text-secondary">Patient Name:</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full p-2 border border-secondary rounded" />

            <label className="block mb-2 mt-4 text-secondary">Urgency Level:</label>
            <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange} className="w-full p-2 border border-secondary rounded">
                <option value="">Select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <label className="block mb-2 mt-4 text-secondary">Hospital Name:</label>
            <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} className="w-full p-2 border border-secondary rounded" />

            <label className="block mb-2 mt-4 text-secondary">Additional Notes:</label>
            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="w-full p-2 border border-secondary rounded"></textarea>

            <button type="submit" className="mt-4 w-full p-2 bg-primary text-white rounded hover:bg-red-600">Submit Request</button>
            {responseMessage && <div className="mt-4 text-center text-primary">{responseMessage}</div>}
        </form>
    );
};

export default GuestForm;
