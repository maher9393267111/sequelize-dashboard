const db = require("../models");
const { updateStock } = require("./product.controller");

const BuyFormDetail = db.BuyFormDetail;
const Product = db.Product;

// Reference cart:
// cart = [
//   {
//     ProductId,
//     ProductTypeId,
//     quantity,
//     subtotal,
//   }
// ]

const createBuyDetails = async (cart) => {
  const result = await Promise.all(
    cart.map(async (item) => {
      const product = await Product.findByPk(item.ProductId);
      if (product) {
        try {
          await BuyFormDetail.create({
            ...item,
          });
          await updateStock(item.ProductId, item.quantity, "buy");
        } catch (error) {
          console.log("Something went wrong", error);
          return;
        }
      } else {
        console.log("Not found product");
        return;
      }
    })
  ).then(details => {
    console.log("Details created", details);
  }).catch(err => {
    console.log(err);
  });
}

module.exports = { createBuyDetails }