const db = require("../models");
const { createBuyDetails } = require("./buyformdetail.controller");


const BuyForm = db.BuyForm;

const createBuyForm = async (req, res) => {
  const { total, cart, SupplierId } = req.body;
  let result;
  let response;
  let buyId;
  let cartToDetails;
  try {
    result = await BuyForm.create({ total, SupplierId });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  if (result) {
    buyId = result.id;
    console.log("Buy form initialized successfully", buyId);
    response = {...result};
    cartToDetails = cart.map((item) => {
      return {
        ...item,
        BuyFormId: buyId,
      };
    });
  }
  await createBuyDetails(cartToDetails);
  res.status(200).send(response);
};

const getAllBuyForm = async (req, res) => {
  let forms = await BuyForm.findAll({
    include: [
      {
        model: db.BuyFormDetail,
        include: [
          {
            model: db.Product,
          },
          {
            model: db.ProductType,
          },
        ],
      },
      {
        model: db.Supplier,
      },
    ],
  });
  if (forms) {
    if (forms.length <= 0) res.status(200).send("No buyform found");
    else {
      res.status(200).send(forms);
    }
  } else {
    res.status(500).send("Something went wrong");
  }
};

module.exports = { createBuyForm, getAllBuyForm };
