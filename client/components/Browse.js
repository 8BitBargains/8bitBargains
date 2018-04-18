import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react';

export default class Browse extends React.Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    return (
      // <div>
      //   <ul>
      //     {this.props.products && this.props.products.map(product => (
      //       <li key={product.id}>
      //         <a href={`/games/${product.id}`}>{product.name}</a>
      //         <p>Price: {product.price}</p>
      //         <p>Description: {product.description}</p>
      //         <img src={product.coverUrl} />
      //       </li>
      //     ))}
      //   </ul>
      //   </div>
      <Card.Group>
        {this.props.products && this.props.products.map(product => (
          <Card key={product.id}>
            <Image src={product.coverUrl} />
            <Card.Content>
              <Card.Header>{product.title}</Card.Header>
              <Card.Meta>Price: {product.price}</Card.Meta>
              <Card.Description>{product.description}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    )
  }
}

