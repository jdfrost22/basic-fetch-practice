const API_URL = "https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json";
const container = document.getElementById("card-container");

document.getElementById("load-all").addEventListener("click", async () => {
  const users = await fetchUsers();
  displayUsers(users);
});

document.getElementById("load-filtered").addEventListener("click", async () => {
  const users = await fetchUsers();
  const filtered = users.filter(user => user.yearsEmployed < 10);
  displayUsers(filtered);
});

document.getElementById("clear-cards").addEventListener("click", () => {
  container.innerHTML = "";
});

async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (err) {
    console.error("Fetch error:", err);
    alert("Could not load users.");
    return [];
  }
}

function displayUsers(users) {
  container.innerHTML = ""; 
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <h3>${user.firstName} ${user.lastName}</h3>
      <p>${user.email}</p>
      <p>${user.companyName}</p>
      <p>Years Employed: ${user.yearsEmployed}</p>
    `;
    container.appendChild(card);
  });
}