import React, {Component} from 'react';
import Spinner from "../spinner";
import ErrorMessage from '../errorMessage';



const withData = (View, getData) => {
   
   return class extends Component {

      state = {
         data: null,
         error: false,
      }
   
      componentDidMount() {
         getData()
            .then(data => {
               this.setState({ data })
            })
      }

      componentDidCatch() {
         this.setState({
            data: null,
            error: true
         })
     }

      render() {

         const {data, error} = this.state;

         if (!data) {
            return <Spinner />
         } else if (error) {
            return <ErrorMessage />
         }

         return <View {...this.props} data = {data} />
      }
   }
}

export default withData;