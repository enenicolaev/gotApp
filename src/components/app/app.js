import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BooksPage, HousesPage, BooksItem} from "../pages";
import ErrorMessage from '../errorMessage';

import "./app.css";


export default class App extends Component {
   state = {
       showRandomChar: true,
       error: false,
   }

   componentDidCatch() {
      this.setState({
         error: true,
      })
   }

   toggleRandomChar = () => {
       this.setState((state) => {
           return {
               showRandomChar: !state.showRandomChar
           }
       });
   }

   render() {

       if (this.state.error) {
           return <ErrorMessage/>
       }

       const char = this.state.showRandomChar ? <RandomChar/> : null;

       return (
           <Router>
               <div className = "app">

                  <Route path='/' component={() => <h1 style = {{color: "white", textAlign: "center", margin: "0px 0px 20px"}}>Welcome to GOT DB</h1>} exact/>
                  <Container>
                     <Header />
                  </Container>

                  <Container>
                     <Row>
                        <Col lg={{size: 5, offset: 0}}>
                              { char }
                              <button 
                                 className="toggle-btn"
                                 onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                     </Row>

                     <Route path = "/characters" exact component = {CharacterPage}/>
                     <Route path = "/books" exact component = {BooksPage}/>
                     <Route path = "/houses" exact component = {HousesPage}/>

                     <Route path = "/books/:id" render = {
                        ({match}) => {
                           const {id} = match.params;
                           return <BooksItem bookId={id} />
                        }
                     }/>

                  </Container>

               </div>
           </Router>
       );
   }
};

