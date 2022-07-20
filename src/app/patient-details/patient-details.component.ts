import { Component, Input } from '@angular/core';
import {
  patientStatus as statusOptions,
  invertedPatientStatus as invertedStatusOptions,
  StatusId,
} from 'src/app/patient-card/patient-card.component';
import { booleanToPortuguese } from 'src/utils/utils';
import { DataService } from '../data.service';

export interface PatientDetails {
  timestamp: Date;
  responsibleName: string;
  id: string;
  name: string;
  status: StatusId;
}

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent {
  constructor(private dataService: DataService) {}

  initial_status : string = '';

  @Input() patientStatusOptions = statusOptions;

  _patientDetails = {
    timestamp: new Date(),
    responsibleName: 'Responsible',
    name: 'Name',
    id: '123',
  };

  @Input() set patientDetails(value: any) {
    this.initial_status = ''
    this._patientDetails = value;
  }

  get patientDetails(): any {
    return this._patientDetails;
  }

  @Input() status!: string;

  changeStatus(value: keyof typeof invertedStatusOptions) {
    const statusId = invertedStatusOptions[value];
    this.dataService
      .updateStatus(this._patientDetails.id, statusId)
      .subscribe((result) => {});
  }

  booleanToPortuguese = booleanToPortuguese;
}
