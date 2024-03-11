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
        
        // Assuming this.leaves are already hashed, otherwise they should be hashed here.
        let layer = this.leaves;
    
        while (layer.length > 1) {
            const newLayer = [];
    
            for (let i = 0; i < layer.length; i += 2) {
                const left = layer[i];
                // Check if a right element exists; if not, duplicate the left (last element in the case of an odd number)
                const right = i + 1 < layer.length ? layer[i + 1] : left;
                // Hash the concatenation of left and right nodes to form the parent node
                newLayer.push(this.hashData(left + right));
            }
    
            // Push the current layer onto the tree. This captures leaves to root path
            this.tree.push(layer);
            // Move up to the next layer
            layer = newLayer;
        }
    
        // Push the root layer to the tree. This is the final layer with a single node.
        this.tree.push(layer);
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

    search(leaf) {
        const hashedLeaf = this.hashData(leaf);
        return this.leaves.includes(hashedLeaf) ? hashedLeaf : null;
    }

    getProof(leaf) {
        leaf = this.hashData(leaf);
        let proof = [];
        // Check if the leaf exists in the tree
        if (!this.leaves.includes(leaf)) return null;
    
        let index = this.leaves.indexOf(leaf);
    
        // Traverse up the tree to construct the proof
        for (let i = 0; i < this.tree.length - 1; i++) {
            const layer = this.tree[i];
            const isRightNode = index % 2 === 1;
            const siblingIndex = isRightNode ? index - 1 : index + 1;
    
            // Check bounds for the sibling index
            if (siblingIndex < layer.length) {
                proof.push(layer[siblingIndex]);
            }
    
            // Calculate the parent's index in the next layer
            index = Math.floor(index / 2);
        }
    
        return proof;
    }
}


class PatriciaNode {
    constructor(key = "", value = null, children = {}) {
        this.key = key;
        this.value = value;
        this.children = children;
    }
}

class PatriciaTree {
    constructor() {
        this.root = new PatriciaNode();
        this.sharedPrefix = "";
    }

    cloneNode(node) {
        if (!node) return null;
        let clonedChildren = {};
        Object.keys(node.children).forEach(childKey => {
            clonedChildren[childKey] = this.cloneNode(node.children[childKey]);
        });
        return new PatriciaNode(node.key, node.value, clonedChildren);
    }

    clone() {
        let newTree = new PatriciaTree();
        newTree.root = this.cloneNode(this.root);
        return newTree;
    }

    insert(key, value) {
        let node = this.root;
        let index = 0;

        while (index < key.length) {
            const char = key[index];
            if (!node.children[char]) {
                // Direct path doesn't exist, create a new node.
                node.children[char] = new PatriciaNode(key.slice(index), value);
                return;
            }

            let child = node.children[char];
            let commonPrefixLength = 0;

            // Calculate common prefix length
            while (commonPrefixLength < child.key.length &&
                   commonPrefixLength + index < key.length &&
                   child.key[commonPrefixLength] === key[index + commonPrefixLength]) {
                commonPrefixLength++;
            }

            if (commonPrefixLength < child.key.length) {
                // Split node
                const splitNode = new PatriciaNode(child.key.slice(commonPrefixLength), child.value, child.children);
                child.key = key.slice(index, index + commonPrefixLength);
                child.value = commonPrefixLength + index === key.length ? value : null;
                child.children = {};
                child.children[splitNode.key[0]] = splitNode;

                if (child.value === null) {
                    child.children[key[commonPrefixLength + index]] = new PatriciaNode(key.slice(index + commonPrefixLength), value);
                }
                return;
            }

            index += commonPrefixLength;
            node = child;
        }

        node.value = value; // Key fully matched an existing node, update value
    }


    searchPath(key) {
        let results = [];
        this.searchPathNode(this.root, key, '', results);
        return results;
    }

    // Helper method to recursively search for the path that matches the key
    searchPathNode(node, key, accumulatedKey, results) {
        // Update the accumulated key with the current node's key
        let newAccumulatedKey = accumulatedKey + node.key;

        // Check if the accumulated keys match the beginning of the search key
        if (key.startsWith(newAccumulatedKey)) {
            // If there's a match, add the current node to the results
            results.push(node);

            // If the accumulated key matches the search key exactly, stop searching deeper
            if (newAccumulatedKey === key) {
                return;
            }
        } else {
            // If the new accumulated key overshoots the search key, or doesn't match, stop this path
            return;
        }

        // Continue searching among children
        Object.keys(node.children).forEach(childKey => {
            this.searchPathNode(node.children[childKey], key, newAccumulatedKey, results);
        });
    }

    generateRandomTree(tree, numEntries = 10) {
        // Generate random keys and insert them into the tree
        this.root = new PatriciaNode();
        let generatedKeys = [];
        for (let i = 0; i < numEntries; i++) {
            const randomKey = this.generateRandomKey();
            this.insert(randomKey, i); // Using the loop index as the value
            generatedKeys.push(randomKey);
        }
        return [this, generatedKeys]; // Return the tree and the generated keys
    }

    generateRandomKey(length = 5) {
        // Ensure sharedPrefix is properly checked and used here
        if (this.sharedPrefix.length < this.prefixLength) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            while (this.sharedPrefix.length < this.prefixLength) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                this.sharedPrefix += characters.charAt(randomIndex);
            }
        }

        let result = this.sharedPrefix; // Start with the shared prefix
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = this.sharedPrefix.length; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}


const treeFactory = (type) => {
    switch(type) {
        case 'binary':
            return new BinaryTree();
        case 'merkle':
            return new MerkleTree();
        case 'patricia':
            return new PatriciaTree();
        default:
            throw new Error(`Unknown tree type: ${type}`);
    }
}

export { treeFactory };