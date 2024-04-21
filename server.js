const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./demo1-a2b11-firebase-adminsdk-3hglv-405d9dc1b9.json');
const path = require('path');
const cors = require('cors');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://demo1-a2b11-default-rtdb.firebaseio.com'
});

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const csvcRef = admin.database().ref('CSVC');

// Định nghĩa các hàm
function addObject(key, value) {
  // Chuyển đổi value thành số nguyên trước khi thêm vào database
  const intValue = parseInt(value, 10);
  csvcRef.child(key).set(intValue);
}

function removeObject(key) {
  csvcRef.child(key).remove();
}

function filterObjects(value) {
  // Chuyển đổi value thành số nguyên để lọc
  const intValue = parseInt(value, 10);
  csvcRef.orderByValue().equalTo(intValue).on("value", function(snapshot) {
    console.log(snapshot.val());
  });
}

function updateQuantity(key, newQuantity) {
  // Chuyển đổi newQuantity thành số nguyên trước khi cập nhật
  const intValue = parseInt(newQuantity, 10);
  csvcRef.child(key).set(intValue);
}

// Endpoint để thêm đối tượng
app.post('/add', (req, res) => {
  const { key, value } = req.body;
  addObject(key, value);
  res.json({message:'Đối tượng đã được thêm.'});
});

// Endpoint để xóa đối tượng
app.post('/remove', (req, res) => {
  const { key } = req.body;
  removeObject(key);
  res.json({message:'Đối tượng đã được xóa.'});
});

// Endpoint để lọc đối tượng
app.post('/filter', (req, res) => {
  const { value } = req.body;
  filterObjects(value);
  res.json({message:'Đối tượng đã được lọc.'});
});

// Endpoint để cập nhật số lượng
app.post('/update', (req, res) => {
  const { key, newQuantity } = req.body;
  updateQuantity(key, newQuantity);
  res.json({message: 'Số lượng đã được cập nhật.'});
});


// Bắt đầu server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
