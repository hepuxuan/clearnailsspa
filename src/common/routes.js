module.exports = [
  {
    path: "/selectServiceStep1",
    component: process.env.IS_BROWSER
      ? require("../client/components/selectServiceStep1").SelectServiceStep1
      : null
  },
  {
    path: "/selectServiceStep2/category/:category",
    component: process.env.IS_BROWSER
      ? require("../client/components/selectServiceStep2").SelectServiceStep2
      : null
  },
  {
    path: "/selectStaffAndTime",
    component: process.env.IS_BROWSER
      ? require("../client/components/selectStaffAndTime").SelectStaffAndTime
      : null
  },
  {
    path: "/reviewAndBook/staff/:staff/time/:time",
    component: process.env.IS_BROWSER
      ? require("../client/components/reviewAndBook").ReviewAndBook
      : null
  },
  {
    path: "/confirmation/appointment/:appointment",
    component: process.env.IS_BROWSER
      ? require("../client/components/confirmation").Confirmation
      : null
  }
];
