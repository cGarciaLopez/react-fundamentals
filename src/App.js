import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import BooksList from './BooksList';
import BooksSearch from './BooksSearch';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {

  state = {
    booksList : [ ],
    searchStr: ""
  }

  // Implementamos el ciclo de vida de React.
  componentDidMount(){
    this.listMyBooks();
  }

  flagSearching = false;

  /**
  * Cambio de estado de un libro.
  */
  changeShelving = (book,evt) => {
    book.shelf=evt.currentTarget.value;
    BooksAPI.update(book,evt.currentTarget.value);
    this.setState((state) => {
      booksList: state.booksList.filter((b) => b.id !== book.id)
    })
  }
  /******
  * Búsqueda de libros. Construye la query con el input de busueda y la tecla presionada
  */

  searchBook = (evt) => {

    let _searchStr = evt.currentTarget.value;
    this.setState((state) =>
      {searchStr: state.searchStr + _searchStr}
    );
    let _input = document.getElementById('search-input');

  if ( !this.flagSearching ){
    this.flagSearching = true;

    // Resultado de la busqueda
    if(_searchStr.length > 0){
      BooksAPI.search(_searchStr,30).then((rtBooks) => {
        // Set Shelves.
        if(rtBooks.error === undefined){
          this.putShelf(rtBooks)
        } else {
          this.setState({booksList:[]})
        }
        this.flagSearching = false;
      })

    } else {
      this.setState({booksList:[]});
      _input.placeholder = "Search by title or author";
      this.flagSearching = false;
    }
  } else {
    _input.value = _searchStr;
  }
}

putShelf = (rtBooks) => {
  BooksAPI.getAll().then((myBooks) => {

    let map0 = rtBooks.map( (book) => {

      let matchBook = myBooks.filter((b) => b.id === book.id)[0];
      if(matchBook !== undefined){
        book.shelf = (matchBook.shelf).toString();
      }
      return book;
    });
    // debugger;
    this.setState({booksList:map0})
  })
}

/**
* Desde la busqueda. Añado el libro al UI (estado) y actualizo el estado del libro en el repositorio
*/
addBook = (book,evt) => {
  // Obtengo el libro de la busqueda
  // Actualizo el estado de la aplicación
  // book.shelf=evt.currentTarget.value;
  BooksAPI.update(book,evt.currentTarget.value);
  // this.setState((state) => {
  //    booksList: state.booksList.push(book);
  // })
}

/**
Inicializa estado y recupero todos mis libros
*/
listMyBooks = () => {
  BooksAPI.getAll().then((booksList) => {
    this.setState({ booksList: booksList })
  })
}

render() {

  return (
    <div className="app">

    <Route path='/search' render={ () => (
      <BooksSearch books={this.state.booksList} onSearch={this.searchBook} onBack={this.listMyBooks} onChangeShelving={this.addBook}/>
    )}/>

    <Route exact path='/' render={ () => (
      <div className="list-books">

      <div className="list-books-title">
      <h1>MyReads</h1>
      </div>
      <div className="list-books-content">

      <div>
      <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">

      <BooksList books={this.state.booksList.filter(book => book.shelf === "currentlyReading")} onChangeShelving={this.changeShelving}/>

      </div>
      </div>

      <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">

      <BooksList books={this.state.booksList.filter(book => book.shelf === "wantToRead")} onChangeShelving={this.changeShelving}/>

      </div>
      </div>

      <div className="bookshelf">
      <h2 className="bookshelf-title">Read</h2>
      <div className="bookshelf-books">

      <BooksList books={this.state.booksList.filter(book => book.shelf === "read")} onChangeShelving={this.changeShelving}/>

      </div>
      </div>
      </div>

      </div>
      <div className="open-search">
      <Link to='/search' onClick={() => this.setState({ booksList:[] })} >Add a book</Link>
      </div>

      </div>
    )}/>
    </div>
  )
}
}

export default BooksApp
