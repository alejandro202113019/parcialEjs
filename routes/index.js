const express = require('express');
const routes = express.Router();
const players = require('../data/players.json');
const departments = require('../data/departments.json');
const municipalities = require('../data/towns.json');

// Ruta para la página principal
routes.get('/', (req, res) => {
  res.render('index', { 'title':'Página Principal', players });
});

// Ruta para obtener departamentos
routes.get('/departments', (req, res) => {
  res.json(departments);
});

// Ruta para obtener municipios por departamento
routes.get('/municipalities/:departmentCode', (req, res) => {
  const departmentCode = req.params.departmentCode;
  const filteredMunicipalities = municipalities.filter(
    (municipality) => municipality.department === departmentCode
  );
  res.json(filteredMunicipalities);
});

module.exports = routes;