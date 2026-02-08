const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.use(express.json());

let orders = [];

// Socket connection
io.on("connection", socket => {
  console.log("User connected");

  // إرسال الطلبات الحالية عند الدخول
  socket.emit("orders", orders);

  // استقبال طلب جديد
  socket.on("newOrder", order => {
    orders.push(order);
    io.emit("orders", orders); // تحديث للجميع
  });

  // حذف طلب
  socket.on("completeOrder", index => {
    orders.splice(index, 1);
    io.emit("orders", orders);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
