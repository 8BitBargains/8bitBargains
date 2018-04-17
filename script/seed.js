/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Game} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const games = await Promise.all([
    Game.create({title: 'F-Zero', price: '3400', description: "F-Zero (stylized as F-ZERO) is a game for the SNES made by Shigeru Miyamoto first released in Japan in 1990 and in North America in 1991. It is the first installment of the F-Zero series.  The game's genre is racing and takes place in the distant future. It is also the first game to feature Captain Falcon, Samurai Goroh, Pico, and Dr. Stewart. The game was released as a launch game for the SNES along with Super Mario World. ", cover_url: 'https://vignette.wikia.nocookie.net/nintendo/images/a/a0/FZeroBoxart.jpg/revision/latest?cb=20071214142632&path-prefix=en'}),
    Game.create({title: 'Super Mario World', price: '4100', description: "Super Mario World (JP) (originally released as Super Mario Bros. 4 (JP) in Japan) is a SNES classic released in 1990, 1991 and 1992 by Nintendo. The game has been hailed as one of the many various Super Mario Bros. classics, earned the title of being the best-selling Super NES game of all time, thus has been remade or re-released on various platforms including the Game Boy Advance and the Wii's Virtual Console.", cover_url: 'https://vignette.wikia.nocookie.net/nintendo/images/e/ed/Super_Mario_World_%28NA%29.png/revision/latest?cb=20120509225518&path-prefix=en'}),
    Game.create({title: 'The Legend of Zelda: A Link to the Past', price: '2900', description: "The Legend of Zelda: A Link to the Past (JP) is a Nintendo published and developed title for the Super Nintendo Entertainment System that was released in 1991. Two of gaming's biggest icons - Shigeru Miyamoto and Takashi Tezuka worked on the game as producer and director respectively. The game is oftentimes considered the best bird's eye view Zelda game with a favorable challenge that will require your aptitude in order to complete the entire adventure that, like almost all Zelda games, stars the silent protagonist Link. ", cover_url: 'https://vignette.wikia.nocookie.net/nintendo/images/c/cc/Legend_of_Zelda_A_Link_to_the_Past_%28NA%29.png/revision/latest?cb=20121109190950&path-prefix=en'}),
    Game.create({title: 'Mario Kart 64', price: '3300', description: "Mario Kart 64 (______64, Mario K_to Rokuj_yon) is the second installment in the Mario Kart series. It features updated graphics, all-new courses, different characters and modified gameplay mechanics. It's also the first game in the series to feature Donkey Kong and Wario as playable characters. Mario Kart 64 was released on the Wii Virtual Console in 2007. However, ghosts cannot be saved, as this originally required a seperate peripheral. It was also released on the Wii U Virtual Console. ", cover_url: 'https://vignette.wikia.nocookie.net/nintendo/images/a/ae/Mario_Kart_64_%28NA%29.png/revision/latest?cb=20120803153946&path-prefix=en'}),

  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
