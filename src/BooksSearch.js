import React, {Component} from 'react';
// import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

class BooksSearch extends Component {

  render(){
      return(
        <div className="search-books">
          <div className="search-books-bar">

            <Link to='/' className="close-search" onClick={this.props.onBack} >Close</Link>

            <div className="search-books-ut-wrapper">
                {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" id="search-input" onKeyUp={(evt) => this.props.onSearch(evt)} placeholder="Search by title or author"/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {
              (this.props.books.length !== undefined
                && this.props.books.length > 0) ? (
                this.props.books.map(book =>
                    <li  key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                          <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={(evt)=>this.props.onChangeShelving(book,evt)}>
                                <option value="none" disabled>Move to...</option>
                                {('currentlyReading'==book.shelf ) ? (
                                  <option value="currentlyReading" selected>Currently Reading</option>
                                ) : (
                                  <option value="currentlyReading">Currently Reading</option>
                                )}

                                {'wantToRead'===book.shelf ? (
                                  <option value="wantToRead" selected>Want to Read</option>
                                ) : (
                                  <option value="wantToRead" >Want to Read</option>
                                )}

                                {'read'===book.shelf ? (
                                  <option value="read" selected>Read</option>
                                ) : (
                                  <option value="read" >Read</option>
                                )}
                                <option value="none" selected>None</option>
                              </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}. {book.subtitle}</div>
                        <div className="book-authors">{book.authors}</div>
                        <div className="book-authors">{book.shelf}</div>
                      </div>
                   </li>
                 )
               ): (
                   <li>There are no books matching your query</li>
                 )
               }

            </ol>
          </div>
        </div>
      )
  }
}

export default BooksSearch;
