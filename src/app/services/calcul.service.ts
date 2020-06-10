import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CalculService {
  constructor() { }
  /**
   * @description calcul of the percentage
   * @param  a is a number
   * @param  b is a number
   */
  getPercentage(a, b) {
    const result = a * 100 / b;
    return result;
  }

  /**
   * @description Precision 2 digits
   * @param c is a number
   */
  getRound(c){
    return Math.round(c * 100) / 100;
  }
}
