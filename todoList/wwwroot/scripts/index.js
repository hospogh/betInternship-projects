/**
 * Created by hospogh on 6/25/17.
 */

(function () {
    'use strict';

    const pageContent = $('.page-content');

    class TodoItem {
        constructor(data) {
            this.id = data.id;
            this.name = data.name;
            this.done = data.done;
            this.time = data.time;
            this.render();
        }

        render() {
            if (this.elem) {
                return this.elem;
            }
            const elem = this.elem = $('<div class="todo-item">');
            $('<input type="checkbox"/>').val(this.done).appendTo(elem);
            $('<span>').text(this.name).appendTo(elem);
            $('<b>').text(this.time).appendTo(elem);
            return elem;
        }
    }

    $.ajax({
        url: '/task/readAll',
        dataType: 'json',
        success: (allTasks) => {
            const todoItems = $('<div class="todo-item-list">').appendTo(pageContent);

            allTasks.forEach(data => {
                const task = new TodoItem(data);
                task.elem.appendTo(todoItems);
            })
        }
    })
}());


