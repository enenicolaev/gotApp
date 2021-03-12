import React, {Component} from 'react';
import './itemDetails.css';
import gotService from "../../services/gotService";
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



export default class ItemDetails extends Component {

   gotService = new gotService();

   state = {
      item: null,
      loading: true,
      error: false,
   }

   componentDidUpdate(prevProps) {
      if (prevProps.itemId !== this.props.itemId) {
         this.updateItem(this.props.itemId); 
         this.setState({
            loading: true,
         })
      }
   }

   componentDidMount() {
      this.updateItem(this.props.itemId);
   }

  componentDidCatch() {
      this.setState({
         item: null,
         error: true
      })
  }

   updateItem(id) {

      if (!id) {
         return;
      } 

      this.gotService[this.props.getApiMethod](id)
         .then((item) => {
            this.setState({
               item: item,
               loading: false,
            })
         })
   }

   render() {

      if (!this.state.item) {
         return <span className = "select-error">Please select a {this.props.label}</span>
      }

      const {loading, error, item} = this.state,
            {name} = item;

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
                     React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                     })
                  }
               </ul>
         </div>
      );
    }
}