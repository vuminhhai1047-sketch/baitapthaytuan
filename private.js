let movies = loadData();

const titleInput = document.getElementById("title");
const descInput = document.getElementById("desc");
const list = document.getElementById("list");
const count = document.getElementById("count");

document.getElementById("saveBtn").onclick = function () {
  let title = titleInput.value.trim();
  let desc = descInput.value.trim();

  if (!title) {
    alert("Nhập tên phim đi bạn ơii");
    return;
  }

  let movie = {
    id: Date.now(),
    title: title,
    description: desc,
    time: new Date().toLocaleString()
  };

  movies.push(movie);
  saveData();
  render();

  titleInput.value = "";
  descInput.value = "";

  alert("Đã lưu phim thành công");
};

document.getElementById("clearBtn").onclick = function () {
  if (confirm("Xóa hết danh sách")) {
    movies = [];
    saveData();
    render();
  }
};

function render() {
  list.innerHTML = "";
  count.innerText = movies.length;

  if (movies.length === 0) {
    list.innerHTML = "<p>Chưa có phim nào</p>";
    return;
  }

  movies.forEach(m => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <button class="delete" onclick="remove(${m.id})">x</button>
      <h3>🎥 ${m.title}</h3>
      <p>${m.description || ""}</p>
      <div class="time">${m.time}</div>
    `;

    list.appendChild(div);
  });
}

function remove(id) {
  if (confirm("Bạn muốn xóa phim này?")) {
    movies = movies.filter(m => m.id !== id);
    saveData();
    render();
  }
}

function saveData() {
  localStorage.setItem("movieWishlist", JSON.stringify(movies));
}

function loadData() {
  let data = localStorage.getItem("movieWishlist");

  // nếu chưa có dữ liệu thì trả về mảng rỗng
  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

render();