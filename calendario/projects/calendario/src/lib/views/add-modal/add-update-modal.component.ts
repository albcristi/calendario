import {Component, Input, OnInit} from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'cda-add-update-modal',
  templateUrl: 'add-update-modal.component.html',
  styleUrls: ['add-update-modal.component.html']
})
export class AddUpdateModalComponent implements OnInit{
  closeResult = '';
  @Input() dayOfEvent: Date | undefined;
  @Input() modalTitle: string | undefined;
  @Input() getEventItemFields: any;
  modelObject = {};

  constructor(public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.constructObjectModel();
  }


  getValueForField(field: {key: string, value: string, actualValue: string | number | Date | undefined}) {
    if(field.value === "string")
      return '';
    return '0';
  }

  constructObjectModel() {
    let start = new Date(); start.setHours(7); start.setMinutes(0); start.setSeconds(0);
    let end = new Date(); end.setHours(8); end.setMinutes(0); end.setSeconds(0);
    // @ts-ignore
    this.modelObject["start"] = start;
    // @ts-ignore
    this.modelObject["end"] = end;
    this.getEventItemFields()
      .forEach((field: {key: string, value: string, actualValue: string | number | Date | undefined}) => {
        if(field.actualValue !== undefined)
          { // @ts-ignore
            this.modelObject[field.key] = field.actualValue;
          }
        else {
          if(field.value === "number") {
            // @ts-ignore
            this.modelObject[field.key] = 0
          }
          else {
            // @ts-ignore
            this.modelObject[field.key] = '';
          }
        }
      })
  }

  openModal(content: any){
    this.modalService.open(content)
    console.log(this.getEventItemFields())
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log("CLOSE")
  }

  getFieldName(key: string) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  valueChangedInModal(field: { key: string, value: string }, value: string | number | Date | any) {
    // @ts-ignore
    // event.preventDefault()
    console.log(field)
    console.log(value);
  }

  getFieldType(value: string) {
    if(value === "string")
      return "text"
    return "number"
  }

  getPlaceholder(key: string): String {
    // @ts-ignore
    return String(this.modelObject[key]);
  }
}
