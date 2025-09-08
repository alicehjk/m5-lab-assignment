import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

export default function ProductList({ products }){
  return (
    <div className="row">
      {products.map(p => (
        <div key={p.id} className="col-md-4">
          <Card>
            <CardImg top src={p.image} alt={p.name} />
            <CardBody>
              <CardTitle tag="h5">{p.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted">${p.price} | Qty: {p.qty}</CardSubtitle>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
