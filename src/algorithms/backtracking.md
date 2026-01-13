---
title: Backtracking
layout: "algorithm.njk"
diagramScenes:
  - dijkstra_step1.svg
  - dijkstra_step2.svg
  - dijkstra_step3.svg
  - dijkstra_step4.svg
  - dijkstra_step5.svg
  - dijkstra_step6.svg
  - dijkstra_step7.svg
  - dijkstra_step8.svg
---

## Backtracking

1. Explanation
2. Complexity
3. Compare

<div class="algo-meta">
    <span>Time Complexity: Problem-dependent</span>
    <span>Space Complexity: Problem-dependent</span>
</div>

Backtracking is a fundamental algorithm you need to familiarise yourself with. It's an essential algorithm that closely resembles permutations. That said, backtracking is very input dependent for it's time complexity, it can easily scale exponentially for logic that requires to go through a lot of branches though smart pruning can help reduce the time a lot.

Backtracking as the name suggests, going back in your tracks to try a different path. That's really it, you just keep trying a path until it stops through some kind of base case to stop the algorithm, otherwise you'll end up with an unending algorithm or runtime errors, return from there and try some different path until you exhaust all possibilities. 

Where backtracking finds its usage is when you require knowing all the different permutations, subset, combinations, paths of the input. You use backtracking together with recursion, as the algorithm remains the same for all paths. Backtracking is not a very straightforward algorithm in the sense, that it's not a copy and paste. It largely depends upon what kind of problem you are trying to solve. The only invariants are recursion, a base case and going through all paths. If you see those, it's most likely a backtracking algorithm.

I'll show the algorithm being using in the <a href="https://leetcode.com/problems/binary-tree-paths/?envType=problem-list-v2&envId=backtracking"> leetcode problem 257 </a> which requires us to find all paths to leaf nodes in the tree, leaf nodes being nodes that don't have any child nodes. If you notice, this problem requires us to try all possible paths and the base case being when a leaf node is encountered, you store the path and return. So this question is perfect for a backtracking implementation, as it checks the required boxes. This also uses DFS, which if you're not familiar with, you should learn about it.

<div class="code-block">
  <div class="code-tabs">
    <ul>
      <li>Python</li>
      <li>Java</li>
    </ul>
  </div>

  ```python
def binaryTreePaths(root: Optional[TreeNode]) -> List[str]:
    res = []
    def backtrack(node, path):
        nonlocal res

        # base condition triggers when a leaf node is encountered
        if not node.left and not node.right:
            res.append("".join(path))
            return
        
        # if left child present, check it out
        if node.left:
            path.append("->"+str(node.left.val))
            backtrack(node.left, path) # recursive calls
            path.pop()
        
        # same with right child
        if node.right:
            path.append("->"+str(node.right.val))
            backtrack(node.right, path)
            path.pop()

    backtrack(root, [str(root.val)])
    return res

print(binaryTreePaths(root)) #Expected output: [1->4->2, 1->8->7]

  ```

  ```java
class Backtracking {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> res = new ArrayList<>();
        if (root == null) return res;

        backtrack(root, String.valueOf(root.val), res);
        return res;
    }

    private void backtrack(TreeNode node, String path, List<String> res) {
        // leaf node
        if (node.left == null && node.right == null) {
            res.add(path);
            return;
        }

        if (node.left != null) {
            backtrack(node.left, path + "->" + node.left.val, res);
        }

        if (node.right != null) {
            backtrack(node.right, path + "->" + node.right.val, res);
        }
    }

    public static void main(String[] args) {
        Backtracking btrack = new Backtrack()
        System.out.println(btrack.binaryTreePaths(root)) // Expected output: [1->4->2, 1->8->7]
    }
}
  ```
</div>


You don't need to worry about understanding the node class if you find it confusing. The only thing you need to understand is where the recursive call is happening and the base conditions. I'll dive into base conditions now, because this is the most vital part about this algorithm. These vary upon the problem, therefore it's important for you to create a base condition that follows the rule of the problem. 

The algorithm above creates a base condition on top of the fact that the problem requires us to find leaf nodes and some knowledge of binary trees. I say knowledge of binary trees because if you're familiar with them, you would know that leaf nodes have no child nodes, so you can't do any more recursive calls down. So it becomes the perfect base condition to stop the algorithm and store the answer. This is just one application, and you will encounter different problems that will require you to identify the stopping point.

Understanding the problem should give you everything you need to create the base case. So my advice would be just to hop on leetcode, do some backtracking problems. If you can't solve the problem, just check the solution and see what kind of base case it's using. If you get that "aha" moment, you're doing good, you'll get better in no time.