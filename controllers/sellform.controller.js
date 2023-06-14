const db = require("../models");
const { createSellDetails } = require("./sellformdetail.controller");
const SellForm = db.SellForm;


// Reference cart:
// cart = [
//   {
//     ProductId,
//     ProductTypeId,
//     quantity,
//     subtotal,
//   }
// ]
const createSellForm = async (req, res) => {
  const { customer, cart, total } = req.body;
  let sellId;
  let result;
  let response;
  let cartToDetails;
  try {
    result = await SellForm.create({ customer, total });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  if (result) {
    sellId = result.id;
    console.log("Sell form initialized successfully", sellId);
    response = {...result};
    cartToDetails = cart.map((item) => {
      return {
        ...item,
        SellFormId: sellId,
      };
    });
  }
  await createSellDetails(cartToDetails);
  res.status(200).send(response);
};

// INFO: "include"s to get details, related product types.
const getAllSellForm = async (req, res) => {
  let forms = await SellForm.findAll({
    include: [
      {
        model: db.SellFormDetail,
        include: [
          {
            model: db.Product,
          },
          {
            model: db.ProductType,
          },
        ],
      },
    ],
  });
  if (forms) {
    if (forms.length <= 0) res.status(200).send("No sales found");
    else {
      res.status(200).send(forms);
    }
  } else {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { createSellForm, getAllSellForm };
