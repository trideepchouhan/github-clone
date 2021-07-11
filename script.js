async function search(key) {
  clearTable();
  let allUsers = await fetch("https://api.github.com/users", {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());

  let filteredUsers = allUsers.filter((user) => user.login.includes(key));
  displayUsers(filteredUsers);
}

function displayUsers(users) {
  let table = document.getElementById("welcome");
  let userHeading = document.createElement("h3");
  userHeading.classList = "col-12 text-center";
  userHeading.innerHTML = `${users.length} Users found`;
  table.appendChild(userHeading);

  for (const user of users) {
    table.appendChild(createUserRow(user));
    console.log(user);
  }
}

function createUserRow(user) {
  let userRow = document.createElement("div");
  userRow.classList = "col-4 card border border-secondary";

  let userRowBody = document.createElement("div");
  userRowBody.classList = "card-body";

  let heading = document.createElement("p");
  heading.classList = "lead";
  heading.innerHTML = `User: ${user.login}`;

  let repositoryLink = document.createElement("button");
  repositoryLink.addEventListener(
    "click",
    function () {
      findRepos(user);
    },
    false
  );
  repositoryLink.classList = "btn btn-secondary";
  repositoryLink.innerHTML = "Go to Repositories";

  userRowBody.append(heading, repositoryLink);
  userRow.append(userRowBody);
  return userRow;
}

function clearTable() {
  let table = document.getElementById("welcome");
  table.remove();

  table = document.createElement("div");
  table.classList = "row justify-content-center";
  table.setAttribute("id", "welcome");
  document.getElementById("container").appendChild(table);
}

async function findRepos(user) {
  let repo = await fetch(user.repos_url, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());

  clearTable();
  console.log(repo);
  displayUserRepos(user.login, repo);
}

function displayUserRepos(username, repos) {
  let table = document.getElementById("welcome");
  let userHeading = document.createElement("h3");
  userHeading.classList = "col-12 text-center";
  userHeading.innerHTML = `${username} : ${repos.length} repos found`;
  table.appendChild(userHeading);

  for (const repo of repos) {
    table.appendChild(createRepoRow(repo));
    console.log(repo);
  }
}

function createRepoRow(repo) {
  let userRow = document.createElement("div");
  userRow.classList = "col-4 card border border-secondary";

  let userRowBody = document.createElement("div");
  userRowBody.classList = "card-body";

  let heading = document.createElement("p");
  heading.classList = "lead";
  heading.innerHTML = `Repository name: ${repo.full_name}`;

  let repositoryLink = document.createElement("button");
  repositoryLink.addEventListener(
    "click",
    function () {
      findFiles(repo);
    },
    false
  );
  repositoryLink.classList = "btn btn-secondary";
  repositoryLink.innerHTML = "Go to Files";

  userRowBody.append(heading, repositoryLink);
  userRow.append(userRowBody);
  return userRow;
}

async function findFiles(repo) {
  let url = `${repo.url}/contents`;
  let files = await fetch(url, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());

  clearTable();
  console.log(files);
  displayUserRepoFiles(repo.full_name, files);
}

function displayUserRepoFiles(reponame, files) {
  let table = document.getElementById("welcome");
  console.log("Second Set", table);
  let userHeading = document.createElement("h3");
  userHeading.classList = "col-12 text-center";
  userHeading.innerHTML = `${reponame} : ${files.length} files found`;
  table.appendChild(userHeading);

  for (const file of files) {
    table.appendChild(createRepoFileRow(file));
    console.log(file);
  }
}

function createRepoFileRow(file) {
  let userRow = document.createElement("div");
  userRow.classList = "col-4 card border border-secondary";

  let userRowBody = document.createElement("div");
  userRowBody.classList = "card-body";

  let heading = document.createElement("p");
  heading.classList = "font-italic";
  heading.innerHTML = `File Name: ${file.name}`;

  let headingType = document.createElement("p");
  headingType.classList = "font-italic";
  headingType.innerHTML = `File Type: ${file.type}`;

  userRowBody.append(heading, headingType);
  userRow.append(userRowBody);
  return userRow;
}

async function findRepositoriesByUser(user) {
  let userRepositoryUrl = user.repos_url;
  let repo = await fetch(repoUrl, {
    headers: {
      Accept: "application / vnd.github.v3 + json",
    },
  }).then((response) => response.json());
}

window.onload = function () {
  search("");
};
