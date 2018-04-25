const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    get() {
      if (this.getDataValue('type') === 'game') {
        return this.getDataValue('inventory');
      } else if (this.getDataValue('type') === 'bundle') {
        const subProductInventoryVals = [];
        this.getDataValue('subProduct') &&
          this.getDataValue('subProduct').forEach(subProduct => {
            subProductInventoryVals.push(subProduct.inventory);
          });
        return Math.min(...subProductInventoryVals);
      }
    }
  },
  type: {
    type: Sequelize.ENUM(['game', 'bundle']),
    defaultValue: 'game'
  },
  description: {
    type: Sequelize.TEXT
  },
  coverUrl: {
    type: Sequelize.STRING
  }
});

module.exports = Product;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
// const setBundleInventory = product => {
//   // console.log(product);
//   if (product.type === 'bundle') {
//     console.log('setting bundle inventory');
//     Product.findOne({ where: { id: product.id }, include: { all: true } })
//       .then(foundProduct => {
//         console.log('product is ', foundProduct);
//       });
//   }
// };

// Product.afterCreate(setBundleInventory);
// Product.afterSave(setBundleInventory);
