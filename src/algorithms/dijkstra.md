---
title: Dijkstra's Algorithm
layout: "algorithm.njk"
diagramScenes:
  - dijkstra_step1.svg
---

## Dijkstra's Algorithm

1. Explanation
2. Complexity
3. Compare

<div class="algo-meta">
    <span>Time Complexity: O(E log V)</span>
    <span>Space Complexity: O(V)</span>
</div>

Dijkstra's algorithm is used to calculate the minimum distance required to get from point A to point B. To implement Dijkstra, you require the distances between different points(edges) and it should be possible to reach the final destination.

The above snippets initializes some lists to be used in the algorithm. The graph list is used to visit all neighboring nodes possible from a node. Both vertices in an edge append each other because a graph is bidirectional unless otherwise stated. The distance list is used to keep track of the current distance required by a node. The last thing you require is a Priority Queue, more specifically a min heap, to efficiently calculate the minimum distances each time.

The reason a min heap is required is that we want to prioritize utilizing the edges that yield the least distance, which is the goal of this algorithm. A min heap always stores the edge with the least distance at the front which can be popped, and it does so in O(logn) which is perfect for this algorithm.

So, we store our initial starting node in the heap and mark this node's distance as 0. The reason for that is current distance traveled at the start is zero. Also, you might notice, I push a tuple in python, or more generally a list type structure into the heap, the reason being we require to know what's the current distance at what node. Additionally, the order of the list is important as that decides how the heap sorts the lists, in our distance is the priority. So we place distance at the front. This helps up calculate the total distance from this node to its neighbors.

This is the logic of this algorithm. I'll explain line by line on what's happening here. First, we do a while loop until the heap is empty so it can go through all possible edges if required. Next, we pop the least distant edge from the starting node, which at the start would be the starting node itself. The important thing to emphasize here is that when a node is popped for the first time, you can guarantee that that's the fastest way to reach that node from the start node. The reason being as I said heap prioritize edges that yield the least distance, so if we reach this node for the first time, that means the current path the way path of least distance to this node and other paths will only ever increase the distance to this node.

Next, we have an if condition to avoid searching via nodes that have already been popped. As I explained earlier, the first time a node is popped, that's the least distance for that node and if we encounter that node again, that can only mean one thing that it came via a different path and that path is most probably of more distance. And we want to avoid this node because we have already computed all the paths from this node via it's most efficient path.

The last lines of logic is the simplest to understand. After finding out that the current node is a valid path, we now search its neighbors and try to see if we can improve those neighbors distances. How we do that is we use this node's distance which we got when we popped the min heap and add that with this node's distance with its neighbors. That gives us the total distance for that neighbor via this path, and if this path is better than the current path for that neighbor, we update it.

And this keeps on repeating until we encounter the destination node. And when pop the destination node, we don't compute anything anymore and return this distance. The reason being, as I said multiple times previously, the first time a node is reached, that it is the path of least distance. And the same is true for our destination node, all other paths to this node are guaranteed equal or longer in distance, because think about it, if that was not the case, whatever path yielded lower distance to our destination node would've been popped before this path because that's how a min heap works.
