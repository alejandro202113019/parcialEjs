const express = require('express');
const routes = express.Router();
const players = require('../data/players.json');
const departments = require('../data/departments.json');
const municipalities = require('../data/towns.json');

const departmentMap = new Map(departments.map(dept => [dept.code, dept.name]));
const municipalityMap = new Map(municipalities.map(town => [town.code, town.name]));

function mapPlayerData(players) {
    return players.map(player => ({
        ...player,
        birthDepartment: departmentMap.get(player.birthDepartment) || player.birthDepartment,
        birthMunicipality: municipalityMap.get(player.birthMunicipality) || player.birthMunicipality
    }));
}
routes.get('/', (req, res) => {
  const playersWithNames = mapPlayerData(players);
  res.render('index', { 'title': 'Página Principal', players: playersWithNames });
});

routes.get('/departments', (req, res) => {
  res.json(departments);
});

routes.get('/municipalities/:departmentCode', (req, res) => {
  const departmentCode = req.params.departmentCode;
  const filteredMunicipalities = municipalities.filter(
    (municipality) => municipality.department === departmentCode
  );
  res.json(filteredMunicipalities);
});

module.exports = routes;
