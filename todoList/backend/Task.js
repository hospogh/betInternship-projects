/**
 * Created by hospogh on 6/25/17.
 */

'use strict';

const {createGUID} = require('./common');
const fs = require('fs');
const tasksDbPath = 'backend/dbs/tasks.db.json';
class Task {
    constructor(data) {
        this.id = data.id || createGUID();
        this.name = data.name;
        this.done = data.done || false;
        this.time = data.time || null;
    }

    static getAllTAsks() {
        return JSON.parse(fs.readFileSync(tasksDbPath));
    }

    static getTaskById(id) {
        return this.getAllTAsks().find(task => task.id === id);
    }

    static saveTasks(taskList) {
        fs.writeFileSync(tasksDbPath, JSON.stringify[taskList]);
    }

    static addTask(task) {
        const allTasks = this.getAllTAsks();
        allTasks.push(task);
        this.saveTasks(allTasks)
    }

    static updateTask(data) {
        const allTasks = this.getAllTAsks();
        const task = allTasks.find(task => task.id === data.id);

        task.name = data.name;
        task.done = data.done;
        task.time = data.time;

        this.saveTasks(allTasks);
    }

    static deleteTask(id) {
        const allTasks = this.getAllTAsks();
        const ind = allTasks.findIndex(task => task.id === data.id);

        ind >= 0 && allTasks.splice(ind, 1);

        this.saveTasks(allTasks);
    }

}

module.exports = Task;