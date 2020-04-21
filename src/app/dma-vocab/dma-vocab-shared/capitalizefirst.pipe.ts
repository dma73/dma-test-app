import { Pipe, PipeTransform } from '@angular/core';
import { ReadVarExpr } from '@angular/compiler';
/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  formats to: Daniel
*/
@Pipe({name: 'capitalizeFirst'})
export class CapitalizeFirstPipe implements PipeTransform {
  static toFirstCap(value: string): string {
    let rv: string;
    if (value) {
      rv = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return rv;
  }
    transform(value: string): string {
    let rv = '';
    if (value) {
      rv = CapitalizeFirstPipe.toFirstCap(value);
    }
    return rv;
  }

}
