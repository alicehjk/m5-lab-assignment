import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ProductList from './ProductList';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      products:[
        {id:1,name:'Product One',price:20,qty:2,image:'https://source.unsplash.com/400x300/?product,1'},
        {id:2,name:'Product Two',price:35,qty:1,image:'https://source.unsplash.com/400x300/?product,2'},
        {id:3,name:'Product Three',price:12,qty:4,image:'https://source.unsplash.com/400x300/?product,3'}
      ]
    };
  }

  render(){
    const { products } = this.state;
    const totalQty = products.map(p=>p.qty).reduce((a,b)=>a+b,0);
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="mb-4">
          <NavbarBrand href="/">Shop Cart</NavbarBrand>
          <div className="ms-auto cart-icon">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="cart-badge">{totalQty}</span>
          </div>
        </Navbar>

        <div className="container">
          <ProductList products={products} />
        </div>
      </div>
    );
  }
}
