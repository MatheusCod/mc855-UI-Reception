import { Component, Input } from '@angular/core';
import {
  patientStatus as statusOptions,
  invertedPatientStatus as invertedStatusOptions,
} from 'src/app/patient-card/patient-card.component';
import { booleanToPortuguese } from 'src/utils/utils';

export interface PatientDetails {
  timestamp: Date;
  responsibleName: string;
  name: string;
  birthDate: Date;
  CNS: string;
  undergoingThreatment: boolean;
  undergoingMedicine: boolean;
  hasChronicDisease: boolean;
  problemDescription: string;
  specialityRequired: string;
  isScheduled: boolean;
  scheduleDate: Date;
}

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent{

  @Input() patientStatusOptions = statusOptions;
  
  @Input() patientDetails = {
    timestamp: new Date(),
    responsibleName: 'Responsible',
    name: 'Name',
    birthDate: new Date(),
    CNS: '124124172984791824',
    undergoingThreatment: true,
    undergoingMedicine: true,
    hasChronicDisease: false,
    problemDescription: 'Something lorem ipsum',
    specialityRequired: 'Specialty',
    isScheduled: true,
    scheduleDate: new Date(),
  };
  
  @Input() status!: string;

  constructor() { }

  // MOCK
  changeStatus(value: keyof typeof invertedStatusOptions) {
    const statusId = invertedStatusOptions[value];
  }

  booleanToPortuguese = booleanToPortuguese;

}
