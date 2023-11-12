import * as readline from 'readline'

class Snake
{
  snake: Array<[number, number]> = [[10, 10]]
  apple: [number, number] = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
  direction: [number, number] = [0, -1]
  interval: number

  constructor(interval?: number)
  {
    this.interval = interval ?? 1000
  }

  initialize()
  {
    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) process.stdin.setRawMode(true)

    process.stdin.on('keypress', (str, key) =>
    {
      switch (key.name)
      {
        case 'up':
          if (this.direction[0] !== 1) this.direction = [-1, 0]
          break

        case 'down':
          if (this.direction[0] !== -1) this.direction = [1, 0]
          break

        case 'left':
          if (this.direction[0] !== 1) this.direction = [0, -1]
          break

        case 'right':
          if (this.direction[0] !== -1) this.direction = [0, 1]
          break

        case 'c':
          if (key.ctrl) process.exit()
          break
      }
    })

    setInterval(() =>
    {
      const head = this.snake[0].slice() as [number, number]
      head[0] = (head[0] + this.direction[0] + 20) % 20
      head[1] = (head[1] + this.direction[1] + 20) % 20

      for (let i = 1; i < this.snake.length; i++)
      {
        if (this.snake[i][0] === head[0] && this.snake[i][1] === head[1])
        {
          console.log('¡Has perdido!')
          process.exit()
        }
      }

      if (head[0] === this.apple[0] && head[1] === this.apple[1]) this.apple = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
      else this.snake.pop()

      this.snake.unshift(head)
      this.draw()
    }, this.interval)
  }

  draw()
  {
    console.clear()

    for (let i = 0; i < 20; i++)
    {
      let row = ''

      for (let j = 0; j < 20; j++)
      {
        if (this.snake.find((part) => part[0] === i && part[1] === j)) row += '🐍'
        else if (this.apple[0] === i && this.apple[1] === j) row += '🍎'
        else row += '⬜️'
      }

      console.log(row)
    }
  }
}

const snake = new Snake(1000)
snake.initialize()