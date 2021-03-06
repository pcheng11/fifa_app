var express = require('express'),
    router = express.Router();
const googleTrends = require('google-trends-api');


/**
 * get team trending
 */
router.get('/:name', (req, res) => {
    console.log(req.params.name)
    const name = req.params.name;
    let states = [['State', 'Popularity']];
    googleTrends.interestByRegion({ keyword: name, startTime: new Date('2017-01-01'), endTime: new Date(Date.now()), category: 294, geo: 'US' })
        .then((_res) => {
            var geoMapData = JSON.parse(_res).default.geoMapData;

            geoMapData.map(data => {
                states.push([data.geoCode, data.value[0]])
            })
            console.log(states)
            res.status(200).send({
                message: "OK",
                data: states
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;