import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
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

    const handleLogin = async () => {
        const { username, password } = formData;
        if (username && password) {
            try {
                const response = await axios.post('http://localhost/Project-CA/project-CA-api/auth.php', {
                    username,
                    password
                });

                if (response.data.status === 1) {
                    setMessage('Login successful!');
                    localStorage.setItem('users', response.data.id);
                    window.location.reload();
                } else {
                    setMessage('Invalid username or password.');
                }
            } catch (error) {
                console.error("Error during login:", error);
                setMessage('Login failed due to an error.');
            }
        } else {
            setMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="flex mt-20 justify-center h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Login</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
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
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                >
                    Login
                </button>
                <div className="text-center mt-4">
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out">Create an account</Link>
                </div>
                {message && <p className={`mt-6 text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default Login;
