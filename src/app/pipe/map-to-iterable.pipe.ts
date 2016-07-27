import { Pipe, PipeTransform } from '@angular/core';
/**
 * Map to Iteratble Pipe
 *
 * It accepts Objects and [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
 * -https://github.com/angular/angularfire2/issues/290
 * -http://stackoverflow.com/questions/31490713/iterate-over-typescript-dictionary-in-angular-2/34074484#34074484
 * -** https://webcake.co/object-properties-in-angular-2s-ngfor/
 *
 * Example:
 *
 *  <div *ngFor="#keyValuePair of someObject | mapToIterable">
 *    key {{keyValuePair.key}} and value {{keyValuePair.value}}
 *  </div>
 *
 * Create a Globally Available Custom Pipe in Angular 2
 *  -https://codequs.com/p/HJYDyusv/create-a-globally-available-custom-pipe-in-angular-2
 */
@Pipe({
  name: 'mapToIterable'
})
export class MapToIterablePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let result = [];

    if(value.entries) {
      for (var [key, value] of value.entries()) {
        result.push({ key, value });
      }
    } else {
      for(let key in value) {
        result.push({ key, value: value[key] });
      }
    }
    return result;
  }
}
