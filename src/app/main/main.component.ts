import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { portugueseToBoolean } from 'src/utils/utils';
import type { PatientDetails } from '../patient-details/patient-details.component';
import { of } from 'rxjs/internal/observable/of';
import { delay, map, repeat } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponentComponent } from '../snackbar-component/snackbar-component.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  selectedPatient = 0;

  patientDetails!: PatientDetails;

  patientsList: PatientDetails[] = [];

  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const poll = of({}).pipe(
      map((_) => this.getLoopData()),
      delay(5000),
      repeat()
    );

    poll.subscribe();
  }

  getLoopData() {
    try {
      this.dataService.getData().subscribe((data) => {
        this.getPatientData(data);
      });
    } catch (ex) {}
  }

  private getPatientData(data: any[]) {
    let newPatientList = data
      .map((value) => {
        return {
          timestamp: value.date_created,
          responsibleName: value.responsible_name,
          name: value.name,
          status: value.status,
          id: value.id,
          // timestamp: value.date_created,
          // responsibleName: value.responsible_name,
          // name: value.pacient_name,
          // birthDate: value.pacient_birthdate,
          // CNS: value.pacient_cns,
          // undergoingThreatment: portugueseToBoolean(value.pacient_undergoing_threatment),
          // undergoingMedicine: portugueseToBoolean(value.pacient_undergoing_medicine),
          // hasChronicDisease: portugueseToBoolean(value.has_chronic_disease),
          // problemDescription: value.pacient_problem,
          // specialityRequired: value.speciality_required,
          // isScheduled: portugueseToBoolean(value.has_schedule),
          // scheduleDate: value.schedule_date,
        };
      })
      .sort((b, a) => {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      })
      .filter((a) => {
        return (
          new Date().getTime() - new Date(a.timestamp).getTime() <
            60 * 60 * 1000 && a.status != 'done'
        );
      });

    newPatientList.forEach((newPatient) => {
      if (!this.patientsList.find((patient) => patient.id == newPatient.id)) {
        this.openSnackBar();
      }
    });
    this.patientsList = newPatientList;
    this.patientChanged(0);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponentComponent, {
      duration: 3 * 1000,
    });
  }

  patientChanged(selectedPatient: number) {
    this.selectedPatient = selectedPatient;
    this.patientDetails = this.patientsList[selectedPatient];
  }
}
