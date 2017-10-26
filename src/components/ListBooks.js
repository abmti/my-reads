import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onClickBtnAdd: PropTypes.func.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {

        const { books } = this.props

        let currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
        let wantToRead = books.filter((book) => book.shelf === 'wantToRead')
        let read = books.filter((book) => book.shelf === 'read')

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <BookShelf title='Currently Reading' books={currentlyReading}
                                   onUpdateBook={this.props.onUpdateBook}/>

                        <BookShelf title='Want to Read' books={wantToRead}
                                   onUpdateBook={this.props.onUpdateBook}/>

                        <BookShelf title='Read' books={read}
                                   onUpdateBook={this.props.onUpdateBook} />

                    </div>
                </div>
                <div className="open-search">
                    <a className='add-book' onClick={this.props.onClickBtnAdd}>Add a book</a>
                </div>
            </div>
        )
    }


}

export default ListBooks
