import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import gotService from "../../services/gotService";
import { withRouter } from "react-router-dom";
import withData from "../withData";


class BooksPage extends Component {
   
   state = {
      error: false,
   }

   componentDidCatch() {
      this.setState( {error: true} )
   }


   render() {

      if (this.state.error) {
         return <ErrorMessage/>
      }

      const {getAllBooks} = new gotService();
      const Book = withData(ItemList, getAllBooks);

      return <Book 
         onItemSelected = {(itemId) => {
            this.props.history.push(itemId);
         }} 
         renderItem = {(item) => item.name} />
         
   }
}

export default withRouter(BooksPage);