import fetch from 'isomorphic-fetch'

export const api = {
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
    create: (player) =>
      fetch('http://localhost:5200/v1/player', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(player)
      })
  },


  getGames: () =>
    fetch('http://localhost:5200/v1/games')
    .then(response => response.json()),

  getTeams: () =>
    fetch('http://localhost:5200/v1/teams/by-sport/football')
    .then(response => response.json()),

  createTeam: ({name}) =>
    fetch('http://localhost:5200/v1/team', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, sport: 'football'})
    }),

}
