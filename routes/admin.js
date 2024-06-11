const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const router = express.Router();
const adminLayout = "../views/layouts/admin";
const adminLayout2 = "../views/layouts/admin-nologout";
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

/**
 * Admin page
 * GET /admin
 */
router.get("/admin", (req, res) => {
    const locals ={
        title: "관리자 페이지",
    };
    res.render("admin/index", { locals, layout: adminLayout2});
});

/**
 * view register form
 * GET /register
 */
router.get("/register", asyncHandler(async (req, res) => {
    res.render("admin/index", { layout: adminLayout2});
}))

/**
 * Register Administrator
 * POST register
 */
router.post(
    "/register",
    asyncHandler(async (req, res) => {
        res.send("Register");
    })
);

module.exports = router;