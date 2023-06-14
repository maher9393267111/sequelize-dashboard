const db = require("../models");
const { updateStock } = require("./product.controller");

const SellFormDetail = db.SellFormDetail;
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

const createSellDetails = async (cart) => {
  const result = await Promise.all(
    cart.map(async (item) => {
      const product = await Product.findByPk(item.ProductId);
      if (product && item.quantity < product.stock) {
        try {
          await SellFormDetail.create({
            ...item,
          });
          await updateStock(item.ProductId, item.quantity);
        } catch (error) {
          console.log("Something went wrong", error);
          return;
        }
      } else {
        console.log("Not enough stock");
        return;
      }
    })
  )
    .then((details) => {
      console.log("Details created", details);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createSellDetails };
