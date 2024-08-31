import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
    const [accounts, setAccounts] = useState([]);
    let currUser = localStorage.getItem('users');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost/Project-CA/project-CA-api/account.php');
                setAccounts(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Filter out the current user from the accounts list
    const filteredAccounts = accounts.filter(account => account.account_id !== currUser);

    const logout = () => {
        localStorage.removeItem('users');
        window.location.reload();
    };

    return (
        <div className="w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-semibold mb-4">Conversations</h1>
            <ul className="list-none p-0">
                {filteredAccounts.map(account => (
                    <li key={account.account_id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                        <Link
                            to={`/chat/${account.account_id}`}
                            className="block p-4 text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {account.fullname}
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                onClick={logout}
                className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default ChatList;
