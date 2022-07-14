import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { portugueseToBoolean } from 'src/utils/utils';
import type { PatientDetails } from '../patient-details/patient-details.component';
import { of } from 'rxjs/internal/observable/of';
import { delay, map, repeat } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  selectedPatient = 0;

  patientDetails!: PatientDetails;

  patientsList!: PatientDetails[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const poll = of({}).pipe(
      map(_ => this.getLoopData()),
      delay(1000),
      repeat()
    );

    poll.subscribe();
  }

  getLoopData() {
    console.log("called")
    try {
      this.dataService.getData().subscribe(data => {
        this.getPatientData(data);
      });
    } catch(ex) {
      console.log("Error")
    }
    console.log("call again")
  }

  private getPatientData(data: any[]) {
    this.patientsList = data.map(value => {
      console.log(value);
      return {
        timestamp: value.date_created,
        responsibleName: value.responsible_name,
        name: value.name,
        status: value.status,
        id: value.id
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
    });
    this.patientChanged(0);
  }

  patientChanged(selectedPatient: number) {
    this.selectedPatient = selectedPatient;
    this.patientDetails = this.patientsList[selectedPatient];
  }

}
