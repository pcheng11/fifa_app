
var express = require('express'),
    router = express.Router(),
    axios = require('axios');


router.get('/:name', (req, res) => {
    const name = req.params.name
    console.log(name)
    axios.get("https://ui-avatars.com/api/?name=" + name).then(response => res.status(200).send({
        message: 'OK',
        data: response.data
    }));
});

module.exports = router;