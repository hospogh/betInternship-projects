(function () {
    function makeNotEnumerable(obj) {
        Object.keys(obj).forEach(function(key) {
            Object.defineProperty(obj, key, {enumerable: false});
        });
    }

    function inherit(SubClass, BaseClass) {
        SubClass.prototype = Object.create(BaseClass.prototype, {
            constructor: {
                value: SubClass,
                configurable: true,
                writable: true
            }
        });
    }


    function Renderable() {}
    Renderable.prototype.render = function() {
        throw new Error('render is not implemented');
    };


    function MenuItem(title, link) {
        this.$title = title || 'no title';
        this.$link = link || '#';
    }
    inherit(MenuItem, Renderable);
    MenuItem.prototype.render = function() {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = this.$link;
        a.innerText = this.$title;

        li.appendChild(a);
        return li;
    };


    function ExpandableMenuItem(title, link, children) {
        MenuItem.call(this, title, link);

        this.$subMenu = new Menu(children);
    }
    inherit(ExpandableMenuItem, MenuItem);

    var expandClass = 'expanded';
    var clickHandler = function(ev) {
        var t = ev.currentTarget;

        if(t.classList.contains(expandClass)) {
            t.classList.remove(expandClass);
        } else {
            t.classList.add(expandClass);
        }
    };
    ExpandableMenuItem.prototype.render = function() {
        var li = MenuItem.prototype.render.call(this);
        li.classList.add('expandable');
        li.appendChild(this.$subMenu.render());
        li.addEventListener('click', clickHandler);

        return li;
    };


    function Menu(items) {
        this.$items = items;
    }
    inherit(Menu, Renderable);
    Menu.prototype.render = function() {
        return this.$items.reduce(function(prev, item) {
            prev.appendChild(item.render());

            return prev;
        }, document.createElement('ul'));
    };


    var menu = new Menu([
        new MenuItem('alphabet', 'https://google.com'),
        new MenuItem('nairi'),
        new ExpandableMenuItem('1', '', [
            new MenuItem(),
            new MenuItem(),
            new MenuItem()
        ]),
        new ExpandableMenuItem('2', '', [
            new MenuItem(),
            new MenuItem(),
            new MenuItem()
        ])
    ]);

    var navMenu = document.getElementById('nav-menu');
    navMenu.appendChild(menu.render());
}());
