import fetch from 'isomorphic-fetch'

export const api = {
  cells: {
    fetch: ({id}) =>
      fetch('http://localhost:5200/v1/cells/by-game/' + id)
      .then(response => response.json()),
  },

  games: {
    fetch: () =>
      fetch('http://localhost:5200/v1/games')
      .then(response => response.json()),
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
