/**
 * Created by hakobpogh on 5/21/17.
 */

(function() {
    'use strict';

    function IRenderable() {}
    IRenderable.prototype.render = function() {
        throw new Error('the render function of a renderable is not implemented');
    };

    function inherit(SubClass, SuperClass) {
        SubClass.prototype = Object.create(SuperClass.prototype, {
            constructor: {
                value: SubClass,
                configurable: true,
                writable: true
            }
        });
    }


    function Menu(options) {
        IRenderable.call(this);

        this.menuItems = options.children.map(function(itemConfig) {
            if(itemConfig.isSeparator) {
                return new MenuItemSeparator();
            }

            return new MenuItem(itemConfig);
        });
        this.isHorizontal = !!options.isHorizontal;
    }
    inherit(Menu, IRenderable);
    Menu.prototype.render = function() {
        var elem = document.createElement('div');
        elem.classList.add('menu');
        elem.classList.add(this.isHorizontal ? 'horizontal' : 'vertical', 'shadow-level-1');

        this.menuItems.forEach(function(item) {
            elem.appendChild(item.render());
        });

        return elem;
    };

    function MenuItemBase() {}
    inherit(MenuItemBase, IRenderable);
    MenuItemBase.prototype.render = function() {
        var elem = document.createElement('div');
        elem.classList.add('menu-item');

        return elem;
    };

    function MenuItem(options) {
        MenuItemBase.call(options);

        this.text = options.text;
        var subMenu = options.subMenu;
        this.subMenu = subMenu ? new Menu(subMenu) : null;
        this.isComplex = !!options.isComplex;
        this.iconClass = options.iconClass;
    }
    inherit(MenuItem, MenuItemBase);
    MenuItem.prototype.render = function() {
        var elem = MenuItemBase.prototype.render.call(this);

        if(this.isComplex) {
            elem.classList.add('complex');
        }

        var span = document.createElement('span');
        span.innerText = this.text;
        elem.appendChild(span);

        var iconClass = this.iconClass;
        if(iconClass) {
            var iconElem = document.createElement('span');
            iconElem.classList.add('icon', iconClass);
            elem.appendChild(iconElem);
        }

        var subMenu = this.subMenu;
        if(subMenu) {
            elem.appendChild(subMenu.render());
        }

        return elem;
    };

    function MenuItemSeparator() {}
    inherit(MenuItemSeparator, MenuItemBase);
    MenuItemSeparator.prototype.render = function() {
        var elem = MenuItemBase.prototype.render.call(this);
        elem.classList.add('separator');

        return elem;
    };


    var options = {
        children: [
            {
                text: 'File',
                subMenu: {
                    children: [
                        {text: 'Share...'},
                        {isSeparator: true},
                        {
                            text: 'New',
                            subMenu: {
                                children: [
                                    {text: 'Document'},
                                    {text: 'Spreadsheet'}
                                ]
                            },
                            isComplex: true
                        },
                        {text: 'Open...'},
                        {
                            text: 'Move to...',
                            iconClass: 'folder'
                        }
                    ]
                }
            }
        ],
        isHorizontal: true
    };

    var myMenu = new Menu(options);

    document.body.appendChild(myMenu.render());
}());
