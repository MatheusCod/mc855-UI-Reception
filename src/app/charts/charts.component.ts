import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StatusId } from '../patient-card/patient-card.component';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  patientsList: {
    timestamp: any;
    responsibleName: any;
    name: any;
    status: StatusId;
    id: any;
  }[] = [];
  patientsTypeMapped: any[] = [];
  hoursObj: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.getPatientData(data);
      this.patientsTypeMapped = [
        {
          name: 'Aguardando atendimento da recepção',
          value: this.reduceByType('waiting_definition'),
        },
        {
          name: 'Aguardando médico',
          value: this.reduceByType('waiting_doctor'),
        },
        {
          name: 'Esperando na fila',
          value: this.reduceByType('waiting_line'),
        },
      ];

      let middleObj = []

      for (var i = 7; i < 24; i++) {
        let newVal = {
          value: this.patientsList.filter(
            (val) => {
              return new Date(val.timestamp).getHours() == i
            }
          ).length,
          name: i + ' Horas',
        };
        middleObj.push(newVal)
      }

      this.hoursObj = middleObj;
    });

  }

  private reduceByType(type: string) {
    return this.patientsList
      .map((val) => val.status)
      .reduce((partialVal, status) => {
        if (status == type) {
          return partialVal + 1;
        } else {
          return partialVal;
        }
      }, 0);
  }

  private getPatientData(data: any[]) {
    this.patientsList = data.map((value) => {
      return {
        timestamp: value.date_created,
        responsibleName: value.responsible_name,
        name: value.name,
        status: value.status,
        id: value.id,
      };
    });
  }
}
