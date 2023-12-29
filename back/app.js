/** [S] import modules */
const express = require("express"); // express
const cors = require("cors"); // set CORS
const morgan = require("morgan"); // 콘솔에 req, res 기록

const hpp = require("hpp"); // security
const helmet = require("helmet"); // security

const mongoose = require("mongoose"); // DB
const config = require("./configs/index"); // DB config

const http = require("http"); // http core module
/** [E] import modules */

/** [S] use middlewares */
const app = express();
app.use(express.json()); // parse request body to JSON
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev")); // 개발 환경에서 morgan 실행

// [S] security
app.use(hpp());
app.use(helmet());
// [E] security

// [S] set DB port, uri
const { MONGO_URI, PORT } = config;
let mongoUri = MONGO_URI;
let port = PORT || 8080;
mongoose
    .set("strictQuery", true)
    .connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("mongodb connected!!!");
    })
    .catch((error) => {
        console.log("failed!!!", error);
    });
// [E] set DB port, uri

// [S] REST API
const userRouter = require("./routes/api/user");
app.use("/api/user", userRouter);
const dailyRouter = require("./routes/api/daily");
app.use("/api/daily", dailyRouter);
const assetRouter = require("./routes/api/asset");
app.use("/api/asset", assetRouter);
// [E] REST API

// [S] create http server
const server = http.createServer(app);
server.listen(port, () => console.log(`Server started on ${port} port!!!`));
// [E] create http server
/** [E] use middlewares */
