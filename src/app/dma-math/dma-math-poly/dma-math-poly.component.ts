import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dma-math-poly',
  templateUrl: './dma-math-poly.component.html',
  styleUrls: ['./dma-math-poly.component.css']
})
export class DmaMathPolyComponent implements OnInit {
  constructor() { }
  canvas: HTMLCanvasElement;
  polynome = '2x^2 -3x -20';
  solution = '';
  a = 0;
  b = 0;
  c = 0;

  ngOnInit() {
    this.canvas = document.getElementById('stage') as HTMLCanvasElement;
    if (this.canvas.getContext) {
      const ctx = this.canvas.getContext('2d');
      ctx.beginPath();
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const full = this.canvas.width;
      const half = full / 2;
      ctx.strokeStyle = 'rgb(160, 160, 160)';
      ctx.lineWidth = 1;
      ctx.moveTo(half, 0);
      ctx.lineTo(half, full);
      ctx.stroke();
      ctx.moveTo(0, half);
      ctx.lineTo(full, half);
      ctx.stroke();
    }
  }
  calc() {
    let solution = '';
    this.a = 0;
    this.b = 0;
    this.c = 0;
    let delta = 0;
    this.polynome.split(' ').forEach(
      (token) => {
        if (token.indexOf('x^2') >= 0) {
          this.a = this.parseFract(token.replace('x^2', ''));
        } else if (token.indexOf('x') >= 0) {
          this.b = this.parseFract(token.replace('x', ''));
        } else {
          this.c = this.parseFract(token);
        }
      }
    );
    delta = this.b * this.b - (4 * this.a * this.c);
    const buffer = 'Données:\na=' + this.toFract(this.a) + '\nb=' + this.toFract(this.b)
      + '\nc=' + this.toFract(this.c) + '\ndelta=' + this.toFract(delta) + '\n\nSolution: ';
    if (delta === 0) {
      solution = '\n   1 racine: ' + this.toFract(-(this.b / (2 * this.a)));
    }
    if (delta > 0) {
      solution = '\n   2 racines: \n   x1 = ';
      solution += this.toFract((-this.b - Math.sqrt(delta)) / (2 * this.a));
      solution += '\n   x2 =' + this.toFract((-this.b + Math.sqrt(delta)) / (2 * this.a));
    }
    if (delta < 0) {
      solution = '\n   Pas de solution';
    }

    this.solution = buffer + solution;
    this.drawArea();
  }
  parseFract(fract: string): number {
    let result = NaN;
    if (fract.indexOf('/') >= 0) {
      fract.split('/').forEach(
        (token) => {
          if (isNaN(result)) {
            result = +token;
          } else {
            result = result / +token;
          }
        }
      );
    } else {
      result = +fract;
    }
    return result;
  }

  fraction(n: number, prec: number, up: number, maxden: number): string {
    const s = '' + n;
    const p = s.indexOf('.');
    if (p === -1) {
      return s;
    }

    const dec = s.substring(p);
    const intgr = Number(s.substring(0, p));
    const m = prec || Math.pow(10, dec.length - 1);
    const num = (up === 1 ? Math.ceil(+dec * m) : Math.round(+dec * m));
    const den = m;
    const g = this.gcd(num, den, prec);
    const sign = (intgr < 0 ? -1 : 1);
    const reducednum = (num / g);
    const reducedden = (den / g);
    if (reducedden === 1) {
      return s;
    }

    if (reducedden % maxden === 0 || reducedden > maxden) {
      return s;
    }
    return String(Math.round((intgr * reducedden) + (sign * reducednum))) + '/' + String(Math.round(reducedden));

  }
  reduce(numerator: number, denominator: number, precision: number): [number, number] {
    const gcd = this.gcd(numerator, denominator, precision);
    console.log('numerator=' + numerator + ' denominator=' + denominator + ' gcd = ' + gcd +
      ' reduced = ' + (numerator / gcd) + '/' + (denominator / gcd));
    return [Math.round((numerator / gcd) * precision) / precision, Math.round((denominator / gcd) * precision) / precision];
  }
  gcd(a: number, b: number, precision: number): number {
    if (b) {
      console.log('a=' + a + ' b=' + b + ' a % b = ' + (a % b));
      let rem = a % b;
      if (Math.abs(rem / b) < (1 / precision)) {
        rem = 0;
      }
      return this.gcd(b, rem, precision);
    } else {
      return Math.abs(a);
    }
  }

  toFract(numb: number) {
    // let rv = numb + ' ';
    let rv = '';
    // rv += this.fraction(numb, 1000000, 0, 1000);
    rv += this.toFractImpl(numb, 1000, 1000000);
    return rv;
  }
  toFractImpl(numb: number, maxden: number, precision: number) {
    let fract = '';
    let reduced: [number, number];
    const test = (String(numb).split('.')[1] || []).length;
    const num = (numb * (10 ** Number(test)));
    const den = (10 ** Number(test));
    reduced = this.reduce(num, den, precision);
    if (reduced[1] === 1) {
      fract = String(reduced[0]);
    } else {
      if (reduced[1] % maxden === 0) {
        fract = String(numb);
      } else {
        fract = reduced[0] + '/' + reduced[1];
      }
    }
    return fract;
  }
  runf(x: number): number {
    let y = 0;
    y = (this.a * x * x) + (this.b * x) + (this.c);
    return y;
  }
  drawArea() {
    const canvas: HTMLCanvasElement = document.getElementById('stage') as HTMLCanvasElement;
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.beginPath();
      const full = canvas.width;
      const half = full / 2;
      ctx.strokeStyle = 'rgb(160, 160, 160)';
      ctx.lineWidth = 1;
      ctx.moveTo(half, 0);
      ctx.lineTo(half, full);
      ctx.stroke();
      ctx.moveTo(0, half);
      ctx.lineTo(full, half);
      ctx.stroke();
      ctx.beginPath();
      let first = true;
      const factor = 5;
      ctx.strokeStyle = 'rgb(20, 20, 180)';
      for ( let x = -200 / factor; x <= 200 / factor; x = x + (1 / factor / factor)) {
        const y = this.runf(x);
        console.log ('[' + x + ',' + y + ']');
        if (first) {
          ctx.moveTo((x) * factor + half, -1 * (y) * factor + half);
          first = false;
        } else {
          ctx.lineTo((x) * factor + half, -1 * (y) * factor + half);
        }
        // ctx.lineTo(this.runf(x) + 200, x + 200);
        ctx.stroke();
      }
      ctx.stroke();
    }

  }

}
