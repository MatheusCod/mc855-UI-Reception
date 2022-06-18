import { Component, Input } from '@angular/core';

import type {
  StatusId,
  Patient,
} from 'src/app/patient-card/patient-card.component';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent {

  @Input() selected = 0;

  // MOCK
  @Input() patients = [0, 1, 2, 3, 4, 5].map(id => {
    const patient: Patient = {
      patientNumber: id,
      description: 'lorem ipsum something something',
      selected: false,
      patientStatusId: 'waiting_line',
    };
    return patient;
  });

  selectCard(id: number) {
    this.selected = id;
  }

  selectStatus(id: number, status: StatusId) {
    this.patients[id].patientStatusId = status;
  }
}
