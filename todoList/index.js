/**
 * Created by hospogh on 6/25/17.
 */

'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Task = require('./backend/Task');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('wwwroot'))

app.get('/task/read', (req, res) => {
    res.json(Task.getTaskById(req.param('id')));
});

app.post('/task/create', (req, res) => {
    const task = new Task(req.body);
    Task.addTask(task);
    res.json(task);
});

app.post('/task/:taskId', (req, res) => {
    res.json(Task.getTaskById(req.params.taskId));
});
app.delete('/task/:taskId', (req, res) => {
    res.json(Task.getTaskById(req.params.taskId));
});
app.listen(4567, function () {
    console.log('Example app listening on port 4567!');
})