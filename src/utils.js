import { keccak256 } from 'ethereum-cryptography/keccak';
import { utf8ToBytes  } from 'ethereum-cryptography/utils';

class BinaryTree {
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
            currentNode = node.data < currentNode.data ? currentNode.left : currentNode.right;
        }
    }

    hasNode(number) {
        let currentNode = this.root;
        while (currentNode) {
            if (number === currentNode.data) {
                return true;
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
        newNode.left = BinaryTree.cloneNode(node.left); // Recursively clone the left subtree
        newNode.right = BinaryTree.cloneNode(node.right); // Recursively clone the right subtree
        return newNode;
    }
    
    // Method to clone the entire binaryTree
    clone() {
        const newBinaryTree = new BinaryTree(); // Create a new binaryTree instance
        newBinaryTree.root = BinaryTree.cloneNode(this.root); // Use the helper function to clone the root and its subtrees
        return newBinaryTree; // Return the new binaryTree instance
    }

    generateRandomTree = () => {
        this.root = null;
        const randomNodes = [];
        for (let i = 0; i < 20; i++) {
        const randomNumber = Math.floor(Math.random() * 100);
        if(!randomNodes.includes(randomNumber)){
            randomNodes.push(randomNumber);
            }
        }
        for (let i = 0; i < randomNodes.length; i++) {
            this.addNode(randomNodes[i]);
        }
        return [this, randomNodes];
    }
}

// Node class

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// MerkleTree class

class MerkleTree {
    constructor(leaves = []) {
        this.leaves = leaves.map(leaf => this.hashData(leaf));
        this.tree = [];
        this.buildTree();
    }

    hashData(data) {
        const dataBytes = utf8ToBytes(data);
        const hash = keccak256(dataBytes);
        return this.bytesToHex(hash);
    }

    bytesToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    buildTree() {
        this.tree = []; // Reset the tree before rebuilding
        let layer = this.leaves;
    
        while (layer.length > 1) {
            const newLayer = [];
    
            for (let i = 0; i < layer.length; i += 2) {
                const left = layer[i];
                const right = i + 1 < layer.length ? layer[i + 1] : left;
                newLayer.push(this.hashData(left + right));
            }
    
            this.tree.push(layer);
            layer = newLayer;
        }
    
        this.tree.push(layer); // Push the final layer (root) to the tree
    }

    addNode(leaf) {
        const hashedLeaf = this.hashData(leaf);
        this.leaves.push(hashedLeaf);
        this.buildTree();
    }

    addLeaves(leaves) {
        const hashedLeaves = leaves.map(leaf => this.hashData(leaf));
        this.leaves.push(...hashedLeaves);
        this.buildTree();
    }

    getRoot() {
        if (!this.tree.length) return null;
        return this.tree[this.tree.length - 1][0];
    }

    // New method to clone the MerkleTree instance
    clone() {
        return new MerkleTree(this.leaves.map(leaf => this.bytesToHex(leaf)));
    }

    // New static method for generating a random binary tree
    generateRandomTree(size = 10) {
        const randomLeaves = Array.from({length: size}, () => Math.random().toString(36).substring(2, 15));
        const merkleTree = new MerkleTree(randomLeaves);
        return [merkleTree, randomLeaves];
    }
}


class patriciaTree {
    constructor() {
        this.root = null;
        this.version = 0;
    }
}

const treeFactory = (type) => {
    switch(type) {
        case 'binary':
            return new BinaryTree();
        case 'merkle':
            return new MerkleTree();
        case 'patricia':
            return new patriciaTree();
        default:
            throw new Error(`Unknown tree type: ${type}`);
    }
}

export { treeFactory };