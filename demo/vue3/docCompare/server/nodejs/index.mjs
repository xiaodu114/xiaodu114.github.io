import path from "path";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import axios from "axios";
import multer from "multer";

const app = express();

app.use(cors());

// 设置multer存储配置
const storage = multer.memoryStorage(); // 使用内存存储上传的文件
const upload = multer({ storage: storage });

//  访问地址：  http://localhost:13141/api/getServerTime
app.get("/api/getServerTime", (req, res) => {
    res.send(new Date());
});

//#region   代理百度的API

//  第一版（已成功）
//      百度地址：https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
//      访问地址：http://localhost:13141/proxy/oauth/2.0/token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
// app.use(
//     "/proxy",
//     createProxyMiddleware({
//         target: "https://aip.baidubce.com", // 目标服务器地址
//         changeOrigin: true, // 将主机头指向目标URL
//         pathRewrite: {
//             "^/proxy": "" // 重写路径，去掉代理路径
//         },
//         onProxyRes: function (proxyRes, req, res) {
//             // 设置CORS头
//             res.header("Access-Control-Allow-Origin", "*");
//             res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//             res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
//         }
//     })
// );

//  第二版（已成功）
//      百度地址：https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
//      访问地址：http://localhost:13141/proxy/baidu/oauth/2.0/token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
// app.use(
//     "/proxy/baidu",
//     createProxyMiddleware({
//         target: "https://aip.baidubce.com", // 目标服务器地址
//         changeOrigin: true, // 将主机头指向目标URL
//         pathRewrite: {
//             "^/proxy/baidu": "" // 重写路径，去掉代理路径
//         },
//         onProxyRes: function (proxyRes, req, res) {
//             // 设置CORS头
//             res.header("Access-Control-Allow-Origin", "*");
//             res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//             res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
//         }
//     })
// );

//  第三版（已成功）
//      百度地址：https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
//      访问地址：http://localhost:13141/api/baidu/get_access_token?grant_type=client_credentials&client_id=your_client_id&client_secret=your_client_secret
app.get("/api/baidu/get_access_token", async (req, res) => {
    try {
        const params = {
            grant_type: req.query.grant_type,
            client_id: req.query.client_id,
            client_secret: req.query.client_secret
        };
        const response = await axios.get("https://aip.baidubce.com/oauth/2.0/token", {
            params: params
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

//  创建文档对比任务（同时上传文件和数据）
app.post(
    "/api/baidu/text_diff/create_task",
    upload.fields([
        { name: "base_file", maxCount: 1 },
        { name: "compare_file", maxCount: 1 }
    ]),
    async (req, res) => {
        const access_token = req.query.access_token;
        try {
            const base_file = req.files.base_file[0];
            const compare_file = req.files.compare_file[0];

            const formData = new FormData();
            formData.append("data", req.body.data);
            formData.append("baseFile", new Blob([base_file.buffer], { type: base_file.mimetype }), path.basename(base_file.originalname));
            formData.append("compareFile", new Blob([compare_file.buffer], { type: compare_file.mimetype }), path.basename(compare_file.originalname));

            const url = "https://aip.baidubce.com/file/2.0/brain/online/v1/textdiff/create_task";
            const response = await axios.post(`${url}?access_token=${access_token}`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data`
                }
            });
            res.json(response.data);
        } catch (error) {
            res.status(500).json(error);
        }
    }
);

//  获取文档对比结果
app.get("/api/baidu/text_diff/query_task_result/:task_id", async (req, res) => {
    try {
        const task_id = req.params.task_id;
        const access_token = req.query.access_token;

        const formData = new FormData();
        formData.append("taskId", task_id);

        const url = `https://aip.baidubce.com/file/2.0/brain/online/v1/textdiff/query_task?access_token=${access_token}`;
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": `multipart/form-data`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

//#endregion

app.listen(13141, () => {
    console.log(`服务已启动，端口是：13141`);
});
