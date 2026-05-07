export type GalleryCategory = 'hands' | 'animals' | 'symbols' | 'faces' | 'frames';

export interface GalleryItem {
  id: string;
  name: string;
  category: GalleryCategory;
  art: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ─── HANDS ───────────────────────────────────────────
  {
    id: 'wave',
    name: 'Wave',
    category: 'hands',
    art: `  \\o/
   |
  / \\`,
  },
  {
    id: 'thumbs-up',
    name: 'Thumbs Up',
    category: 'hands',
    art: `   _
  ( )
 ( | )
  \\|/
 _|||_
|     |
 \\___/`,
  },
  {
    id: 'peace',
    name: 'Peace',
    category: 'hands',
    art: `   /\\
  /  \\
 | \\/ |
 | /\\ |
  \\  /
   \\/`,
  },
  {
    id: 'point-right',
    name: 'Point Right',
    category: 'hands',
    art: `  ,----
 /      >
|       >----->
 \\      >
  \`----`,
  },
  {
    id: 'ok',
    name: 'OK',
    category: 'hands',
    art: `  _
 ( )
 ( )_
  \\|
  / \\
 /   \\`,
  },
  {
    id: 'rock-on',
    name: 'Rock On',
    category: 'hands',
    art: `  |  |
  |  |
  |  |
__|  |__
\\      /
 \\____/`,
  },
  {
    id: 'fist',
    name: 'Fist',
    category: 'hands',
    art: `  ______
 /|_||_\\\\__
(   _    _ _\\
=\`-(_)--(_)-'`,
  },
  {
    id: 'pray',
    name: 'Pray / Hi5',
    category: 'hands',
    art: `  |\\  /|
  | \\/ |
  |    |
  |    |
  |    |
  |    |
   \\  /
    \\/`,
  },

  // ─── ANIMALS ─────────────────────────────────────────
  {
    id: 'cat',
    name: 'Cat',
    category: 'animals',
    art: ` /\\_/\\
( o.o )
 > ^ <`,
  },
  {
    id: 'cat-big',
    name: 'Cat (Big)',
    category: 'animals',
    art: `   /\\___/\\
  (  o o  )
  =( Y )=
     )   (
    (_)-(_)`,
  },
  {
    id: 'dog',
    name: 'Dog',
    category: 'animals',
    art: ` / \\__
(    @\\___
/         O
/   (_____/
/_____/  \\
       u  u`,
  },
  {
    id: 'bunny',
    name: 'Bunny',
    category: 'animals',
    art: ` (\\_/)
 ( -.-)
 (> <)`,
  },
  {
    id: 'bear',
    name: 'Bear',
    category: 'animals',
    art: `  ʕ•ᴥ•ʔ`,
  },
  {
    id: 'bear-big',
    name: 'Bear (Big)',
    category: 'animals',
    art: `  _   _
 (°_°)
 (   )
  | |
 /   \\`,
  },
  {
    id: 'penguin',
    name: 'Penguin',
    category: 'animals',
    art: `   _~_
  (o o)
 /|=o=|\\
/ |   | \\
  |___|
  [   ]
  [   ]
  [___]`,
  },
  {
    id: 'fish',
    name: 'Fish',
    category: 'animals',
    art: `  ><(((°>`,
  },
  {
    id: 'shark',
    name: 'Shark',
    category: 'animals',
    art: `            /
           /
          /
  _______/_______________
 /=======================\\
|  .---.        /|       |
| /     \\      / |       |
||       |    /  |       |
| \\.___./   /   |       |
|          /    |       |
 \\________/_____|_______/`,
  },
  {
    id: 'butterfly',
    name: 'Butterfly',
    category: 'animals',
    art: `  \\     /
   \\   /
>==(_)==>
   /   \\
  /     \\`,
  },

  // ─── SYMBOLS ─────────────────────────────────────────
  {
    id: 'heart',
    name: 'Heart',
    category: 'symbols',
    art: `  ***   ***
 ***** *****
***********
 *********
  *******
   *****
    ***
     *`,
  },
  {
    id: 'heart-small',
    name: 'Heart (Small)',
    category: 'symbols',
    art: ` ♥`,
  },
  {
    id: 'star',
    name: 'Star',
    category: 'symbols',
    art: `    *
   ***
  *****
 *******
  *****
 ** **
*   * *   *`,
  },
  {
    id: 'crown',
    name: 'Crown',
    category: 'symbols',
    art: ` *   *   *
 ** *** **
***|***|***
|         |
|_________|`,
  },
  {
    id: 'diamond',
    name: 'Diamond',
    category: 'symbols',
    art: `    *
   ***
  *****
   ***
    *`,
  },
  {
    id: 'lightning',
    name: 'Lightning',
    category: 'symbols',
    art: `  //
 //
//
\\\\
 \\\\
  \\\\`,
  },
  {
    id: 'skull',
    name: 'Skull',
    category: 'symbols',
    art: `  ___
 /   \\
| o o |
|  _  |
 \\ = /
  |_|_|`,
  },
  {
    id: 'infinity',
    name: 'Infinity',
    category: 'symbols',
    art: `  __   __
 /  \\_/  \\
|    _    |
 \\__/ \\__/`,
  },
  {
    id: 'peace-sym',
    name: 'Peace Symbol',
    category: 'symbols',
    art: `   ___
  / | \\
 /  |  \\
|   |   |
 \\  |  /
  \\_|_/`,
  },
  {
    id: 'yin-yang',
    name: 'Yin Yang',
    category: 'symbols',
    art: `   ,.-''"'-.
 ,'    .    ',
;     (o)    ;
|   ,-. '-'  |
|  (   )      |
 \\  '-' (o) /
  ',       ,'
    '-...-'`,
  },

