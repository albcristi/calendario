import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventItem} from "../../shared/models/event.model";

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
  @Input() isAdd: boolean | undefined;
  @Output() retrieveCreatedData = new EventEmitter<string>();
  modelObject = {};
  showErrorMessage = false;
  stepOfCreation = 1;
  hasSomeInput = false;

  constructor(public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.constructObjectModel();
    this.showErrorMessage = false;
  }


  getValueForField(field: {key: string, value: string, actualValue: string | number | Date | undefined}) {
    if(field.value === "string")
      return '';
    return 0;
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


  getFieldType(value: string) {
    if(value === "string")
      return "text"
    return "number"
  }

  getPlaceholder(key: string): String {
    // @ts-ignore
    return String(this.modelObject[key]);
  }

  tryAndSaveEventItem() {
    let newObject = {};
    this.showErrorMessage=false;
    this.getEventItemFields()
      .forEach((fieldData: {key: string, value: string}) => {
        let currentFieldValue = (<HTMLInputElement> document.getElementById(fieldData.key)).value;
        // @ts-ignore
        let newValueForField = this.getValueOfElementFromField(fieldData, currentFieldValue, this.modelObject[fieldData.key])
        // @ts-ignore
        newObject[fieldData.key] = newValueForField;
        console.log("field", fieldData.key, newValueForField);
      })
    // @ts-ignore
    newObject['startDate'] = this.modelObject['startDate'];
    // @ts-ignore
    newObject['endDate'] = this.modelObject['endDate'];
    this.retrieveCreatedData.emit(JSON.stringify(newObject));
  }

  getValueOfElementFromField(field: {key: string, value: string}, textValue: string, originalValue: string): number | string {
    if(textValue === '')
      return field.value === "number" ? Number(originalValue) : originalValue;
    if(field.value === "number")
      if(isNaN(Number(textValue)))
        return -1
      else
        return Number(textValue);
    return textValue;
  }

  validateUserInput(){
    this.hasSomeInput = true;
    let start = (<HTMLInputElement> document.getElementById("startTime")).valueAsDate
    let end = (<HTMLInputElement> document.getElementById("endTime")).valueAsDate
    console.log(start, end);
    // @ts-ignore
    if(start === null || end === null)
      return false;
    // @ts-ignore
    if(start.getHours() > end.getHours()) {
      console.log("S hours > E hours", start.getHours(), " ", end.getHours());
      return false;
    }
    else { // @ts-ignore
      if (start.getHours() === end.getHours()){
            // @ts-ignore
        if(start.getMinutes() > end.getMinutes())
              console.log("S MM > E MM", start.getMinutes(), " ", end.getMinutes())
              return false;
          }
        else { // @ts-ignore
        if(start.getMinutes() === end.getMinutes() && start.getSeconds() > end.getSeconds()) {
          console.log("S SS > E SS", start.getSeconds(), " ", end.getSeconds())
          return false;
        }
      }
    }
    return true;
  }

  getFieldValue(field: {key: string, value: "string"}, txtVa: string) : Date | number | string {
    // @ts-ignore
    if(field.value === "number")
      return parseInt(txtVa);
    // @ts-ignore
    if(field.value === "date")
      return new Date(txtVa);
    return txtVa;
  }

  eventChange(key: string, $event: Event) {
    console.log(key)
    console.log($event)
  }

  saveEveStartAndEnd() {
    let today = new Date();
    let startDate = (<HTMLInputElement> document.getElementById("startTime")).valueAsDate;
    // @ts-ignore
    startDate.setFullYear(today.getFullYear(),today.getMonth(), today.getDate());
    // @ts-ignore
    startDate.setMinutes(startDate.getMinutes()+startDate.getTimezoneOffset())
    let endDate = (<HTMLInputElement> document.getElementById("endTime")).valueAsDate;
    // @ts-ignore
    endDate.setFullYear(today.getFullYear(),today.getMonth(), today.getDate());
    // @ts-ignore
    endDate.setMinutes(endDate.getMinutes()+endDate.getTimezoneOffset())
    // @ts-ignore
    this.modelObject['startDate'] = startDate;
    // @ts-ignore
    this.modelObject['endDate'] = endDate;
    this.stepOfCreation = 2;
  }
}
