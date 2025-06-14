import { useState, useEffect } from 'react'

import axios from 'axios';

import './App.css'

const API_BASE_URL = 'http://localhost:5165/api'; // port can be changed

function App() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('books');
    const [error, setError] = useState(null);

    // Fetch books from API
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/books`);
            setBooks(response.data);
        } catch (error) {
            setError('Failed to fetch books: ' + error.message);
            console.error('Error fetching books: ' + error);
        }
    };

    // Fetch authors from API
    const fetchAuthors = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/authors`);
            setAuthors(response.data);
        } catch (error) {
            setError('Failed to fetch authors: ' + error.message);
            console.error('Error fetching authors: ' + error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchBooks(), fetchAuthors()]);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="app">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <div className="error">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>📚 BookStore Management</h1>
                <nav className="tabs">
                    <button
                        className={activeTab === 'books' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('books')}
                    >
                        Books ({books.length})
                    </button>
                    <button
                        className={activeTab === 'authors' ? 'tab active' : 'tab'}
                        onClick={() => setActiveTab('authors')}
                    >
                        Authors ({authors.length})
                    </button>
                </nav>
            </header>

            <main className="main-content">
                {activeTab === 'books' && <BooksView books={books} />}
                {activeTab === 'authors' && <AuthorsView authors={authors} />}
            </main>
        </div>
    );
}

// Books component
function BooksView({ books }) {
    return (
        <div className="books-view">
            <h2>📖 Books Collection</h2>
            {books.length === 0 ? (
                <p className="no-data">No books found.</p>
            ) : (
                <div className="cards-grid">
                    {books.map(book => (
                        <div key={book.id} className="card book-card">
                            <div className="card-header">
                                <h3>{book.title}</h3>
                                <span className="price">${book.price}</span>
                            </div>
                            <div className="card-body">
                                <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
                                <p><strong>Author:</strong> {book.author?.name || 'Unknown'}</p>
                                <p><strong>Published:</strong> {
                                    book.publishedDate
                                        ? new Date(book.publishedDate).toLocaleDateString()
                                        : 'N/A'
                                }</p>
                                {book.author?.email && (
                                    <p><strong>Author Email:</strong> {book.author.email}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function AuthorsView({ authors }) {
    return (
        <div className="authors-view">
            <h2>✍️ Authors Directory</h2>
            {authors.length === 0 ? (
                <p className="no-data">No authors found.</p>
            ) : (
                <div className="cards-grid">
                    {authors.map(author => (
                        <div key={author.id} className="card author-card">
                            <div className="card-header">
                                <h3>{author.name}</h3>
                                <span className="book-count">{author.bookCount} books</span>
                            </div>
                            <div className="card-body">
                                <p><strong>Email:</strong> {author.email || 'N/A'}</p>
                                <p><strong>Joined:</strong> {
                                    new Date(author.createdDate).toLocaleDateString()
                                }</p>

                                {author.books && author.books.length > 0 && (
                                    <div className="author-books">
                                        <h4>Books:</h4>
                                        <ul>
                                            {author.books.map(book => (
                                                <li key={book.id}>
                                                    {book.title} - ${book.price}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App
