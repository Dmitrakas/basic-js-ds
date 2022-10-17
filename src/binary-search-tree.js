const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary _findImpl tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    let node = new Node(data);
    if (this._root === null) {
      this._root = node;
    } else {
      this._addImpl(this._root, node);
    }
  }

  _addImpl(parent, node) {
    if (node.data < parent.data) {
      if (parent.left === null) {
        parent.left = node;
      } 
      else {
        this._addImpl(parent.left, node)
      }
    } 
    else {
      if (parent.right === null) {
        parent.right = node;
      } 
      else {
        this._addImpl(parent.right, node)
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return this._findImpl(this._root, data);
  }

  _findImpl(node, data) {
    if (node === null) {
      return null;
    } 
    else if (data < node.data) {
      return this._findImpl(node.left, data);
    } 
    else if (data > node.data) {
      return this._findImpl(node.right, data);
    }
    else {
      return node;
    }
  }

  remove(data) {
    this._root = this._removeImpl(this._root, data);
  }

  _removeImpl(node, data) {
    if (node === null) {
      return null;
    } 
    else if (data < node.data) {
      node.left = this._removeImpl(node.left, data);
      return node;
    } 
    else if (data > node.data) {
      node.right = this._removeImpl(node.right, data);
      return node;
    }
    else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      else if (node.left === null) {
        node = node.right;
        return node;
      } 
      else if (node.right === null) {
        node = node.left;
        return node;
      } 
      else {
        let temp = this._minImpl(node.right);
        node.data = temp.data;
        node.right = this._removeImpl(node.right, temp.data);
        
        return node;
      }
    }
  }

  min() {
    return this._minImpl(this._root).data;
  }

  _minImpl(node) {
    if (node.left === null) {
      return node;
    }
    else {
      return this._minImpl(node.left);
    }
  }

  max() {
    return this._maxImpl(this._root);
  }

  _maxImpl(node) {
    if (node.right === null) {
      return node.data;
    } 
    else {
      return this._maxImpl(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};