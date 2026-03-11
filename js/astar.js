const AStar = {

    heuristic(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    },

    findPath(startNode, endNode, nodes) {

        const openSet = [startNode];
        const closedSet = new Set();

        const cameFrom = {};
        const gScore = {};
        const fScore = {};

        nodes.forEach(node => {
            gScore[node.id] = Infinity;
            fScore[node.id] = Infinity;
        });

        gScore[startNode.id] = 0;
        fScore[startNode.id] = this.heuristic(startNode, endNode);

        while (openSet.length > 0) {

            // Get node with lowest fScore
            let current = openSet.reduce((a, b) =>
                fScore[a.id] < fScore[b.id] ? a : b
            );

            if (current.id === endNode.id) {
                return this.reconstructPath(cameFrom, current);
            }

            // Remove from open set
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.add(current.id);

            // Get neighbors
            const neighbors = nodes.filter(n =>
                current.neighbors && current.neighbors.includes(n.id)
            );

            neighbors.forEach(neighbor => {

                if (closedSet.has(neighbor.id)) return;

                const tentativeG =
                    gScore[current.id] +
                    this.heuristic(current, neighbor);

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                } else if (tentativeG >= gScore[neighbor.id]) {
                    return;
                }

                cameFrom[neighbor.id] = current;
                gScore[neighbor.id] = tentativeG;
                fScore[neighbor.id] =
                    tentativeG + this.heuristic(neighbor, endNode);

            });

        }

        return [];
    },

    reconstructPath(cameFrom, current) {

        const path = [current];

        while (cameFrom[current.id]) {
            current = cameFrom[current.id];
            path.push(current);
        }

        return path.reverse();
    }

};