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
  editEventForm: FormGroup;

  constructor(public modalService: NgbModal, public formBuilder: FormBuilder) {
    this.editEventForm = formBuilder.group({});
  }

  ngOnInit(): void {
    this.editEventForm = this.formBuilder.group(this.getFormControlsConfig())
  }

  getFormControlsConfig() {
    let controlsConfig = {};
    this.getEventItemFields().forEach((element: { key: string | number; }) => {
      // @ts-ignore
      controlsConfig[element.key] = '';
    })
    return controlsConfig;
  }
  openModal(content: any){
    this.modalService.open(content)
    console.log(this.getEventItemFields())
  }

  onSubmit() {
    this.modalService.dismissAll();
    console.log("CLOSE")
  }

}
