const Chat = () => {
    const [typingUsers, setTypingUsers] = useState([]);
    const [lastSeen, setLastSeen] = useState({});

    useEffect(() => {
        socket.on('typing', (userId) => {
            setTypingUsers([...typingUsers, userId]);
        });

        socket.on('stopTyping', (userId) => {
            setTypingUsers(typingUsers.filter(user => user !== userId));
        });

        socket.on('updateLastSeen', (userId, timestamp) => {
            setLastSeen({ ...lastSeen, [userId]: timestamp });
        });
    }, []);

    const handleTyping = (userId) => {
        socket.emit('typing', userId);
    };

    const handleStopTyping = (userId) => {
        socket.emit('stopTyping', userId);
    };

    return (
        <div>
            {typingUsers.map(user => (
                <p key={user}>{user} is typing...</p>
            ))}
            {Object.keys(lastSeen).map(user => (
                <p key={user}>{user} was last seen at {lastSeen[user]}</p>
            ))}
            <input
                type="text"
                onKeyPress={() => handleTyping('userId')}
                onBlur={() => handleStopTyping('userId')}
            />
        </div>
    );
};
