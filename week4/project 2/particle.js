function Particle(x, y) {
  
    this.pos = new p5.Vector(x, y);
      this.lastPos = new p5.Vector(x, y);
    this.vel = new p5.Vector(0, 0);
    this.acc = new p5.Vector(0, 0);
      this.speed = random(0.05, 0.2);
      this.size = random(5, 15);
    this.seed = seed;
      
      this.getColorByPos = function() {
          let img = imgs[imgIndex];
          let index = (int(this.pos.y) * img.width + int(this.pos.x)) * 4;
  
          let r = img.pixels[index];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          
          return [r, g, b];
      }
      
      this.outOfBounds = function() {
          let img = imgs[imgIndex];
          
          return (
              this.pos.x < 0 || 
              this.pos.x > img.width || 
              this.pos.y < 0 || 
              this.pos.y > img.height);
      }
      
    this.move = function() {
          this.lastPos.set(this.pos.x, this.pos.y);
      
          noiseSeed(this.seed);
          let n = noise(this.pos.x * noiseScale, this.pos.y * noiseScale);
          let moving = new p5.Vector(this.speed, 0);
          moving.rotate(radians(map(n, 0, 1, -120, 120)));
          this.acc.add(moving);
          
          let mouseDistance = dist(this.pos.x, this.pos.y, mouseX, mouseY);
          if (mouseDistance < repulsionRadius) {
              let repulse = new p5.Vector(this.pos.x, this.pos.y);
              repulse.sub(mouseX, mouseY);
              repulse.mult(map(mouseDistance, 100, 0, 0, 0.01));
              this.acc.add(repulse);
          }
          
      this.vel.mult(0.95);
      
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    
    this.display = function() {
      let rgb = this.getColorByPos();
          fill(rgb[0], rgb[1], rgb[2]);
          stroke(0, 20);
          
          let direction = this.pos.copy();
          direction.sub(this.lastPos);
          direction.normalize();
          
          push();
          translate(this.pos.x, this.pos.y);
          rotate(direction.heading() + radians(-90));
      
          triangle(
              -this.size * 0.25, -this.size * 0.25,
              0, this.size * 1.5,
              this.size * 0.25, -this.size * 0.25);
          
          pop();
    }
  }