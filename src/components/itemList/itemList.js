import React from 'react';
import './itemList.css';


function ItemList({onItemSelected, renderItem, data}) {

    function renderItems(arr) {
      return arr.map( item => {
         const {id} = item;
         const label = renderItem(item);
         return (
            <li 
               key = { id } 
               className="list-group-item" 
               onClick = { () => onItemSelected(id) } > 
               { label }
            </li>
         )
      })
   }
   const items = renderItems(data);

   return (
      <ul className="item-list list-group">
            { items }
      </ul>
   )
}

export default ItemList;

