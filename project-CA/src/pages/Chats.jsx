import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Chats = () => {
    const { receiverId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [senderName, setSenderName] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const senderId = localStorage.getItem('users');
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const url = `http://localhost/Project-CA/project-CA-api/chats.php?sender_id=${senderId}&receiver_id=${receiverId}`;
                const response = await axios.get(url);

                if (response.data.length > 0) {
                    // Assuming the first message has valid sender and receiver names
                    setSenderName(response.data[0].sender_name);
                    setReceiverName(response.data[0].receiver_name);
                }

                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [receiverId, senderId]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            try {
                await axios.post('http://localhost/Project-CA/project-CA-api/chats.php', {
                    sender_id: senderId,
                    receiver_id: receiverId,
                    text: input
                });
                // Update the messages list locally
                setMessages([...messages, {
                    chat_id: Date.now(),
                    sender_id: senderId,
                    receiver_id: receiverId,
                    text: input,
                    sender_name: senderName,
                    receiver_name: receiverName
                }]);
                setInput('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg">
            <h1 className="text-xl font-semibold mb-4">Chat with {receiverName}</h1>
            <div className="h-[75vh] overflow-y-scroll border border-gray-300 rounded-lg p-4 mb-4">
                {messages.map((msg) => (
                    <div key={msg.chat_id} className={`mb-2 ${msg.sender_id === senderId ? 'flex justify-end' : 'flex justify-start'}`}>
                        <div className={`max-w-[60%] p-3 rounded-lg ${msg.sender_id === senderId ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'} break-words`}>
                            <strong>{msg.sender_id === senderId ? 'You' : msg.sender_name}:</strong> {msg.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Send
                </button>
            </div>
            <button
                onClick={() => navigate('/chatList')} // Use navigate function from useNavigate
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg"
            >
                Back
            </button>
        </div>
    );
};

export default Chats;
