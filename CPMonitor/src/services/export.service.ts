import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // End pf tabel check box selection
  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, "Health.xlsx");

  }  

  exportpdf() {
    let DATA: any = document.getElementById('excel-table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Health.pdf');
    });
  }
}
