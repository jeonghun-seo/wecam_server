const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
//const cron = require('node-cron');

// router.get(["/", "/home"], asyncHandler(async(req, res) => {
//     const locals = {
//         title: "Home",
//     };
//     const data = await Post.find(); //데이터베이스에서 가져오기 부분!!!!
//     res.render("index", {locals, data, layout: mainLayout});
// }));

// router.get("/weather", (req, res) => {
//     const locals = {
//         title: "weather",
//     };
//     res.render("weather", {locals, layout: mainLayout});
// });

/**
 * 게시물 상세 보기
 * GET /post/:id
 */
// router.get( 
//     "/post/:id",
//     asyncHandler(async (req, res) => {
//         const data = await Post.findOne({ _id: req.params.id });
//         res.render("post", { data, layout: mainLayout});
//     })
// );

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

//GET 요청 처리
router.get('/getData', async (req, res) => {
    try {
        const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000); // 현재 시간에서 6시간 전 시간 계산
        const data = await Post.find({ timestamp: { $gte: sixHoursAgo } });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

//GET 6시간 동안 한시간의 평균씩만
router.get('/getData_avg', async (req, res) => {
    try {
        const now = new Date();
        const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        let dataAverages = [];

        for (let i = 0; i < 6; i++) {
            const startTime = new Date(sixHoursAgo.getTime() + i * 60 * 60 * 1000);
            const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

            const data = await Post.aggregate([
                {
                    $match: {
                        timestamp: { $gte: startTime, $lt: endTime }
                    }
                },
                {
                    $group: {
                        _id: null,
                        avgValue: { $avg: "$avg_ppm" }
                    }
                }
            ]);

            if (data.length > 0) {
                dataAverages.push({ time: startTime, average: data[0].avgValue });
            } else {
                dataAverages.push({ time: startTime, average: null });
            }
        }

        res.json(dataAverages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `An error occurred while fetching data: ${err}` });
    }
});


// // 오래된 게시물을 삭제하는 경로
// router.delete('/deleteOldPosts', async (req, res) => {
//     try {
//         const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // Calculate the date 3 days ago
//         const result = await Post.deleteMany({ timestamp: { $lt: threeDaysAgo } });
//         res.status(200).json({ message: `${result.deletedCount} documents were deleted` });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: `Failed to delete old posts: ${err}` });
//     }
// });


// // 매일 자정 삭제 동작 실행
// cron.schedule('0 0 * * *', async () => {
//     try {
//         const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
//         const result = await Post.deleteMany({ timestamp: { $lt: threeDaysAgo } });
//         console.log(`${result.deletedCount} documents older than 3 days were deleted`);
//     } catch (err) {
//         console.error(`Failed to delete old posts: ${err}`);
//     }
// });



module.exports =router;
