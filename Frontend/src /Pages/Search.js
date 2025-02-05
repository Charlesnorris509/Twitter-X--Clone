const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`/search?query=${query}`);
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {results.map(result => (
                <p key={result.id}>{result.username || result.content}</p>
            ))}
        </div>
    );
};
