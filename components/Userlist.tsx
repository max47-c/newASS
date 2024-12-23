// components/UserList.tsx
import React from 'react';
import {User} from './User';

// interface User {
//   name: string;
//   email: string;
//   subscriptionDate: string;
//   status: 'Active' | 'Inactive';
//   donorStatus: 'Donor' | 'Non-Donor';
// }

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center text-red-600 mb-6">Recently Subscribed Users</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="py-3 px-4">Profile</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Subscription Date</th>
            <th className="py-3 px-4">Donor Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="py-3 px-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                  {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </div>
              </td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.subscriptionDate}</td>
              <td className="py-3 px-4 flex items-center">
                <span className={`w-3 h-3 rounded-full ${user.donorStatus === 'Donor' ? 'bg-green-500' : 'bg-red-500'} mr-1`}></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/manage_user" className="block text-center mt-6 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500">
        View More
      </a>
    </div>
  );
};

export default UserList;
