class Chara {
    int id;
    int whichChara;
    float x, y;
    float diameter;
    float vx = random(-0.01);
    float vy = random(0.01);
    float xx = random (0, 500);
    float xS;
    int offSet = 250;
    float r;
    float rd = 1;
  
    Chara(int idint, int randoChara, float xin, float yin, float din) {
      id = idint; 
      whichChara = randoChara;
      x = xin;
      y = yin;
      diameter = din;
      r = random(width/3, width/2);
    }
  
    void collide() {
      for (int i = 0; i < charas.size(); i++) {
        Chara others = charas.get(i);
        if (others != this) {
          float dx = others.x - x;
          float dy = others.y - y;
          float distance = sqrt(dx*dx + dy*dy);
          float minDist = others.diameter/4 + diameter/4;
          if (distance < minDist*20) { 
            line(x, y, others.x, others.y);
          }
          if (distance < minDist) { 
            float angle = atan2(dy, dx);
            float targetX = x + cos(angle) * minDist;
            float targetY = y + sin(angle) * minDist;
            float ax = (targetX - others.x) * spring;
            float ay = (targetY - others.y) * spring;
            vx -= ax;
            vy -= ay;
            others.vx += ax;
            others.vy += ay;
          }
        } else {
          fill(255);
        }
      }
    } 
  
    void move() {
      vy += gravity;
      x += vx;
      y += vy;
      if (x + diameter/2 > width) {
        x = width - diameter/2;
        vx *= friction;
      } else if (x - diameter/2 < 0) {
        x = diameter/2;
        vx *= friction;
      }
      if (y + diameter/2 > height) {
        y = height - diameter/2;
        vy *= friction;
      } else if (y - diameter/2 < 0) {
        y = diameter/2;
        vy *= friction;
      }
  
    } 
  
    void display() {
      if (showLetters) {
        text(character[int(whichChara)], x, y+diameter/3);
      }
      stroke(220);
    }
    void reOrder() {
      id-=1;
    }
  }
  