const express = require('express');

const router = express.Router();

router.get('/available', (req, res) => {
    res.json({
        availables: [
            '8:00-9:00'
        ]
    })
});

module.exports = router;
