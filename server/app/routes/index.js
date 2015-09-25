'use strict';
var router = require('express').Router();
module.exports = router;

router.use("/sounds", require("./sounds"));
router.use("/stars", require("./stars"));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
