import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import withData from "../withData";



export default class CharacterPage extends Component {
   gotService = new gotService();
   state = {
      selectedItem: null,
      error: false,
   }

   componentDidCatch() {
      this.setState({error: true})
   }

   onItemSelected = (id) => {
      this.setState({selectedItem: id})
   }

   render() {

      if (this.state.error) {
         return <ErrorMessage/>
     }

     
      const { getAllCharacters } = new gotService();
      const List = withData(ItemList, getAllCharacters);

      const charDetails = (
         <ItemDetails itemId = {this.state.selectedItem} label = "character" getApiMethod = "getCharacter">

            <Field field = "gender" label = "Gender" />
            <Field field = "culture" label = "Culture" />
            <Field field = "born" label = "Born" />
            <Field field = "died" label = "Died" />

         </ItemDetails>
      );

      return (
         <RowBlock 
            left = {
               <List  
               onItemSelected = {this.onItemSelected} 
               renderItem = {(item) => item.name} />
            } 
            right = { charDetails } 
         />
      )
   }
}