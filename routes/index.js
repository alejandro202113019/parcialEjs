const routes = require('express').Router()
const players = require('../data/players.json');
routes.get('/', (req, res) => {
  const { search } = req.query;

  // Filtrar jugadores si hay un criterio de búsqueda
  const filteredPlayers = search
    ? players.filter(player =>
        player.name.toLowerCase().includes(search.toLowerCase()) ||
        player.team.toLowerCase().includes(search.toLowerCase())
      )
    : players;

    res.render('index', {
      title: 'Football Players', // Aquí defines el título
      players: filteredPlayers,
      search
    });
});

module.exports = routes  
  