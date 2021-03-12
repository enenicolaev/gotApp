import React, {Component} from 'react';
import './randomChar.css';
import gotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import PropTypes from 'prop-types'; 



export default class RandomChar extends Component {

   gotService = new gotService();
   state = {
      char: {},
      loading: true,
      error: false,
   }

   static defaultProps = {
      interval: 8000,
   }

   static propTypes = {
      interval: PropTypes.number,
   }

   componentDidMount() {
      this.updateCharacter();
      this.timerId = setInterval(this.updateCharacter, this.props.interval);
   }

   componentWillUnmount() {
      clearInterval(this.timerId);
   }

   onCharacterLoaded = (char) => {
      this.setState({
         char,
         loading: false,
      })
   }

   onError = () => {
      this.setState({
         error: true, 
         loading: false,
      })
   }

   updateCharacter = () => {
      const id = Math.floor(Math.random() * 140 + 25);
      this.gotService.getCharacter(id)
         .then(this.onCharacterLoaded)
         .catch(this.onError)
         .finally()
   }

   render() {

      const {char, loading, error} = this.state;

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
}

RandomChar.propTypes = {
   interval: PropTypes.number,
}


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


