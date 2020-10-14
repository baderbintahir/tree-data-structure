function Node(data) {
    this.data = data
    this.children = []
}

class Tree {
    constructor() {
        this.root = null
    }

    add(data, toNodeData) {
        const node = new Node(data);

        const parent = toNodeData ? this.findBFS(toNodeData) : null

        if (parent) {
            parent.children.push(node)
        } else {
            if (!this.root) {
                this.root = node
            } else {
                return "Tried to return node at root when root already exists"
            }
        }


    }

    delete(toNodeData) {
        const parent = toNodeData ? this.findParent(toNodeData) : null

        if (parent) {
            parent.children.forEach(child => {
                if (child.data == toNodeData) {
                    let index = parent.children.indexOf(child)
                    if (index > -1) {
                        parent.children.splice(index, 1);
                    }
                } else {
                    return "No such node present in the tree"
                }

            })
        }
    }

    findParent(data) {
        let _node = null

        this.traverseBFS((node) => {
            node.children.forEach(child => {
                if (child.data == data)
                    _node = node
            });
        })

        return _node
    }

    findBFS(data) {
        const queue = [this.root]
        let _node = null

        this.traverseBFS((node) => {
            if (node.data == data)
                _node = node
        })

        return _node
    }

    traverseBFS(cb) {
        const queue = [this.root]

        if (cb)
            while (queue.length) {
                const node = queue.shift()

                cb(node)

                for (const child of node.children) {
                    queue.push(child)
                }
            }
    }
}

(function () {
    let tree = new Tree();

    let data = {
        id: "Node1234",
        type: "Line",
        startPoint: [100, 100],
        endPoint: [200, 200],
    }

    
    tree.add("Node1")

    tree.add("Node2", "Node1")

    tree.add("Node3", "Node1")

    tree.add(data, "Node1")
    data.parentPointer = tree.findParent(data)

    tree.add("Node4", "Node2")
    
    tree.add("Node5", "Node3")


    tree.traverseBFS(node => { console.log("Current node: ", node) })
})()