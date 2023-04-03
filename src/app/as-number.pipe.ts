import {Pipe, PipeTransform  } from '@angular/core';
@Pipe({
    name: 'asNumber',
    pure: false
})
export class AsNumberPipe implements PipeTransform {
    transform(value: string): unknown {
        return parseFloat(value);
    }
}