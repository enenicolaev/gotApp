import React, {useState, useEffect} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";



function RandomChar({interval = 4000}) {

   const [char, updateChar] = useState({}),
         [loading, updateLoading] = useState(true),
         [error, updateError] = useState(false);

   const {getCharacter} = new gotService();

   useEffect(() => {
      updateCharacter();
   }, [])

   useEffect(() => {
      const timerId = setInterval(updateCharacter, interval);
      return () => {
         clearInterval(timerId);
      }
   })

   const updateCharacter = () => {
      const id = Math.floor(Math.random() * 140 + 25);
      getCharacter(id)
         .then((char) => {
            updateChar(char);
            updateLoading(false);
         })
         .catch(() => {
            updateError(true);
            updateLoading(false);
         })
   }



   const content = !(loading || error) ? <View char = {char}/> : null,
         errorMessage = error ? <ErrorMessage/> : null,
         spinner = loading ? <Spinner/> : null;

   return (
      <div className="random-block rounded">
         { errorMessage }
         { content }
         { spinner }
      </div>
   );
}

export default RandomChar;



const View = ({char}) => {
   const {name, gender, died, born, culture} = char;

   return (
      <>
         <h4>Random Character: {name}</h4>
         <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Gender </span>
               <span>{gender}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Born </span>
               <span>{born}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Died </span>
               <span>{died}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
               <span className="term">Culture </span>
               <span>{culture}</span>
            </li>
         </ul>
      </>
   )
}


