import express from 'express';
import bodyParser from 'body-parser';
import {exec} from 'child_process';
import Handlebars from 'handlebars';
import fs from 'fs';
import lescape from 'escape-latex';

const data = fs.readFileSync('template.tex', 'utf8');

const template = Handlebars.compile(data);

const server = express();
server.use(bodyParser.json());

function escape(obj) {
  const escaped = {};
  Object.keys(obj).forEach((key, idx) => {
    escaped[key] = lescape(obj[key]);
  });
  return (escaped);
}

server.post('/submit', function(req, res) {
  const safe = escape(req.body);
  const path = 'lomake_' + (new Date()).getTime();
  fs.writeFile(path + '.tex', template(safe), 'utf8', (err) => {
    exec('pdflatex -output-format=pdf ' + path + '.tex', (a,b,c) => {
      fs.unlink(path + '.aux', (err) => {})
      fs.unlink(path + '.log', (err) => {})
      fs.unlink(path + '.tex', (err) => {})
    });
  });
  res.send();
});

server.listen(3001)
