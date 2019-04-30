var mongoose = require('mongoose'),
    express = require('express'),
    User = require('../models/UserSchema.js'),
    Player = require('../models/PlayerSchema.js'),
    jwt = require("jsonwebtoken"),
    secrets = require("../config/secrets.js"), 
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    path = require('path'),
    router = express.Router(),
    fs = require('fs');

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename(req, file, cb) {
        const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

/**
 * Update user name editing
 */
router.post("/:user_id", upload.single("avatar"), (req, res) => {
        const user_id = req.params.user_id;
        if (req.file) {
            User.findOne({ "_id": mongoose.Types.ObjectId(user_id) }, (err, user) => {
                user.image.data = fs.readFileSync(req.file.path)
                user.image.contentType = 'image/png';
                user.save();
            })
        }
        else {
            const new_name = req.body.name;
            User.findOneAndUpdate(
                { "_id": mongoose.Types.ObjectId(user_id) },
                { "name": new_name },
                { new: true },
                (err, user) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    const payload = {
                        id: user.id,
                        name: new_name,
                        email: user.email
                    };
                    // Sign token
                    jwt.sign(
                        payload,
                        secrets.secretOrKey,
                        {
                            // 1 hour in seconds
                            expiresIn: 3600
                        },
                        (err, token) => {
                            res.status(200).send({
                                success: true,
                                token: "Bearer " + token
                            });
                        }
                    );
                }
            )
        }
});
    


/**
 * user profile
 */
router.get('/:user_id', (req, res) => {
    const user_id = req.params.user_id;
    User.findOne(
        { "_id": mongoose.Types.ObjectId(user_id) },
        (err, user) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send({
                data: user
            });
        });
});

/**
 * Put User Location
 */
router.put("/:user_id", (req, res) => {
    const user_id = req.params.user_id;
    const lng = req.body.lng;
    const lat = req.body.lat;
    console.log({ lng, lat })
    console.log(typeof lng)
    

    User.findOneAndUpdate(
        { "_id": mongoose.Types.ObjectId(user_id) }, 
        { "lng": lng, "lat": lat },
        (err, user) => {
            if(err) {
                return res.status(500).send(err);
            }
    });
        
})


module.exports = router;