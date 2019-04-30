var express = require('express'),
    router = express.Router();
const googleTrends = require('google-trends-api');

router.get('/:name', (req, res) => {
    const name = req.params.name;
    var countries = [['State', 'Popularity']];
    googleTrends.interestByRegion({ keyword: name, startTime: new Date('2019-01-01'), endTime: new Date(Date.now()), category: 294, geo: 'US' })
        .then((_res) => {
            var geoMapData = JSON.parse(_res).default.geoMapData;
        
            geoMapData.map(data => {
                countries.push([data.geoCode, data.value[0]])
            })
            res.status(200).send({
                message: "OK",
                data: countries
            });
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = router;