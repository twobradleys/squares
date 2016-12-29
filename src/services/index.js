import fetch from 'isomorphic-fetch'

export const api = {
  // TODO await instead of then?
  getTeams: () =>
    fetch('http://localhost:5200/v1/teams/by-sport/football')
      .then(response => response.json())
}
