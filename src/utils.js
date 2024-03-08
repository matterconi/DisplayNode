class Tree {
    constructor() {
        this.root = null;
        this.version = 0;
    }
    addNode(node) {
        node = new Node(node);
        if (!this.root) {
            this.root = node;
            return;
        }

        let currentNode = this.root;

        while (currentNode) {
            if (!currentNode.left && node.data < currentNode.data) {
                currentNode.left = node;
                break;
            }
            if (!currentNode.right && node.data > currentNode.data) {
                currentNode.right = node;
                break;
            }
            currentNode = node.data < currentNode.data ? currentNode.left : currentNode.right
        }
    }

    hasNode(number) {
        let currentNode = this.root;
        while (currentNode) {
            if (number === currentNode.data) {
                return true
            }
            currentNode = number < currentNode.data ? currentNode.left : currentNode.right;
        }
        return false;
    }

    static cloneNode(node) {
        if (node === null) {
          return null;
        }
        const newNode = new Node(node.data); // Use 'data' instead of 'value'
        newNode.left = Tree.cloneNode(node.left); // Recursively clone the left subtree
        newNode.right = Tree.cloneNode(node.right); // Recursively clone the right subtree
        return newNode;
      }
    
      // Method to clone the entire tree
      clone() {
        const newTree = new Tree(); // Create a new tree instance
        newTree.root = Tree.cloneNode(this.root); // Use the helper function to clone the root and its subtrees
        return newTree; // Return the new tree instance
      }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

const generateRandomTree = (array) => {
    const tree = new Tree();
    for (let i = 0; i < array.length; i++) {
        tree.addNode(array[i]);
    }
    return tree;
}

export { Tree, generateRandomTree };