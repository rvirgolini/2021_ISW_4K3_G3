import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Resumen } from 'src/app/models/resumen';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ResumenComponent>
  , @Inject(MAT_DIALOG_DATA) public data: Resumen
  , private router: Router,
  ) { }

  ngOnInit(): void {
  }
 cerrar(): void{
   this.dialogRef.close()
   this.router.navigate(["/"]);
 }
}
