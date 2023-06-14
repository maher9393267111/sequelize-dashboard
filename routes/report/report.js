const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("This return list of reports, modify at routes/report/report.js");
})


module.exports = router;