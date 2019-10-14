const express = require('express');

const server = express();

server.use(express.json());

const project = { id: '1', title: 'First Project', tasks: [] };

const projects = [project];

const aux = "Requisições";

function checkProjectExists(req, res, next) {
  if (typeof projects[req.params.id] === 'undefined') {
    return res.status(400).json({ error: 'Project does not exist!' });
  }

  next();
}

server.use((req, res, next) => {
  console.count(aux);
  next();
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  const project = { id: id, title: title, tasks: [] };

  projects.push(project);

  return res.json(projects);
});

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].title = title;

  return res.json(projects);
});

server.post('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  projects[id].tasks.push(title);

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.listen(3000);