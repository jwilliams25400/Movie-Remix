const db = require('../config/connection');
const { User, Movies } = require('../models');
const userSeeds = require('./userSeeds.json');
const movieSeeds = require('./movieSeeds.json');

db.once('open', async () => {
  try {
    await Movies.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < movieSeeds.length; i++) {
      const { _id, director } = await Movies.create(movieSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: director },
        {
          $addToSet: {
            movies: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
