function showSuccess(message) {
  // Assuming you have an element with the ID "success-message" to display the success message
  const successMessageElement = document.getElementById('thanh cong');
  successMessageElement.textContent = message;
}


function addObject() {
    const key = prompt('Nhập key:');
    const value = prompt('Nhập value:');
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, value })
    })
    .then(response => response.json()) // Giả định rằng server trả về JSON
    .then(data => {
      showSuccess(data.message); // Hiển thị thông báo từ server
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}
  
function removeObject() {
    const key = prompt('Nhập key của đối tượng cần xóa:');
    fetch('/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key })
    })
    .then(response => response.json())
    .then(data => {
      showSuccess(data.message);
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}
  
function filterObjects() {
    const value = prompt('Nhập giá trị để lọc:');
    fetch('/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
    .then(response => response.json())
    .then(data => {
      showSuccess(data.message);
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}
  
function updateQuantity() {
    const key = prompt('Nhập key:');
    const newQuantity = prompt('Nhập số lượng mới:');
    fetch('/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ key, newQuantity })
    })
    .then(response => response.json())
    .then(data => {
      showSuccess(data.message);
    })
    .catch(error => {
      console.error('Có lỗi xảy ra:', error);
    });
}
  