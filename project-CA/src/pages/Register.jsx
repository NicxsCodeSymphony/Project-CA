import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async () => {
        const { username, fullname, password } = formData;
        if (username && fullname && password) {
            try {
                const response = await axios.post('http://localhost/Project-CA/project-CA-api/account.php', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setMessage(response.data.message);
            } catch (error) {
                setMessage('An error occurred during registration.');
                console.error("There was an error registering the user:", error);
            }
        } else {
            setMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="flex justify-center mt-20 h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Register</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                />
                <button
                    onClick={handleRegister}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                >
                    Register
                </button>
                <div className="text-center mt-4">
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out">Already have an account? Login</Link>
                </div>
                {message && <p className={`mt-6 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default Register;
