const usernames = [
  "Godfrey",
  "Mugume",
  "Emma",
  "George",
  "Ivan",
  "Daniel",
  "shilla",
  "ketty",
  "sharon",
];
const emails = [
  "godfrey@hotmail.com",
  "mugume@yahoo.com",
  "emmanuel@hotmail.com",
  "george@gmail.com",
  "ivan@hotmail.com",
  "daniel@gmail.com",
  "shilla@gmail.com",
  "ketty@hotmail.com",
  "sharon@yahoo.com",
];
const reactions = [
  "this is amazing",
  "i love this",
  "this is awesome",
  "convallis aenean et",
  "enim diam vulputate",
  "purus non enim",
  "amet porttitor eget",
  "nec dui nunc",
  "lorem ipsum dolor",
];

const thoughtText = [
  "Lorem ipsum dolor sit amet",
  "consectetur adipiscing elit",
  "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "Ut enim ad minim veniam",
  "laboris nisi ut aliquip ex ea commodo consequat",
  "Duis aute irure dolor in reprehenderit in voluptate velit",
  "Excepteur sint occaecat cupidatat non proident",
  "quis nostrud exercitation ullamco",
  "sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomUserName = () => `${getRandomArrItem(usernames)}`;
const getEmail = () => `${getRandomArrItem(emails)}`;
const getThought = () => `${getRandomArrItem(thoughtText)}`;

const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(usernames),
    });
  }
  return results;
};

module.exports = {
  getRandomUserName,
  getRandomReactions,
  getEmail,
  getThought,
};
