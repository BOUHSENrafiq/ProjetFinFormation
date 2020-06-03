import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculService {

  constructor() { }

  /**
   * calcul of the percentage
   * @param {number} a
   * @param {number} b
   */
  getPercentage(a, b) {
    const result = a * 100 / b;
    return result;
  }

  /**
   * Precision 2 digits
   * @param c
   */
  getRound(c){
    return Math.round(c * 100) / 100;
  }
}
