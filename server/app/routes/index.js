'use strict';
var router = require('express').Router();
module.exports = router;


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

router.use("/sounds", require("./sounds"));
