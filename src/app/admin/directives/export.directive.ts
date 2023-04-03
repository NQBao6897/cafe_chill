import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {ExportService} from '..//../services/export.service';
@Directive({
  selector: '[appExport]'
})
export class ExportDirective {

  constructor(private exportService: ExportService) { }


@Input() listhomthu: any;

@HostListener('click', ['$event']) onClick($event:any) {
  console.log('clicked: ' + $event);
  this.exportService.exportExcel(this.listhomthu,this.listhomthu);
  }
}
