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
const db = require('../server/db');
const { User, Product, Genre, System } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({ email: 'admin@admin.com', password: 'admin', isAdmin: true })
  ]);

  const systems = await Promise.all([
    System.create({
      id: 1,
      name: 'NES'
    }),
    System.create({
      id: 2,
      name: 'SNES'
    }),
    System.create({
      id: 3,
      name: 'Nintendo 64'
    }),
    System.create({
      id: 4,
      name: 'Nintendo Gameboy'
    }),
    System.create({
      id: 5,
      name: 'Sega Master System'
    }),
    System.create({
      id: 6,
      name: 'Sega Genesis'
    }),
  ]);

  const genres = await Promise.all([
    Genre.create({
      id: 1,
      name: 'Adventure'
    }),
    Genre.create({
      id: 2,
      name: 'Arcade'
    }),
    Genre.create({
      id: 3,
      name: 'Beat \'em up'
    }),
    Genre.create({
      id: 4,
      name: 'Fighting'
    }),
    Genre.create({
      id: 5,
      name: 'First-Person Shooter'
    }),
    Genre.create({
      id: 6,
      name: 'Metroidvania'
    }),
    Genre.create({
      id: 7,
      name: 'Party'
    }),
    Genre.create({
      id: 8,
      name: 'Platformer'
    }),
    Genre.create({
      id: 9,
      name: 'RPG'
    }),
    Genre.create({
      id: 10,
      name: 'Racing'
    }),
    Genre.create({
      id: 11,
      name: 'Sports'
    }),
    Genre.create({
      id: 12,
      name: 'Strategy'
    }),
    Genre.create({
      id: 13,
      name: 'Shooter'
    }),
    Genre.create({
      id: 14,
      name: 'Puzzle'
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      title: 'F-Zero',
      price: 999,
      inventory: 50,
      genreId: 10,
      systemId: 2,
      description: "F-Zero (stylized as F-ZERO) is a game for the SNES made by Shigeru Miyamoto first released in Japan in 1990 and in North America in 1991. It is the first installment of the F-Zero series.  The game's genre is racing and takes place in the distant future. It is also the first game to feature Captain Falcon, Samurai Goroh, Pico, and Dr. Stewart. The game was released as a launch game for the SNES along with Super Mario World. ",
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/a/a0/FZeroBoxart.jpg/revision/latest?cb=20071214142632&path-prefix=en'
    }),
    Product.create({
      title: 'Super Mario World',
      price: 1299,
      inventory: 50,
      genreId: 8,
      systemId: 2,
      description: "Super Mario World (JP) (originally released as Super Mario Bros. 4 (JP) in Japan) is a SNES classic released in 1990, 1991 and 1992 by Nintendo. The game has been hailed as one of the many various Super Mario Bros. classics, earned the title of being the best-selling Super NES game of all time, thus has been remade or re-released on various platforms including the game Boy Advance and the Wii's Virtual Console.",
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/e/ed/Super_Mario_World_%28NA%29.png/revision/latest?cb=20120509225518&path-prefix=en'
    }),
    Product.create({
      title: 'The Legend of Zelda: A Link to the Past',
      price: 2900,
      inventory: 1299,
      genreId: 1,
      systemId: 2,
      description: "The Legend of Zelda: A Link to the Past (JP) is a Nintendo published and developed title for the Super Nintendo Entertainment System that was released in 1991. Two of gaming's biggest icons - Shigeru Miyamoto and Takashi Tezuka worked on the game as producer and director respectively. The game is oftentimes considered the best bird's eye view Zelda game with a favorable challenge that will require your aptitude in order to complete the entire adventure that, like almost all Zelda games, stars the silent protagonist Link. ",
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/c/cc/Legend_of_Zelda_A_Link_to_the_Past_%28NA%29.png/revision/latest?cb=20121109190950&path-prefix=en'
    }),
    Product.create({
      title: 'Mario Kart 64',
      price: 1499,
      inventory: 50,
      genreId: 10,
      systemId: 3,
      description: "Mario Kart 64 (______64, Mario K_to Rokuj_yon) is the second installment in the Mario Kart series. It features updated graphics, all-new courses, different characters and modified gameplay mechanics. It's also the first game in the series to feature Donkey Kong and Wario as playable characters. Mario Kart 64 was released on the Wii Virtual Console in 2007. However, ghosts cannot be saved, as this originally required a seperate peripheral. It was also released on the Wii U Virtual Console. ",
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/a/ae/Mario_Kart_64_%28NA%29.png/revision/latest?cb=20120803153946&path-prefix=en'
    }),
    Product.create({
      title: 'Donkey Kong Jr.',
      price: 899,
      inventory: 0,
      genreId: 2,
      systemId: 1,
      description: 'Donkey Kong Junior (Donkī Kongu Junia) is a 1982 arcade game by Nintendo. Over the course of the 1980s, it was also released for various console systems, with the form of the title changed to Donkey Kong Jr. in most versions. Its eponymous star, Junior, is trying to rescue his father, who has been captured by Mario—Mario\'s only appearance as the villain in a video game. This game is the sequel to the popular Donkey Kong.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/3/3e/DonkeyKongJr.jpg/revision/latest/scale-to-width-down/250?cb=20090529185655&path-prefix=en'
    }),
    Product.create({
      title: 'Duck Hunt',
      price: 899,
      inventory: 0,
      genreId: 13,
      systemId: 1,
      description: 'Duck Hunt is a light gun game for the Nintendo Entertainment System. It is more commonly known a launch game for the Nintendo Entertainment System in North America (and was actually bundled with the console). The game is based on a Laser Clay Shooting System game of the same name. A VS. version was released in North American arcades in 1984. After that it was released as a combo with Super Mario Bros. and even later it was released as a three game combo with World Class Track Meet. The game play involved shooting virtual ducks that your faithful hunting dog flushes out. If you miss 5 or more or if you reach Round 100 (which in case the screen glitches), you get a game over and the dog laughs at you. If you hit more than 5, you advance to the next level. There are 3 modes, 1 Duck (only one duck at a time), 2 Ducks (2 ducks at once) and Clay Pigeon Shooting, which involved shooting clay disks out of the sky before they land. The shooting game in Wii Play may be based on Duck Hunt. If you get all the ducks or discs in a round, you get a perfect bonus (See point system below).',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/e/e9/DuckHunt_box.jpg/revision/latest/scale-to-width-down/175?cb=20071214124446&path-prefix=en'
    }),
    Product.create({
      title: 'Ice Climber',
      price: 899,
      inventory: 1,
      genreId: 8,
      systemId: 1,
      description: 'Ice Climber (アイスクライマー, Aisu Kuraimā) is a game for the Arcade, originally released as Vs. Ice Climber that was later released for the NES. It consists of two kids, the Ice Climbers, Popo and Nana, as they climb to the top of an icy mountain filled with enemies such as Topis and Polar Bears to stop the evil condor at the top. The player wields a hammer to both kill enemies, and to make openings on the platform above. The game had many remakes, such as an nes game in Animal Crossing. Popo and Nana were featured in the Gamecube\'s Super Smash Bros. Melee, and then appeared again in it\'s sequel, Super Smash Bros. Brawl.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/d/db/NES_Ice_Climber.jpg/revision/latest/scale-to-width-down/250?cb=20081001033851&path-prefix=en'
    }),
    Product.create({
      title: 'Super Mario Bros.',
      price: 899,
      inventory: 3,
      genreId: 8,
      systemId: 1,
      description: 'Super Mario Bros. (JP) is a Nintendo Entertainment System video game released in 1985 by Nintendo. The game, designed by Shigeru Miyamoto and Takashi Tezuka, has become one of the most important and successful video games of all time. \n The second best selling video game (succeeded solely by Wii Sports), Super Mario Bros. has found its way in the homes of over 40 million consumers. It was introduced to many Americans as an arcade title, though the home console version generated more sales.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/3/3d/Super_Mario_Bros._%28NA%29.png/revision/latest/scale-to-width-down/250?cb=20120516222518&path-prefix=en'
    }),
    Product.create({
      title: 'Mike Tyson\'s Punch-Out!!',
      price: 899,
      inventory: 5,
      genreId: 3,
      systemId: 1,
      description: 'Mike Tyson\'s Punch-Out!! (JP) was the first boxing game to be released on the Nintendo Entertainment System. It features the debut of Little Mac and his trainer Doc Louis. It also has recurring figures from the Punch-Out arcades. It is one of the most successful boxing games ever released, with millions sold worldwide. \n A few years after it\'s release, the contract Nintendo had with Mike Tyson expired and was not renewed. This caused Nintendo to alter Tyson\'s name and likeness in the game to a brand new character named Mr. Dream. The box art was also changed and the game was retitled Punch-Out!! Featuring Mr. Dream. Since then, all re-releases of the game have been the Mr. Dream version and not the Mike Tyson version.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/0/04/MikeTysonPunchOut.jpg/revision/latest/scale-to-width-down/230?cb=20090402162228&path-prefix=en'
    }),
    Product.create({
      title: 'Battletoads & Double Dragon',
      price: 899,
      inventory: 40,
      genreId: 3,
      systemId: 1,
      description: 'Battletoads & Double Dragon (stylized as Battletoads / Double Dragon) also known as Battletoads & Double Dragon - The Ultimate Team, is a video game released on the Nintendo Entertainment System, Game Boy and Super Nintendo Entertainment System in 1993 and 1994. It was a crossover between the Battletoads games and Double Dragon games.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/0/09/Battletoads_Double_Dragon_%28NES%29_%28NA%29.jpg/revision/latest/scale-to-width-down/250?cb=20120711171403&path-prefix=en'
    }),
    Product.create({
      title: 'Super Smash Bros.',
      price: 1499,
      inventory: 30,
      genreId: 4,
      systemId: 3,
      description: 'Super Smash Bros. (JP), commonly known as Super Smash Bros. 64, is a fighting game developed by HAL Laboratory and published by Nintendo. It\'s the first installment in the Super Smash Bros. series and then spawned four sequels; Melee, Brawl, and 3DS / Wii U. The game was also made available through the Virtual Console for anyone a with gold membership for Club Nintendo in 2013. The game allows players to fight characters from Nintendo\'s franchises such as Mario, Donkey Kong, Link, Pikachu, Samus Aran, and Kirby.',
      coverUrl: 'https://vignette.wikia.nocookie.net/nintendo/images/a/a9/Super_Smash_Bros._%28NA%29_boxart.jpg/revision/latest/scale-to-width-down/250?cb=20171026230649&path-prefix=en'
    }),
    Product.create({
      title: 'Tetris',
      price: 499,
      inventory: 30,
      genreId: 14,
      systemId: 4,
      description: 'Tetris (テトリス Tetorisu) is a puzzle video game for the Game Boy released in 1989. It is a portable version of Alexey Pajitnov\'s original Tetris and it was bundled in the North American and European releases of the Game Boy itself.It was the first game compatible with the Game Link Cable, a pack -in accessory that allowed two Game Boys to link together for multiplayer purposes. ',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Tetris_Boxshot.jpg'
    }),
    Product.create({
      title: 'Dr. Mario',
      price: 499,
      inventory: 30,
      genreId: 14,
      systemId: 4,
      description: 'Dr. Mario (Japanese: ドクターマリオ, often stylized as D℞. Mario) is a 1990 action puzzle video game produced by Gunpei Yokoi and designed by Takahiro Harada. Nintendo developed and published the game for the Nintendo Entertainment System and Game Boy consoles. The game\'s soundtrack was composed by Hirokazu Tanaka.',
      coverUrl: 'https://images.lukiegames.com/t_300e2/assets/images/GB/gb_dr_mario_p_r2571i.jpg'
    }),
    Product.create({
      title: 'Pokemon Pinball',
      price: 499,
      inventory: 30,
      genreId: 2,
      systemId: 4,
      description: 'Pokémon Pinball (Japanese: ポケモンピンボール Pokémon Pinball) is a spin-off pinball game for the Game Boy Color. The cartridge was unique at the time among Game Boy games in that it includes a rumble pack powered by a single AAA battery, providing force feedback in much the same way as controllers for TV consoles. As the title suggests, the gameplay is pinball-based, but with a uniquely Pokémon-inspired spin.',
      coverUrl: 'https://cdn.bulbagarden.net/upload/thumb/1/16/Pinball_EN_boxart.png/500px-Pinball_EN_boxart.png'
    }),
    Product.create({
      title: 'Metroid II: Return of Samus',
      price: 499,
      inventory: 30,
      genreId: 6,
      systemId: 4,
      description: 'Metroid II: Return of Samus[a] is an action-adventure video game developed and published by Nintendo for the Game Boy handheld game console. The second installment and the first handheld title in the Metroid series, it was released in North America in November 1991, and in Japan and Europe the following year. The story follows the protagonist and playable character Samus Aran, who is sent on a mission to exterminate the Metroid creatures from their home planet SR388 before the antagonistic Space Pirates obtain and use them. The gameplay involves killing a fixed number of Metroids before the player can advance deeper through the planet\'s tunnels.',
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/9/93/Metroid2_boxart.jpg'
    }),
    Product.create({
      title: 'Sonic The Hedgehog',
      price: 999,
      inventory: 30,
      genreId: 8,
      systemId: 6,
      description: 'Sonic The Hedgehog is a video game released for the Sega Genesis in 1991 and developed by Sonic Team. Due to its success, it spawned the Sonic franchise and was ported to various platforms.',
      coverUrl: 'http://img2.game-oldies.com/sites/default/files/packshots/sega-genesis/sonic-the-hedgehog-usa-europe.png'
    }),
    Product.create({
      title: 'Earthworm Jim',
      price: 999,
      inventory: 30,
      genreId: 8,
      systemId: 6,
      description: 'Earthworm Jim is a 1994 run and gun platform game developed by Shiny Entertainment, featuring an earthworm named Jim, who wears a robotic suit and battles evil. The game was released for the Sega Genesis, and subsequently ported to a number of other video game consoles. The game plays as a 2D sidescrolling platformer with elements of a run and gun game as well. The player controls Jim and must maneuver him through the level while avoiding obstacles and enemies.',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51uOk%2B3Kh5L.jpg'
    }),
    Product.create({
      title: 'Golden Axe',
      price: 999,
      inventory: 30,
      genreId: 3,
      systemId: 6,
      description: 'Golden Axe (ゴールデンアックス Gooruden Akkusu) is a side-scrolling, beat \'em up, arcade video game released in 1989 by Sega for the System 16-B arcade hardware.[1] It is the first game in the Golden Axe series. Makoto Uchida was the lead designer of the game, and also was responsible for the creation of Altered Beast. The game was ported to the Sega Genesis and Master System consoles, among many other systems.',
      coverUrl: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic.giantbomb.com%2Fuploads%2Foriginal%2F9%2F93770%2F2370592-genesis_goldenaxe.jpg&f=1'
    }),
    Product.create({
      title: 'Ghouls \'n Ghosts',
      price: 999,
      inventory: 30,
      genreId: 8,
      systemId: 6,
      description: 'Ghouls \'n Ghosts (Japanese: 大魔界村 Hepburn: Daimakaimura, lit. Great Demon World Village) is a side-scrolling platform game developed by Capcom and released as an arcade game in 1988, and subsequently ported to a number of other platforms. It is the sequel to Ghosts \'n Goblins and the second game in the Ghosts \'n Goblins series.',
      coverUrl: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.retrogamecases.com%2Fwp-content%2Fuploads%2Fgenesis_ghoulsnghosts_front.jpg&f=1'
    }),
    Product.create({
      title: 'Phantasy Star',
      price: 799,
      inventory: 30,
      genreId: 8,
      systemId: 5,
      description: 'Phantasy Star (ファンタシースター) is a 1987 role-playing game developed and published by Sega. It is the first in a long line of Phantasy Star games, and is often considered one of the best games for the Sega Master System. ',
      coverUrl: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.nintendolife.com%2Fgames%2Fmastersystem%2Fphantasy_star%2Fcover_large.jpg&f=1'
    })
    // Product.create({title: , price: , description: , cover_url: }),
  ]);

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${systems.length} systems`);
  console.log(`seeded ${genres.length} genres`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
