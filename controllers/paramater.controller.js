const db = require('../models')

const Paramater = db.Paramater;

const createParamater = async (req, res) => {
    const {name, value} = req.body;
    if(!name || !value)
        res.status(500).send("Please provide name and value");
    
    let result;
    result = await Paramater.findOne({
        where : {
            name: name
        }
    })
    if(result){
    return res.status(409).send("Paramater is already exists");
    }
    result = await Paramater.create({ name, value});
    if(!result)
        return res.status(500).send("Something went wrong");
    res.status(200).send("New paramater created");
}

module.exports = {createParamater}