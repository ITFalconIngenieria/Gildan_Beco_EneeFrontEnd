import { Component, OnInit } from '@angular/core';
import { ReportsService } from './service/reports.service';
import { ReportData } from 'src/Core/interfaces/report.interface';
import { ReportData2 } from 'src/Core/interfaces/reportDiario.interface';
import { NotificationService } from '@shared/services/notification.service';
import { formatDate } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { constancias } from 'src/Core/interfaces/constancia.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { concatMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { ChangeDetectorRef } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();

  isConsulted = false;
  resp: ReportData | null = null;
  listOfData: ReportData[] = [];
  listOfData2: ReportData2[] = [];
  validateError: boolean = false;
  generateInvoicesForm!: FormGroup;
  pipe = new DatePipe('en-US');
  isLoading: boolean = false;
  dates: { from: any; to: any } = { from: '', to: '' };
  mes: string = '';



  initialDate = new Date(
    formatDate(
      new Date().toISOString(),
      'yyyy-MM-dd 00:00:00.000',
      'en-US',
      'GMT'
    )
  );
  ranges = {
    Today: [this.initialDate, this.initialDate],
    'This Month': [this.initialDate, endOfMonth(new Date())],
  };
  showFechaPicker: boolean = false;
  pdfData: string = '';


  meses = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];
  FechaEmision = new Date();
  ANIO = this.FechaEmision.getFullYear();
  MES = this.meses[this.FechaEmision.getMonth()];
  DIA = this.FechaEmision.getDate();


  fecha = new Date(this.fechaInicial);
  anio = this.fecha.getFullYear();
  horas = new Date();
  hora = this.horas.getHours();
  minuto = this.horas.getMinutes();
  segundos = this.horas.getSeconds();
  horaFormateada = '';

  constructor(
    private cd: ChangeDetectorRef,
    private reportService: ReportsService,
    private notificationService: NotificationService,
    private nzMessageService: NzMessageService,
    private datePipe: DatePipe,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.GenerateInvoicesCleanForm();

    this.generateInvoicesForm
      .get('periodo')!
      .valueChanges.subscribe((selectedPeriod) => {
        this.onPeriodChange(selectedPeriod);
      });
  }


  onPeriodChange(selectedPeriod: string): void {
    this.showFechaPicker = selectedPeriod === 'rangoFechas';
    const fechaControl = this.generateInvoicesForm.get('fecha');
    if (fechaControl) {
      switch (selectedPeriod) {
        case 'ayer':
          this.fechaInicial = addDays(new Date(), -1);
          this.fechaFinal = new Date();
          fechaControl.disable();
          break;
        case 'estaSemana':
          this.fechaInicial = addDays(startOfWeek(new Date()), 1);
          this.fechaFinal = new Date();
          fechaControl.disable();
          break;
        case 'esteMes':
          this.fechaInicial = startOfMonth(new Date());
          this.fechaFinal = new Date();
          fechaControl.disable();
          break;
        case 'mesAnterior':
          this.fechaInicial = startOfMonth(addMonths(new Date(), -1));
          this.fechaFinal = addDays(endOfMonth(addMonths(new Date(), -1)), 1);
          fechaControl.disable();
          break;
        case 'rangoFechas':
          fechaControl.enable();
          break;
        default:
          fechaControl.disable();
      }
      if (selectedPeriod === 'rangoFechas') {
        this.onChange;
      } else {
        fechaControl.setValue([this.fechaInicial, this.fechaFinal]);
      }
    }
  }

  onChange(result: Date[]): void {
    this.fechaInicial = result[0];
    this.fechaFinal = result[1];

    // Obtén el mes y el año de la fecha inicial
    this.mes = this.meses[this.fechaInicial.getMonth()];
    this.anio = this.fechaInicial.getFullYear();
    this.hora = this.fechaInicial.getHours();
    this.minuto = this.fechaInicial.getMinutes();
    this.segundos = this.fechaInicial.getSeconds();
    this.horaFormateada = this.hora + '-' + this.minuto + '-' + this.segundos;
    this.dates = {
      from: result[0],
      to: result[1],
    };
  }

  GenerateInvoicesCleanForm() {
    this.generateInvoicesForm = this.fb.group({
      periodo: ['seleccionar', [Validators.required]],
      fecha: [{ value: '', disabled: true }, [Validators.required]],
      tipoReporte: ['reporte', [Validators.required]]
    });
  }


  validateForm(): boolean {
    let periodoSeleccionado = this.generateInvoicesForm.value.periodo;
    let tipoReporteSeleccionado = this.generateInvoicesForm.value.tipoReporte;

    if (!periodoSeleccionado || periodoSeleccionado === 'seleccionar') {
      this.notificationService.createNotification(
        'error',
        'Falló',
        `Seleccione un Rango de Fechas 😓`
      );
      return false;
    }

    if (!tipoReporteSeleccionado || tipoReporteSeleccionado === 'reporte') {
      this.notificationService.createNotification(
        'error',
        'Falló',
        `Seleccione un tipo de Reporte 😓`
      );
      return false;
    }

    return true;
  }



  submitForm() {
    if (!this.validateForm()) {
      return;
    }
    let isLoading = true;
    this.nzMessageService
      .loading('Acción en progreso', {
        nzAnimate: isLoading,
        nzPauseOnHover: isLoading,
      })
      .onClose!.pipe(
        concatMap(
          () => this.nzMessageService.success('Carga finalizada').onClose!
        ),
        concatMap(() => this.nzMessageService.info('Carga finalizada').onClose!)
      )
      .subscribe(() => { });

    let generateFacturaSchema1 = {
      fechaInicial: '',
    };

    let generateFacturaSchema2 = {
      fechaFinal: '',
    };

    if (this.generateInvoicesForm.value.periodo === 'rangoFechas') {
      generateFacturaSchema1.fechaInicial =
        this.pipe.transform(
          new Date(this.generateInvoicesForm.value.fecha[0]),
          'yyyy-MM-dd 00:00:00.000',
          '-0600'
        ) ?? '';
      generateFacturaSchema2.fechaFinal =
        this.pipe.transform(
          new Date(this.generateInvoicesForm.value.fecha[1]),
          'yyyy-MM-dd 00:00:00.000',
          '-0600'
        ) ?? '';
    } else {
      generateFacturaSchema1.fechaInicial =
        this.pipe.transform(
          this.fechaInicial,
          'yyyy-MM-dd 00:00:00.000',
          '-0600'
        ) ?? '';
      generateFacturaSchema2.fechaFinal =
        this.pipe.transform(
          this.fechaFinal,
          'yyyy-MM-dd 00:00:00.000',
          '-0600'
        ) ?? '';
    }
    let { fechaInicial } = generateFacturaSchema1;
    let { fechaFinal } = generateFacturaSchema2;
    let reporte = this.generateInvoicesForm.value.tipoReporte;
    this.reportService
      .getDataMedidores(fechaInicial, fechaFinal, reporte)
      .subscribe((result: any) => {
        if (result.error) {
          this.notificationService.createNotification(
            'error',
            'Falló',
            `${result.error} 😓`
          );
          isLoading = false;
          this.isConsulted = false;
        } else {
          if (reporte == 'resumen') {
            if (result.dataM?.length > 0) {
              const primerElemento = result.dataM[0];
              this.listOfData = [primerElemento];
              this.notificationService.createMessage(
                'success',
                'La acción se ejecutó con éxito 😎'
              );
              this.isConsulted = true;
              isLoading = false;
            } else {
              this.notificationService.createNotification(
                'error',
                'No existen lecturas para este periodo',
                '😓'
              );
              this.isConsulted = false;
              isLoading = false;
            }
          }

          if (reporte == 'diario') {
            if (result.Energiadiaria?.length > 0 && reporte == 'diario') {
              this.listOfData2 = result.Energiadiaria;
              this.notificationService.createMessage(
                'success',
                'La acción se ejecutó con éxito 😎'
              );
              this.isConsulted = true;
              isLoading = false;
            } else {
              this.notificationService.createNotification(
                'error',
                'No existen lecturas para este periodo2',
                '😓'
              );
              this.isConsulted = false;
              isLoading = false;
            }
          }
        }
      });
  }

  public downloadPdf() {
    let tipoReporteSeleccionado = this.generateInvoicesForm.value.tipoReporte;
    if (tipoReporteSeleccionado == 'resumen') {
      const data = document.querySelector('.info') as HTMLElement;
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295;
        let imgHeight = (4763* imgWidth) / 2399;
        let heightLeft = imgHeight;
        let contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('BECO-ENEE GILDAN ' + this.mes + ' ' + this.anio + ' ' + this.horaFormateada + '.pdf');
      });
    }
    if(tipoReporteSeleccionado == 'diario'){
      const data = document.querySelector('.info2') as HTMLElement;
      html2canvas(data).then((canvas) => {
        const imgWidth = 208;
        const pageHeight = 295.5;

        console.log(canvas.height , canvas.width)
        let imgHeight = (2737 * imgWidth) / 1452;
        let heightLeft = imgHeight;
        let contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        pdf.save('BECO-ENEE GILDAN DIARIO ' + this.mes + ' ' + this.anio + ' ' + this.horaFormateada + '.pdf');
      });

    }

  }
}
