import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import type {
  StatusId,
  Patient,
} from 'src/app/patient-card/patient-card.component';

import type { PatientDetails } from '../patient-details/patient-details.component';

interface PatientOverview {
  patientNumber: number;
  description: string;
  selected: boolean;
  patientStatusId: StatusId;
}

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnChanges{

  selected = 0;

  @Output() patientChanged = new EventEmitter<number>();

  // MOCK
  @Input() patientsList!: PatientDetails[];

  @Input() patients!: PatientOverview[];

  ngOnChanges() {
    if (!this.patientsList) return;
    this.patients = this.patientsList.map((value, index) => {
      const patient: Patient = {
        patientNumber: index,
        description: value.problemDescription,
        selected: false,
        patientStatusId: 'waiting_line',
      };
      return patient;
    });
  }

  selectCard(id: number) {
    this.selected = id;
    this.patientChanged.emit(this.selected);
  }

  selectStatus(id: number, status: StatusId) {
    this.patients[id].patientStatusId = status;
  }
}
