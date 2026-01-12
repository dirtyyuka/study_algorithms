---
title: DFS
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

## DFS (Depth-first traversal)

1. Explanation
2. Complexity
3. Compare

<div class="algo-meta">
    <span>Time Complexity: Problem-dependent</span>
    <span>Space Complexity: Problem-dependent</span>
</div>

DFS is going to be one of the most used algorithms if you're solving lc type problems. This algorithm finds uses in many problems and used as foundation for other algorithms. Getting familiar with DFS will also help your recursion skills as both go hand in hand. 

DFS prioritizes going deep into a branch rather than wide. It will try to reach the end of a path before retracing its steps. So any algorithm that does that can be considered DFS. Though this algorithm is used mostly in binary, graphs. Binary tree problem often require you to traverse into the tree deeply, therefore favoring DFS.

I think it's just better to show this algorithm in application rather than explaining it. I already described all the essential details about DFS in the first few lines. So I'll write a solution to the leetcode problem 94 inorder traversal. This is one of the three basic binary tree searching algorithm that includes inorder, preorder, postorder traversal.

```python
def inorder(root: Optional[TreeNode]) -> List[int]:
    # recursive dfs method
    ans = []
    def dfs(node):
        if not node:
            return

        dfs(node.left)
        ans.append(node.val)
        dfs(node.right)
    
    dfs(root)
    return ans

inorder(root) # expected output: [4,2,6,5,7,1,3,9,8]
```

I'll explain inorder traversal later below, but a brief rundown would be that it requires you to search through the left of a node, then the node itself and then the right side. It's important to distinguish between the whole tree and a node. Every node will go through these three states, though the left nodes will take priority in going first through these states and even in left, the furthermost left node will be the first one.

You see, trying to find the furthermost left node requires us to go deep into the deep as far as possible. DFS does exactly that and so we use it here, as long as a node is valid, it keep going left until it encounters a null object meaning that's the end. It then goes back, appends the node itself as it has searched through the left side (the first state) and now it searches itself by appending to the list and then dive into the right side. 

Preorder does the same, but the priority of the states changes. It prioritizes itself, then the left side and then the right side. And postorder prioritizes left side first, then right side and then itself. The DFS remains same, only the priority order changes, you should try implementing these two yourself by using the above code. 
