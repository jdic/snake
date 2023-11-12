# Snake 🐍
The classic snake game, now in terminal, developed in [TypeScript](https://www.typescriptlang.org/). Typesnake?.

## How this piece of code works?

### Initialization
When an instance of the `Snake` class is created, several properties are initialized. The snake starts at position `[10, 10]` on a 20x20 board, the apple is placed at a random position, and the snake starts moving to the left. The time interval between each move of the snake is 1000 milliseconds by default, but can be modified.

```typescript
constructor(interval?: number)
{
  this.interval = interval ?? 1000
}
```
### Keyboard Events
In the `initialize()` method, keyboard events are set up to control the direction of the snake. When a key is pressed, the direction of the snake is changed unless it is the opposite direction to the current one (to prevent the snake from moving backwards onto itself).

```typescript
process.stdin.on('keypress', (str, key) =>
{
  switch (key.name)
  {
    case 'up':
      if (this.direction[0] !== 1) this.direction = [-1, 0]
      break
    ...
  }
})
```
### Snake Movement
Every second (or the specified time interval), the snake moves in the current direction. If the snake bites itself, the game ends. If the snake eats an apple, a new apple is generated at a random position and the snake grows in length. If it doesn’t eat an apple, the snake moves without growing.

```typescript
setInterval(() =>
{
  ...
  if (head[0] === this.apple[0] && head[1] === this.apple[1]) this.apple = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
  else this.snake.pop()
  ...
}, this.interval)
```

### Drawing the Board
After each move, the board is redrawn with the snake and the apple in their new positions.

```typescript
draw()
{
  console.clear()
  ...
  console.log(row)
}
```

### Starting the Game
Finally, an instance of the `Snake` class is created and the `initialize()` method is called to start the game.

```typescript
const snake = new Snake(1000)
snake.initialize()
```

ready, did you expect more, no, this is it. 🗿