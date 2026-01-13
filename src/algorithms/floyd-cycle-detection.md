---
title: Floyd-cycle detection
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

## Floyd-cycle detection

1. Explanation
2. Complexity
3. Compare

So cycles are not a common thing in linkedlists, but they do happen. So the biggest problem when encountering cycles in linkedlists is how to identify the starting point of the cycle, because if you think about it, there is no straightforward way to do it because linkedlists are one directional except doubly-linked lists, we are not talking about that right now. 

If a cycle exists in a linkedlist, you just can't find it because every valid next node can be the starting point of the cycle. This algorithm floyd-cycle detection can help you find the starting point of the cycle with ease. The only hard part to understand about this algorithm is the math behind it and it's very important to understand it. I'm very afraid to accept things that I don't understand, it was the same with this algorithm. I'll try my best to simplify the math so you're able to find the reasoning.

```python
def cycle(root: Optional[ListNode]) -> ListNode:
    if not root:
      return None

    tortoise = root
    hare = root
    # detect cycle
    while hare and hare.next:
      tortoise = tortoise.next
      hare = hare.next.next

      if tortoise == hare:
        break
    else:
      return None # no cycle
    
    dummy = root
    # iterate until they meet
    while dummy != tortoise:
      dummy = dummy.next
      tortoise = tortoise.next
    
    return dummy
```

I'll give a brief rundown of the code before the math behind it. We are taking two pointers here and running one at constant speed and the other at double the speed. The reason for the tortoise and hare naming because this algorithm is also known as the tortoise and hare algorithm. Now if a cycle exists which will if the two pointers ever meet because the tortoise can't catch up to the the hare in any other way, it's just slower. 

We break the loop after the pointers meet, then create a new pointer starting at the root. We run the tortoise and the new node one step at a time, and the node they meet at will be the starting point of the cycle. I know it sounds crazy but it actually works 100% of the time and there's solid math to back it up so all this won't sound magical.

<div class="katex-div">

Let:
- $\mu$ = distance from the head to the start of the cycle
- $\lambda$ = length of the cycle
- $x$ = distance from the cycle start to the meeting point

</div>

Distance travelled by turtle is equal to:
$$
D_s = \mu + x
$$

The distance travelled by hare is double of turtle as it's moves at double the speed of the turtle.
$$
D_f = 2(\mu + x)
$$

At the meeting point, the hare has completed certain amount of full cycles, which makes sense if you think about the fact that the hare catches the turtle from behind it and that will happen inside the cycle. So the hare definitely has completed some cycles, so when we open the equation.
$$
2(\mu + x) = \mu + x + k\lambda
$$
$$
\mu + x = k\lambda 
$$
$$
\mu = k\lambda - x
$$

We subtract $\mu - x$ from both sides. And final equation means that distance to the starting point of the cycle equals distance from meeting point to the start of the cycle. I'll clarify that doesn't matter how many cycles hare does, the distance remains the same as we are running in a loop, the distance to the starting point doesn't increase with the increase in cycles. % total distance with the length of the cycle will land you on the exact meeting point.

This is all you need to know about this algorithm. I believe it's important to understand this, otherwise you won't be able to reason why this algorithm works and that's not a good thing. Hope this help clear the confusion.