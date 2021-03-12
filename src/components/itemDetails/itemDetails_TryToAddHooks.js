import React, {useState, useEffect, useRef} from 'react';
import './itemDetails.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from '../errorMessage';


const Field = ({item, field, label}) => {
   return (
      <li className="list-group-item d-flex justify-content-between">
         <span className="term">{label}</span>
         <span className="term-info">{item[field]}</span>
      </li>
   ) 
};

export {
   Field
};


function itemDetails({itemId, label, children, getApiMethod}) {

   const gotService = new GotService();

   const [item, updateItem] = useState({}),
         [loading, updateLoading] = useState(true),
         [error, updateError] = useState(false);

   function usePrevious(value) {
      const ref = useRef();

      useEffect(() => {
         ref.current = value;
      });

      return ref.current;
   }  // function to get prev state of prop

   useEffect(() => {
      updateItemById(itemId);
   }, []);

   useEffect(() => {
      const prevItemId = usePrevious(itemId);
      if (prevItemId !== itemId) {
         updateItemById(itemId);
         updateLoading(true);
      }  
   })


   function updateItemById(id) {

      if (!id) {
         return;
      } 

      gotService[getApiMethod](id)
         .then((item) => {
            updateItem(item);
            updateLoading(false);
         })
         .catch(() => {
            updateLoading(false);
            updateError(true);
         })
   }


   if (!item) {
      return <span className = "select-error">Please select a {label}</span>
   }

   const {name} = item;

   if (loading) {
      return <Spinner />;
   } else if (error) {
      return <ErrorMessage />;
   }

   return (
      <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
               {
                  React.Children.map(children, (child) => {
                     return React.cloneElement(child, {item})
                  })
               }
            </ul>
      </div>
   );
}

export default itemDetails;