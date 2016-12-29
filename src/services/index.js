import fetch from 'isomorphic-fetch'

export const api = {
  getTeams: () =>
    fetch('http://localhost:5200/v1/teams/by-sport/football')
    .then(response => response.json()),

  createTeam: ({name}) =>
    fetch('http://localhost:5200/v1/team', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, sport: 'football'})
    }),

  getGames: () =>
    fetch('http://localhost:5200/v1/games')
    .then(response => response.json()),
}