  // ─── FACES ───────────────────────────────────────────
  {
    id: 'smile',
    name: 'Happy',
    category: 'faces',
    art: `  ___
 /   \\
| ^_^ |
|  w  |
 \\___/`,
  },
  {
    id: 'wink',
    name: 'Wink',
    category: 'faces',
    art: `  ___
 /   \\
| ^_~ |
|  w  |
 \\___/`,
  },
  {
    id: 'cool',
    name: 'Cool',
    category: 'faces',
    art: `  ___
 /   \\
|[o_o]|
|  =  |
 \\___/`,
  },
  {
    id: 'love',
    name: 'Love',
    category: 'faces',
    art: `  ___
 /   \\
| ♥_♥ |
|  u  |
 \\___/`,
  },
  {
    id: 'angry',
    name: 'Angry',
    category: 'faces',
    art: '  ___\n /   \\\n| >.<  |\n|  w  |\n \\___/',
  },
  {
    id: 'shocked',
    name: 'Shocked',
    category: 'faces',
    art: `  ___
 /   \\
| o_O |
|  O  |
 \\___/`,
  },
  {
    id: 'crying',
    name: 'Crying',
    category: 'faces',
    art: `  ___
 /   \\
|;_; |
|  _  |
 \\___/`,
  },
  {
    id: 'lenny',
    name: 'Lenny',
    category: 'faces',
    art: `( ͡° ͜ʖ ͡°)`,
  },
  {
    id: 'tableflip',
    name: 'Table Flip',
    category: 'faces',
    art: `(╯°□°）╯︵ ┻━┻`,
  },
  {
    id: 'shrug',
    name: 'Shrug',
    category: 'faces',
    art: `¯\\_(ツ)_/¯`,
  },
  {
    id: 'bear-face',
    name: 'Bear Face',
    category: 'faces',
    art: `ʕ •ᴥ•ʔ`,
  },
  {
    id: 'kawaii',
    name: 'Kawaii',
    category: 'faces',
    art: `(づ｡◕‿‿◕｡)づ`,
  },

  // ─── FRAMES ──────────────────────────────────────────
  {
    id: 'frame-simple',
    name: 'Simple Box',
    category: 'frames',
    art: `+----------+
|          |
|  TEXT    |
|          |
+----------+`,
  },
  {
    id: 'frame-double',
    name: 'Double Box',
    category: 'frames',
    art: `╔══════════╗
║          ║
║  TEXT    ║
║          ║
╚══════════╝`,
  },
  {
    id: 'frame-rounded',
    name: 'Rounded Box',
    category: 'frames',
    art: `╭──────────╮
│          │
│  TEXT    │
│          │
╰──────────╯`,
  },
  {
    id: 'frame-stars',
    name: 'Star Frame',
    category: 'frames',
    art: `* * * * * * *
*           *
*   TEXT    *
*           *
* * * * * * *`,
  },
  {
    id: 'frame-hash',
    name: 'Hash Frame',
    category: 'frames',
    art: `#############
#           #
#   TEXT    #
#           #
#############`,
  },
  {
    id: 'frame-slash',
    name: 'Slash Frame',
    category: 'frames',
    art: `/\\/\\/\\/\\/\\/\\/\\
\\/            /\\
/\\   TEXT   \\/
\\/            /\\
/\\/\\/\\/\\/\\/\\/\\`,
  },
  {
    id: 'frame-block',
    name: 'Block Frame',
    category: 'frames',
    art: `█████████████
█           █
█  TEXT     █
█           █
█████████████`,
  },
  {
    id: 'frame-dots',
    name: 'Dot Frame',
    category: 'frames',
    art: `·  ·  ·  ·  ·
·            ·
·   TEXT     ·
·            ·
·  ·  ·  ·  ·`,
  },
];

export const CATEGORIES: { id: GalleryCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'hands', label: 'Hands' },
  { id: 'animals', label: 'Animals' },
  { id: 'symbols', label: 'Symbols' },
  { id: 'faces', label: 'Faces' },
  { id: 'frames', label: 'Frames' },
];
