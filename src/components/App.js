import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from '../utils/BooksAPI'

import '../App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import DetailBook from './DetailBook'

class BooksApp extends React.Component {

    state = {
        books: [],
        searchBooks: {
            searching: false,
            query: '',
            books: []
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(resp => {
            book.shelf = shelf
            this.setState(state => ({
                books: state.books.filter((b) => b.id !== book.id).concat([book])
            }))
        })
    }

    searchBooks = (query) => {
        this.setState(state => ({
            searchBooks: { ...state.searchBooks, searching: true }
        }))
        BooksAPI.search(query, 20).then((books) => {
            var serchedsBooks = []
            if (Array.isArray(books)) {
                serchedsBooks = books
            }
            this.setState(state => ({
                searchBooks: { ...state.searchBooks, books: serchedsBooks, searching: false }
            }))
        })
    }

    updateQuerySearchBooks = (query) => {
        this.setState(state => ({
            searchBooks: { ...state.searchBooks, query: query.trim() }
        }))
        if (query !== '') {
            this.searchBooks(query)
        } else {
            this.setState(state => ({
                searchBooks: { ...state.searchBooks, books: [], searching: false }
            }))
        }
    }

    clearSearchBooks() {
        this.setState(state => ({
            searchBooks: { query: '', books: [], searching: false }
        }))
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={({ history }) => (
                    <ListBooks books={this.state.books}
                               onClickBtnAdd={() => {
                                   this.clearSearchBooks()
                                   history.push('/search')
                               }}
                               onUpdateBook={this.updateBook} />
                )}/>
                <Route path='/search' render={() => (
                    <SearchBooks data={this.state.searchBooks}
                                 onUpdateQuerySearchBooks={this.updateQuerySearchBooks}
                                 onUpdateBook={this.updateBook} />
                )} />
                <Route path='/books/:id' render={(props) => (
                    <DetailBook {...props} onUpdateBook={this.updateBook} />
                )} />

            </div>
        )
    }

}

export default BooksApp
