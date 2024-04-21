const admin = require('firebase-admin');
const serviceAccount = require('./demo1-a2b11-firebase-adminsdk-3hglv-405d9dc1b9.json');
const readline = require('readline');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://demo1-a2b11-default-rtdb.firebaseio.com'
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

// Tạo giao diện dòng lệnh
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hỏi người dùng muốn thực hiện hành động nào
rl.question('Bạn muốn thực hiện hành động nào? (add, remove, filter, update): ', function(action) {
  switch (action) {
    case 'add':
      rl.question('Nhập key: ', function(key) {
        rl.question('Nhập value: ', function(value) {
          // Chuyển đổi value thành số nguyên trước khi thêm
          const intValue = parseInt(value, 10);
          addObject(key, intValue);
          rl.close();
        });
      });
      break;
    case 'remove':
      rl.question('Nhập key của đối tượng cần xóa: ', function(key) {
        removeObject(key);
        rl.close();
      });
      break;
    case 'filter':
      rl.question('Nhập giá trị để lọc: ', function(value) {
        // Chuyển đổi value thành số nguyên để lọc
        const intValue = parseInt(value, 10);
        filterObjects(intValue);
        rl.close();
      });
      break;
    case 'update':
      rl.question('Nhập key: ', function(key) {
        rl.question('Nhập số lượng mới: ', function(newQuantity) {
          const intValue = parseInt(newQuantity, 10);
          updateQuantity(key, intValue);
          rl.close();
        });
      });
      break;
    default:
      console.log('Hành động không hợp lệ.');
      rl.close();
  }
});

rl.on('close', function() {
  console.log('Chương trình kết thúc.');
  process.exit(0);
});
