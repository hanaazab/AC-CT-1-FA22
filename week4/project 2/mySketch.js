let nodes = []
let range
let maxR
const reject = 15
const align = .18
const slow = .200
const limitVel = 2

setup = () => {
  const m = min(windowWidth, windowHeight)
  createCanvas(m, m, WEBGL)
  range = m * .4
  maxR = m / 30
  initialize()
}

initialize = () => {
  nodes.length = 0
  for (let i = 3; i--;) {
    const r = random(TWO_PI)
    const d = random(range)
    nodes[i] = {
      pos: createVector(d * cos(r), d * sin(r)),
      vel: createVector(0, 0)
    }
  }
}

distance = (u, v) => sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2)

draw = () => {
  background('green')
  rotateX(.5)
  rotate(frameCount / 200)
  
  const renew = []
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i]
    renew.push(current)
    const next = nodes[(i + 1) % nodes.length]
    if (distance(current.pos, next.pos) > maxR) {
      renew.push({
        pos: p5.Vector.add(current.pos, next.pos).div(2),
        vel: createVector(0, 0)
      })
    }
  }
  nodes = renew
  
  for (let i = nodes.length; i--;) {
    const current = nodes[i]
    for (let j = i; j--;) {
      const other = nodes[j]
      const d = distance(current.pos, other.pos)
      if (d < maxR && d > 0) {
        const delta = p5.Vector.sub(current.pos, other.pos)
        .mult((1 / d - 0.5 / maxR) * reject)
        current.vel.add(delta)
        other.vel.add(delta.mult(-1))
      }
    }
  }
  
  for (let i = 0; i < nodes.length; i++) {
    const prev    = nodes[i]
    const current = nodes[(i + 1) % nodes.length]
    const next    = nodes[(i + 2) % nodes.length]
    const mid = p5.Vector.add(next.pos, prev.pos).div(2)
    const dif = p5.Vector.sub(mid, current.pos)
    current.vel.add(dif.limit(align))
  }
  
  for (const n of nodes) {
    with(n) {
      pos.add(vel.limit(limitVel))
      vel.mult(slow)
      pos.limit(range)
    }
  }
  
  let prev = nodes[nodes.length - 1].pos
  for (let i = 0; i < nodes.length; i++) {
    with(nodes[i]) {
      push()
      translate((prev.x + pos.x) / 2, (prev.y + pos.y) / 2, 0)
      rotateZ(atan2(pos.y - prev.y, pos.x - prev.x))
      box(distance(prev, pos), maxR/6, maxR/3)
      pop()
      prev = pos
    }
  }
}

mousePressed = () => initialize()