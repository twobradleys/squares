import fetch from 'isomorphic-fetch'

export const api = {
  cells: {
    fetch: ({collectionId}) =>
      fetch('http://localhost:5200/v1/cells/by-game/' + collectionId)
      .then(response => response.json()),
  },

  games: {
    fetch: () =>
      fetch('http://localhost:5200/v1/games')
      .then(response => response.json()),
  },

  offers: {
    create: ({game_id, home_index, away_index, player_id, price, type}) =>
      fetch(`http://localhost:5200/v1/offer/${game_id}/by-index/${home_index}/${away_index}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({away_index, home_index, player_id, price, type})
      })
  },

  players: {
    fetch: () =>
      fetch('http://localhost:5200/v1/players')
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response)
        }
      }),

    create: ({handle}) =>
      fetch('http://localhost:5200/v1/player', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({handle})
      })
  },

  teams: {
    fetch: () =>
      fetch('http://localhost:5200/v1/teams/by-sport/football')
      .then(response => response.json()),

    create: ({name}) =>
      fetch('http://localhost:5200/v1/team', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, sport: 'football'})
      }),

  },
}
