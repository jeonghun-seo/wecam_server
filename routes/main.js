const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

router.get(["/", "/home"], asyncHandler(async(req, res) => {
    const locals = {
        title: "Home",
    };
    const data = await Post.find(); //데이터베이스에서 가져오기 부분!!!!
    res.render("index", {locals, data, layout: mainLayout});
}));

router.get("/weather", (req, res) => {
    const locals = {
        title: "weather",
    };
    res.render("weather", {locals, layout: mainLayout});
});

/**
 * 게시물 상세 보기
 * GET /post/:id
 */
router.get( 
    "/post/:id",
    asyncHandler(async (req, res) => {
        const data = await Post.findOne({ _id: req.params.id });
        res.render("post", { data, layout: mainLayout});
    })
);

// 인증 토큰 검증 함수 (수정)
function verifyToken(token) {
    return token === "BD9AB16784276C952595CE1FD0EDE420C4A4A33B77A2AE9A5D3459B9FC26172E";
}
// 데이터 수신
router.post('/data', async(req, res) => {
    const { accesstoken, sensor_id, avg_ppm } = req.body;

    // if (!verifyToken(accesstoken)) {
    //     return res.status(401).json({ error: 'Invalid access token' });
    // }

    const coData = new Post({ sensor_id, avg_ppm });

    try {
        await coData.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (err) {
        res.status(500).json({ error: `Failed to save data: ${err}` });
    }
});





module.exports =router;

// Post.insertMany([
//     {
//         title: "제목 1",
//         body: "내용 1 - 굿잡"
//     },
//     {
//         title: "제목 2",
//         body: "내용 2 - 굿잡"
//     },
//     {
//         title: "제목 3",
//         body: "내용 3 - 굿잡"
//     },
//     {
//         title: "제목 4",
//         body: "내용 4 - 굿잡"
//     },
//     {
//         title: "제목 5",
//         body: "내용 5 - 굿잡"
//     },
// ]);