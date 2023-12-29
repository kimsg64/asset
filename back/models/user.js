const mongoose = require("mongoose");
const moment = require("moment"); // get and format time

const UserSchema = new mongoose.Schema({
    // email: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registeredDate: { type: Date, default: moment().format("YYYY-MM-DD") },
    language: { type: String, default: "Kor" },
    // Asset 수정 및 삭제 권한
    // Asset 조회 권한
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
