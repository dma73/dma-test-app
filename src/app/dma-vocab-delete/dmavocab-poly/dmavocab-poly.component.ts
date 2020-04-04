import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dmavocab-poly',
  templateUrl: './dmavocab-poly.component.html',
  styleUrls: ['./dmavocab-poly.component.css']
})
export class DmavocabPolyComponent implements OnInit {
  polynome = '2x^2 -3x -20';
  solution = '';
  constructor() { }

  ngOnInit() {
  }
  calc() {
    let solution = '';
    let a = 0;
    let b = 0;
    let c = 0;
    let delta = 0;
    this.polynome.split(' ').forEach(
      (token) => {
        if (token.indexOf('x^2')){
          a = +token.replace('x^2', '');
        } else if (token.indexOf('x')) {
          b = +token.replace('x', '');
        } else {
          c = +token;
        }
      }
    );
    delta = b * b - (4 * a * c);
    if (delta === 0) {
      solution = '1 racine -> ' +  (-(b / (2 * a ) ));
    }
    if (delta > 0) {
      solution = '2 racines -> x1 = ' + ((-b - Math.sqrt(delta)) / (2 * a)) + ', x2 =' + ((-b + Math.sqrt(delta)) / (2 * a));
    }
    if (delta < 0) {
      solution = 'Pas de solution';
    }

    this.solution = solution;
  }

}
