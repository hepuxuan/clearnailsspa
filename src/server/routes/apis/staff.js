const express = require("express");
const { getStaff } = require("../../services/staff");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const staff = await getStaff(req.params.id);
    res.json(staff);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      err: "INTERNAL_ERROR"
    });
  }
});

module.exports = router;
