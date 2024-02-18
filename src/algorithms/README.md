## Part 1: Algorithms

This part is meant to test your general Typescript skills.
There's no need for any graphical elements in this part - focus on the functions themselves.

Make sure you:
* 🧪 Include tests!
* ⚡ Consider performance versus readability
* 🚫 Don't modify input and return types.

### Remove identical letters

Write a function that finds and removes instances of four identical consecutive lowercase letters. The function should delete as a few letters as possible.

Assume that the maximum length of the string is 150 000 however please elaborate on changes you would do if the maximum length would be 20 million or higher?

If the max length of the string would be 20 million or higher,  would investigate some type of streaming process where I can break up the string into different chunks instead of reading the entire string into memory. I would start by creating a chunk of appropriate size by splitting the input. Then loop over chunk by chunk to achieve the same result.

Examples:
```
"ffdttttyy" should return "ffdtttyy"
```

```
"iiikigggg" should return "iiikiggg"
```

### Maximum odd sum

Write a function that should find the highest possible sum of two numbers that, when added together, form an odd number.

Assume that the array contains between 1 and 150 000 elements and that each element is within the range of 1 to 1 500 000.

Examples:
```
[19, 2, 42, 18] should return 61
```

```
[61, 32, 51] should return 93
```
