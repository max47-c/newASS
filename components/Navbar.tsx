import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Dropdown from '@/Components/UserItems';
import { MessageCircleMore } from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import logout from '@/lib/logout';

type UserRole = 'REGULAR' | 'donor' | 'admin';

interface UserData {
  name: string;
  role: UserRole;
  avatar: string;
}

const defaultUser: UserData = {
  name: 'Loading...',
  role: 'REGULAR',
  avatar: '/avatar.png',
};

export default function Navbar() {
  const fetchedUser = useCurrentUser();
  const [user, setUser] = useState<UserData>(defaultUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (fetchedUser) {
      setUser({
        name: fetchedUser.name || 'Anonymous',
        role: (fetchedUser.role || 'REGULAR') as UserRole,
        avatar: fetchedUser.avatar || '/avatar.png',
      });
    }
  }, [fetchedUser]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const dropdownOptions = [
    { label: 'Update Profile ', onClick: () => router.push("/") },
    { label: 'Privacy Policy', onClick: () => alert('Privacy Policy') },
    { label: 'About', onClick: () => alert('About') },
    { label: 'Terms of Service', onClick: () => alert('Terms of Service') },
    { label: 'Logout', onClick: async() => {try {
      await logout();
      setUser(null); // Reset user state after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }} },
  ];

  return (
    <nav className="flex items-center justify-between p-4 relative">
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <MessageCircleMore color="gray" />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="Notification" width={36} height={36} className="rounded-full" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-green-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs leading-3 font-medium">{user.name}</span>
          <span className="text-[10px] text-gray-500">{user.role}</span>
        </div>

        {/* Avatar and Dropdown */}
        <div className="relative">
          <Image
            src={user.avatar}
            alt="user avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          <Dropdown isOpen={dropdownOpen} options={dropdownOptions} onClose={closeDropdown} />
        </div>
      </div>
    </nav>
  );
}
