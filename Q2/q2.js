/*
2. Write ruby code that model the following left child is always less than the parent & right child is always bigger than the parent. 
A parent can only have 2 immediate child node.

2.1 Write a method to add item to the model so caller can build the tree like below.

2.2 Then perform a walk of depth first search on the model so we get result like this: 21, 56, 62, 67, 78, 81, 97, 115

                            78
                        /       \
                        56        97
                       /  \      /  \    
                     21    67   81  115
                           /
                          62    
                    
*/


class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    addItem(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            //recursive
            const searchTree = function (node) {
                if (data < node.data) { //small than parent become left child
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) { //greater than parent become right child
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }

    inOrderTraverse() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();
            function traverseInOrder(node) {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        }
    };

}

const bT = new BinaryTree();
const arr = [78, 56, 97, 21, 67, 81, 115, 62];

// bT.addItem(78);
// bT.addItem(56);
// bT.addItem(97);
// bT.addItem(21);
// bT.addItem(67);
// bT.addItem(81);
// bT.addItem(115);
// bT.addItem(62);

arr.forEach(x => bT.addItem(x) )

console.log('InOrder DFS: ' + bT.inOrderTraverse()); //log: 21, 56, 62, 67, 78, 81, 97, 115