const treeOptions = ["Binary Tree", "Merkle Tree", "Patricia Tree"];

const descriptions = {
    binary: "A binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.",
    merkle: "A Merkle tree is a tree in which every non-leaf node is labelled with the hash of the labels or values (in case of leaves) of its child nodes.",
    patricia : "A Patricia tree is a type of tree in which each internal node has at least two children, and the keys are stored in the leaves. It is used in networking and cryptography."
}

export { treeOptions, descriptions }