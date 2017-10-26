import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Book extends Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    onChangeBookShelf = (e) => {
        this.props.onUpdateBook(this.props.book, e.target.value)
    }

    render() {
        const { book } = this.props
        const { title, authors = [], shelf = 'none'} = book
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <Link to={`/books/${book.id}`}>
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        </Link>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.onChangeBookShelf}>
                                <option value="moveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors.length === 0 ? '--' : authors.join(", ")}</div>
                </div>
            </li>
        )
    }

}

export default Book
