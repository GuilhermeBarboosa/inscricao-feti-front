import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscricaoService } from 'src/app/routes/inscricao.service';

@Component({
  selector: 'app-dialog-inscricao',
  templateUrl: './dialog-inscricao.component.html',
  styleUrls: ['./dialog-inscricao.component.css'],
})
export class DialogInscricaoComponent {
  Sim = 'Sim';
  Nao = 'Nao';

  constructor(
    public dialogRef: MatDialogRef<DialogInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data.value = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
