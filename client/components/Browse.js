import React from 'react'

export default class Browse extends React.Component {
  componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.products && this.props.products.map(product => (
            <li key={product.id}>
              <a href={`/games/${product.id}`}>{product.name}</a>
              <p>Price: {product.price}</p>
              <p>Description: {product.description}</p>
              <img src={product.coverUrl} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

