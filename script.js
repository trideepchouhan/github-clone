async function search(key) {
  clearTable();
  console.log("Fetching Users");
  let allUsers = await fetch("https://api.github.com/users", {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());
  //allUsers - Array of user objects
  console.log(allUsers);
  console.log("all Users Fetched");
  let filteredUsers = allUsers.filter((user) => user.login.includes(key));
  displayUsers(filteredUsers);
  //   let repoUrls = users.map((user) => user.repos_url);
  //   console.log(repoUrls);
  //   repoUrls.forEach((element) => findRepos(element).then((e) => console.log(e)));

  //   var element = document.createElement("div");
  //   element.innerHTML = "Repositories";
  //   document.body.appendChild(element);
}

function displayUsers(users) {
  console.log("Inside Display users");
  let table = document.getElementById("welcome");
  console.log("First Set", table);
  if (table === null) {
    table = document.createElement("div");
    table.classList = "row justify-content-center";
    table.setAttribute("id", "welcome");
    document.getElementById("container").appendChild(table);
  }
  console.log("Second Set", table);
  for (const user of users) {
    table.appendChild(createUserRow(user));
    console.log(user);
  }
}

function createUserRow(user) {
  let userRow = document.createElement("div");
  userRow.classList =
    "col-4 border border-left-0 border-right-0 border-secondary";

  let userRowBody = document.createElement("div");
  userRowBody.classList = "text-center";

  let heading = document.createElement("p");
  heading.innerHTML = `user: ${user.login}`;

  userRowBody.append(heading);
  userRow.append(userRowBody);
  return userRow;
}

function clearTable() {
  let table = document.getElementById("welcome");
  console.log("inside Clear");
  table.remove();
  console.log("after table remove");
}

async function findRepos(repoUrl) {
  let repo = await fetch(repoUrl, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());
  return repo;
}

async function findRepositoriesByUser(user) {
  let userRepositoryUrl = user.repos_url;
  let repo = await fetch(repoUrl, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());
}

function findUsersAndRepositories() {}

function listFilesOfRepository() {}
