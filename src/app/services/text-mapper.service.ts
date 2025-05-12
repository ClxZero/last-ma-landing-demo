/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
import {TextObject} from '../models/csvtexts';

@Injectable({
  providedIn: 'root',
})
export class TextMapperService {
  // Special keys that should become arrays
  specialKeys = new Set(['faq_object', 'func_object']);

  fillData(target: any, text: TextObject[]): void {
    text.forEach(x => {
      if (typeof x._key !== 'string' || typeof x.text !== 'string') {
        console.warn('Invalid data structure:', x);
        return;
      }

      if (this.specialKeys.has(x._key)) {
        // Handle special keys as arrays of TextObject
        if (!Array.isArray(target[x._key])) {
          target[x._key] = [];
        }
        target[x._key].push(x);
      } else if (x._key in target) {
        // Normal key assignment
        if (x.text !== null && x.text !== undefined) {
          target[x._key] = x.text;
        } else {
          console.warn(`Skipping '${x._key}' due to null or undefined value.`);
        }
      } else {
        // this just happens when no info has arrived yet, not need atm
        // console.warn(`Key '${x._key}' does not match any class property.`);
      }
    });
  }

  // fillData(target: any, text: TextObject[]): void {
  //   text.forEach(x => {
  //     if (typeof x._key !== 'string' || typeof x.text !== 'string') {
  //       console.warn('Invalid data structure:', x);
  //       return;
  //     }

  //     if (x._key in target) {
  //       if (x.text !== null && x.text !== undefined) {
  //         target[x._key] = x.text;
  //       } else {
  //         console.warn(`Skipping '${x._key}' due to null or undefined value.`);
  //       }
  //     } else {
  //       console.warn(`Key '${x._key}' does not match any class property.`);
  //     }
  //   });
  // }
}
