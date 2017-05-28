function makeNotEnumerable(obj) {
    Object.keys(obj).forEach(function(key) {
        Object.defineProperty(proto, key, {enumerable: false});
    });
}

function Renderable() {}
Renderable.prototype.render = function() {
    throw new Error('rendor is not implemented');
};

function MenuItem(title, link) {
    this.$title = title || 'no title';
    this.$link = link || '#';
}
MenuItem.prototype = Object.create(Renderable.prototype, {
        constructor: {
            value: MenuItem,
            configurable: true,
            writable: true
        }
    });
MenuItem.prototype.render = function() {
    return '<li class="expandable">' +
    '<a href="' + this.$link + '">' + this.$title + '</a>' +
    this.$subMenu.render() +'</li>';
};

function ExpandableMenuItem(title, link, children) {
    MenuItem.call(this, title, link);
    this.$subMenu = new Menu(children);
}
ExpandableMenuItem.prototype = Object.create(MenuItem.prototype, {
    constructor: {
        value: MenuItem,
        configurable: true,
        writable: true
    }
});

ExpandableMenuItem.prototype.render = function() {
    return '';
}
function Menu(items) {
    this.$items = items;
}
Menu.prototype = Object.create(Renderable.prototype, {
    constructor: {
        value: Menu,
        configurable:true,
        writable: true
    }
});
Menu.prototype.render = function() {
    var children this.$items.reduce(function(prev,item) {
        return prev + '\n' + item.render();
    }, '');
    return '<ul>' + children + '</ul>';
}
