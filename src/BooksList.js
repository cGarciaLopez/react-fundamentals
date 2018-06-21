import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BooksList extends Component {

  render(){

    return(
      <ol className="books-grid">
       {
         this.props.books.length !== undefined ? (
           this.props.books.map(book =>
           <li  key={book.id}>
             <div className="book">
               <div className="book-top">
                 <div className="book-cover" style={{width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                 <div className="book-shelf-changer">
                     <select onChange={(evt)=>this.props.onChangeShelving(book,evt)}>
                       <option value="none" disabled>Move to...</option>

                       {'currentlyReading'===book.shelf ? (
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
                       <option value="none" >None</option>
                     </select>
               </div>
               </div>
               <div className="book-title">{book.title}. {book.subtitle}</div>
               <div className="book-authors">{book.authors}</div>
             </div>
          </li>
         )
) : (
      <li>There are no books matching your query</li>
)

     }
      </ol>
    )
  }

}
export default BooksList;
