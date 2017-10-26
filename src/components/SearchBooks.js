import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import Book from './Book'

class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateQuerySearchBooks: PropTypes.func.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.props.onUpdateQuerySearchBooks(query)
    }

    render() {
        const { books, searching, query } = this.props.data
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" placeholder="search by title or author"
                               value={query}
                               onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">

                    {searching && (
                        <ReactLoading type="spinningBubbles" color="#444" delay={0} />
                    )}

                    {!searching && (
                        books && books.length? (
                            <ol className="books-grid">
                                {books.map((book) => (
                                    <Book key={book.id} book={book} onUpdateBook={this.props.onUpdateBook} />
                                ))}
                            </ol>
                        ) : (
                        <div>Nothing to show here.</div>
                        )
                    )}

                </div>
            </div>
        )
    }

}

export default SearchBooks
