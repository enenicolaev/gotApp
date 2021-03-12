import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from "../../services/gotService";
import RowBlock from "../rowBlock";
import withData from "../withData";


export default class HousesPage extends Component {
   
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

     const { getAllHouses } = new gotService();
     const List = withData(ItemList, getAllHouses)

      const housesDetails = (
         <ItemDetails itemId = {this.state.selectedItem} label = "house" getApiMethod = "getHouse">

            <Field field = "name" label = "Name" />
            <Field field = "region" label = "Region" />
            <Field field = "words" label = "Words" />

         </ItemDetails>
      );

      return (
         <RowBlock 
            left = {
               <List 
               onItemSelected = {this.onItemSelected} 
               renderItem = {(item) => item.name}/>
            } 
            right = {housesDetails} />
      )
   }
}