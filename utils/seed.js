const connection = require("../config/connection");
const { User, Thought } = require("../model");
const {
  getRandomUserName,
  getRandomReactions,
  getEmail,
  getThought,
} = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const thoughts = [];

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 3; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(3);

    const username = getRandomUserName();
    const thoughtText = getThought();

    thoughts.push({
      username,
      thoughtText,
      reactions,
    });
  }

  // Add students to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Add courses to the collection and await the results
  const email = getEmail(3);
  const username = getRandomUserName(3);
  await User.collection.insertOne({
    username,
    email,
    thoughts: [...thoughts],
  });
  // await User.collection.insertOne({
  //   username,
  //   email,
  //   thoughts: [...thoughts],
  // });
  // Log out the seed data to indicate what should appear in the database
  console.table(thoughts);
  console.table(User);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
