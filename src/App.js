import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function searchLyrics() {
        if (artist === "" || song === "") {
            return;
        }

        const url = `https://api.lyrics.ovh/v1/${artist}/${song}`;
        setLoading(true);
        setError(null); // Reset error message when a new search starts

        Axios.get(url)
            .then(res => {
                setLyrics(res.data.lyrics);
            })
            .catch(error => {
                console.error('Error fetching lyrics:', error);
                setLyrics(""); // Clear existing lyrics
                setError("Sorry, we couldn't find the lyrics. Please try again.");
            })
            .finally(() => {
                setLoading(false); // Reset loading state after request
            });
    }

    return (
        <div className="App">
            <h1>Lyrics Finder</h1>

            <input
                className="inp"
                type="text"
                placeholder="Artist name"
                onChange={(e) => setArtist(e.target.value)}
            />
            <input
                className="inp"
                type="text"
                placeholder="Song name"
                onChange={(e) => setSong(e.target.value)}
            />
            <button className="btn" onClick={searchLyrics}>
                {loading ? 'Loading...' : 'Search'}
            </button>
            <hr />
            
            {/* Show error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Show lyrics */}
            <pre>{lyrics}</pre>
        </div>
    );
}

export default App;
