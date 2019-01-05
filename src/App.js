import React, { Component } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  FormGroup, 
  Label,  
  Input
} from 'reactstrap';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class App extends Component {
  state = {
    books: [],
    newBookData : {
      title: '',
      rating: ''
    },
    editBookData : {
      id: '',
      title: '',
      rating: ''
    },
    newBookModal: false,
    editBookModal: false
  }

  componentWillMount() {
    this.setState({
      books: [
        {
          id: 100,
          title: "Universal Kingdom",
          rating: 3.5
        },
        {
          id: 134,
          title: "Bhagawat Gita",
          rating: 4.8
        },
        {
          id: 345,
          title: "Curious case",
          rating: 5.0
        },
        {
          id: 567,
          title: "Dependency Injection",
          rating: 3.7
        },
        {
          id: 455,
          title: "Lost world",
          rating: 2.2
        }
    ]
    })
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal
    });
  }

  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal
    });
  }

  addBook() {
    const { books } = this.state;
    let newBook = this.state.newBookData;
    newBook.id = Math.floor(Math.random() * 1000);
    books.push(newBook);
    this.setState({ 
      books,
      newBookModal: false,
      newBookData : {
        title: '',
        rating: ''
      }
    });
  }

  editBook(id, title, rating) {
    this.setState({ 
      editBookData: { id, title, rating },
      editBookModal: !this.state.editBookModal
    });
  }

  updateBook() {
    const { books } = this.state;
    let editBook = this.state.editBookData;
    const targetIndex = books.findIndex(o => o.id === editBook.id);
    books[targetIndex] = editBook;
    console.log(books);
    this.setState({ 
      books,
      editBookModal: false
    });
  }

  render() {
    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>
            {book.id}
          </td>
          <td>
            {book.title}
          </td>
          <td>
            {book.rating}
          </td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editBook.bind(this, book.id, book.title, book.rating)}>Edit</Button>
            <Button color="danger" size="sm">Delete</Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        
        <h1>Books App</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
        <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Email</Label>
              <Input type="text" name="title" id="title" value={this.state.newBookData.title} onChange={ e => {
                let { newBookData } = this.state;
                newBookData.title = e.target.value;
                this.setState({ newBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input type="text" name="rating" id="rating" value={this.state.newBookData.rating} onChange={ e => {
                let { newBookData } = this.state;
                newBookData.rating = e.target.value;
                this.setState({ newBookData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleNewBookModal.bind(this)} onClick={this.addBook.bind(this)}>Add Book</Button>
            <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Email</Label>
              <Input type="text" name="title" id="title" value={this.state.editBookData.title} onChange={ e => {
                let { editBookData } = this.state;
                editBookData.title = e.target.value;
                this.setState({ editBookData });
              }} />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating</Label>
              <Input type="text" name="rating" id="rating" value={this.state.editBookData.rating} onChange={ e => {
                let { editBookData } = this.state;
                editBookData.rating = e.target.value;
                this.setState({ editBookData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleEditBookModal.bind(this)} onClick={this.updateBook.bind(this)}>Update Book</Button>
            <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
