const API_URL = "http://localhost:5000/api/items";

const form = document.getElementById("itemForm");
const itemList = document.getElementById("itemList");
const itemIdField = document.getElementById("itemId");
const loader = document.getElementById("loader");

// Load items
async function loadItems() {
  loader.style.display = "block"; // ✅ show loader

  const res = await fetch(API_URL);
  const data = await res.json();

  loader.style.display = "none"; // ✅ hide loader

  itemList.innerHTML = "";

  data.data.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <span>${item.name} - ${item.quantity} - ₹${item.price}</span>
      <div>
        <button onclick="editItem('${item._id}', '${item.name}', ${item.quantity}, ${item.price})">Edit</button>
        <button class="delete" onclick="deleteItem('${item._id}')">Delete</button>
      </div>
    `;

    itemList.appendChild(div);
  });
}

// Add or Update item
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.style.display = "block"; // ✅ show loader

  const id = itemIdField.value;
  const name = document.getElementById("name").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  if (id) {
    // UPDATE
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, quantity, price })
    });
  } else {
    // CREATE
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, quantity, price })
    });
  }

  form.reset();
  itemIdField.value = "";

  await loadItems(); // reload data
});

// Edit item
function editItem(id, name, quantity, price) {
  itemIdField.value = id;
  document.getElementById("name").value = name;
  document.getElementById("quantity").value = quantity;
  document.getElementById("price").value = price;
}

// Delete item
async function deleteItem(id) {
  loader.style.display = "block"; // ✅ show loader

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  await loadItems();
}

// Initial load
loadItems();