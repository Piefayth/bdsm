const MOBS_BY_SEASON = {};
const ITEMS_BY_SEASON = {};

export function getDungeon(season, dungeon) {
  if (!(season in MOBS_BY_SEASON)) {
    MOBS_BY_SEASON[season] = {};
  }
  const dungeonsForSeason = MOBS_BY_SEASON[season];

  if (!(dungeon in dungeonsForSeason)) {
    const waves = require(
        '../data/season_' + season + '/mobs/dungeon_' + dungeon + '.json'
    );
    for (const i in waves) {
      const wave = waves[i];
      for (const j in wave) {
        const character = wave[j];
        if ('_stats' in character) {
          delete character['_stats'];
        }
      }
    }
    dungeonsForSeason[dungeon] = waves;
  }

  return dungeonsForSeason[dungeon];
}

export function getItems(season) {
  if (!(season in ITEMS_BY_SEASON)) {
    ITEMS_BY_SEASON[season] = {
      'Passive': require('../data/season_' + season + '/items/passive_items.json'),
      'Energy': require('../data/season_' + season + '/items/energy_items.json')
    };
  }
  return ITEMS_BY_SEASON[season];
}
