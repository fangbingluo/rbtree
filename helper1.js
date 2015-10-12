'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _ = require('lodash');

function Node(key, lChild, rChild, color) {
    this.key = key;
    this.lChild = lChild;
    this.rChild = rChild;
    this.color = color;
    this.parent = null;
}

var rbtree = (function () {
    function rbtree() {
        _classCallCheck(this, rbtree);

        this.root = null;
    }

    _createClass(rbtree, [{
        key: 'getUncle',
        value: function getUncle(node) {
            var gradPa = this.getGrandparent(node);
            if (_.isNull(gradPa)) return null;
            if (node.parent == gradPa.lChild) return gradPa.rChild;else return gradPa.lChild;
        }
    }, {
        key: 'getGrandparent',
        value: function getGrandparent(node) {
            if (!_.isNull(node) && !_.isNull(node.parent)) return node.parent.parent;else return null;
        }
    }, {
        key: 'constraints1',
        value: function constraints1(node) {
            if (_.isNull(node.parent)) node.color = 'black';else this.constraints2(node);
        }
    }, {
        key: 'constraints2',
        value: function constraints2(node) {
            if (node.parent.color == 'black') return;else this.constraints3(node);
        }
    }, {
        key: 'constraints3',
        value: function constraints3(node) {
            var uncle = this.getUncle(node);
            if (!_.isNull(uncle) && uncle.color == 'red') {
                node.parent.color = 'balck';
                uncle.color = 'black';
                var gradPa = this.getGrandparent(node);
                gradPa.color = 'red';
                this.constraints1(gradPa);
            } else {

                this.constraints4(node);
            }
        }
    }, {
        key: 'constraints4',
        value: function constraints4(node) {
            var gradPa = this.getGrandparent(node);
            if (node == node.parent.rChild && node.parent == gradPa.lChild) {
                temp1 = node.parent.lChild;
                temp2 = node.lChild;
                gradPa.lChild = node;
                node.lChild = temp1;
                temp1.rChild = temp2;
                node = node.lChild;
            } else if (node == node.parent.lChild && node.parent == gradPa.rChild) {
                temp1 = node.parent.rChild;
                temp2 = node.rChild;
                gradPa.rChild = node;
                node.rChild = temp1;
                temp1.lChild = temp2;
                node = node.rChild;
            }
            this.constraints5(node);
        }
    }, {
        key: 'constraints5',
        value: function constraints5(node) {
            var gradPa = this.getGrandparent(node);
            node.parent.color = 'black';
            gradPa.color = 'red';

            if (gradPa == this.root) {
                this.root = node.parent;
                node.parent.parent = null;
            }
            if (!_.isNull(gradPa.parent)) {

                if (gradPa == gradPa.parent.lChild) gradPa.parent.lChild = node.parent;else if (gradPa == gradPa.parent.rChild) gradPa.parent.rChild = node.parent;
            }
            if (node == node.parent.lChild) {

                var temp1 = node.parent.rChild;
                node.parent.rChild = gradPa;
                gradPa.lChild = temp1;
                gradPa.parent = node.parent;
            } else {
                var temp1 = node.parent.lChild;
                node.parent.lChild = gradPa;
                gradPa.rChild = temp1;
                gradPa.parent = node.parent;
            }
        }
    }, {
        key: 'output',
        value: function output() {
            var temp = this.root;
            console.log(tree);
        }
    }, {
        key: 'insert',
        value: function insert(key) {
            var insertNode = new Node(key, null, null, 'red');
            if (_.isNull(this.root)) {
                this.root = insertNode;
                this.parent = null;
                this.constraints1(insertNode);
            } else {
                var temp = this.root;
                while (!_.isNull(temp)) {
                    insertNode.parent = temp;
                    if (key > temp.key) temp = temp.rChild;else if (key < temp.key) temp = temp.lChild;else {
                        console.log("the node is already exist");
                        break;
                    }
                }
                if (key < insertNode.parent.key) insertNode.parent.lChild = insertNode;else if (key > insertNode.parent.key) insertNode.parent.rChild = insertNode;

                this.constraints1(insertNode);
            }
        }
    }, {
        key: 'getSibling',
        value: function getSibling(node) {
            if (_.isNull(node.parent)) return null;
            if (_.isNull(node.parent.lChild)) return null;else if (_.isNull(node.parent.rChild)) return null;else if (node.parent.lChild == node) return node.parent.rChild;else return node.parent.lChild;
        }
    }, {
        key: 'rotate_left',
        value: function rotate_left(node) {
            var sibling = this.getSibling(node);
            if (_.isNull(sibling)) return null;
            temp = sibling.lChild;
            if (!_.isNull(node.parent.parent)) {
                sibling.parent = node.parent.parent;
                if (node.parent == node.parent.parent.lChild) node.parent.parent.lChild = sibling;else node.parent.parent.rChild = sibling;
            } else sibling.parent = null;

            node.parent.parent = sibling;
            sibling.lChild = node.parent;
            node.parent.rChild = temp;
        }
    }, {
        key: 'rotate_right',
        value: function rotate_right(node) {
            var sibling = this.getSibling(node);
            if (_.isNull(sibling)) return null;
            if (!_.isNull(node.parent.parent)) {
                sibling.parent = node.parent.parent;
                if (node.parent == node.parent.parent.lChild) node.parent.parent.lChild = sibling;else node.parent.parent.rChild = sibling;
            } else sibling.parent = null;

            node.parent.parent = sibling;
            sibling.rChild = node.parent;
            node.parent.lChild = temp;
        }
    }, {
        key: 'deConstraints1',
        value: function deConstraints1(node) {
            if (!_.isNull(node.parent)) this.deConstraints2(node);
        }
    }, {
        key: 'deConstraints2',
        value: function deConstraints2(node) {
            var sibling = this.getSibling(node);

            if (sibling.color == 'red') {
                node.parent.color = 'red';
                sibling.color = 'black';
                if (node == node.parent.lChild) this.rotate_left(node);else if (node == node.parent.rChild) this.rotate_right(node);
            }

            this.deConstraints3(node);
        }
    }, {
        key: 'deConstraints3',
        value: function deConstraints3(node) {
            var sibling = this.getSibling(node);

            if (node.parent.color == 'black' && sibling.color == 'black' && sibling.lChild.color == 'black' && sibling.rChild.color == 'black') {
                sibling.color = 'red';
                this.deConstraints1(node.parent);
            } else {
                this.deConstraints4(node);
            }
        }
    }, {
        key: 'deConstraints4',
        value: function deConstraints4(node) {
            var sibling = this.getSibling(node);
            if (node.parent.color == 'red' && sibling.color == 'black' && sibling.lChild.color == 'black' && sibling.rChild.color == 'black') {
                sibling.color = 'red';
                node.parent.color = 'black';
            } else this.deConstraints5(node);
        }
    }, {
        key: 'deConstraints5',
        value: function deConstraints5(node) {
            var sibling = this.getSibling(node);
            if (sibling.color == 'black') {
                if (node == node.parent.lChild && sibling.rChild.color == 'black' && sibling.lChild.color == 'red') {
                    sibling.color = 'red';
                    sibling.lChild.color = 'black';
                    this.rotate_right(sibling);
                } else if (node == node.parent.rChild && sibling.lChild.color == 'black' && sibling.rChild.color == 'red') {
                    sibling.color = 'red';
                    sibling.rChild.color = 'black';
                    this.rotate_left(sibling);
                }
            }
            this.deConstraints6(node);
        }
    }, {
        key: 'deConstraints6',
        value: function deConstraints6(node) {
            var sibling = this.getSibling(node);
            sibling.color = node.parent.color;
            node.parent.color = 'black';
            if (node == node.parent.lChild) {
                if (!_.isNull(sibling.rChild)) sibling.rChild.color = 'black';

                this.rotate_left(node.parent);
            } else {
                if (!_.isNull(sibling.lChild)) sibling.lChild.color = 'black';

                this.rotate_right(node.parent);
            }
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            var temp = this.root;
            while (!_.isNull(temp)) {
                if (key > temp.key) temp = temp.rChild;else if (key < temp.key) temp = temp.lChild;else break;
            }

            if (_.isNull(temp.lChild) && _.isNull(temp.rChild)) {
                if (temp.color == 'red') temp = null;else {
                    this.deConstraints1(temp);
                    temp = null;
                }
            } else {
                if (!_.isNull(temp.lChild)) var child = temp.lChild;else if (!_.isNull(temp.rChild)) var child = temp.rChild;

                //replace node
                child.parent = temp.parent;
                if (temp = temp.parent.lChild) temp.parent.lChild = child;else if (temp = temp.parent.rChild) temp.parent.rChild = child;

                if (temp.color == 'black') {
                    if (child.color == 'red') child.color = 'black';else this.deConstraints1(child);
                }
            }
        }
    }]);

    return rbtree;
})();

var tree = new rbtree();
tree.insert(1);
tree.insert(5);
tree.insert(7);
tree.insert(3);
tree['delete'](3);
//tree.delete(7);

tree.output();