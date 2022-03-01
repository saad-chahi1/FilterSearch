import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DechargementService } from 'src/app/service/dechargement.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

export interface Cargo {
  cargo_contrat: string;
  cargo_number: string;
  vessel: string;
  quantity: number;
}

const ELEMENT_DATA: Cargo[] = [
  {cargo_contrat: "CARG_XXX_1", cargo_number: "1/12", vessel: "CARGO1", quantity: 12},
  {cargo_contrat: "CARG_XXX_2", cargo_number: "2/12", vessel: "CARGO2", quantity: 12},
  {cargo_contrat: "CARG_XXX_3", cargo_number: "3/12", vessel: "CARGO3", quantity: 15},
  {cargo_contrat: "CARG_XXX_4", cargo_number: "4/12", vessel: "CARGO4", quantity: 7}
];

@Component({
  selector: 'app-commencer-dechargement',
  templateUrl: './commencer-dechargement.component.html',
  styleUrls: ['./commencer-dechargement.component.css']
})

export class CommencerDechargementComponent implements OnInit {

  formGroup!: FormGroup;
  formSaisie!: FormGroup;
  tableFormGroup!: FormGroup;

  displayedColumns: string[] = ['index', 'dech', 'arr', 'even', 'finShift', 'finDech','cargo_contrat', 'cargo_number', 'vessel', 'quantity'];
  tableDisplayedColumns: string[] = ['index','cargo_contrat', 'cargo_number', 'vessel', 'quantity', 'commencer'];
  
  dataSource:any = [];
  tableDataSource:any;
  dialogRef:any;
  dialogRefComm:any;

  constructor(private fb:FormBuilder, 
    private service: DechargementService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group
    ({
      nom:[''],
      contrat:['']
    });
    this.formSaisie = this.fb.group({
      nor:['', Validators.required],
      debutAcc:['', Validators.required],
      finAcc:['', Validators.required],
      debutSurvey:['', Validators.required],
      finSurvey:['', Validators.required],
      debutDech:['', Validators.required],
      delivrance:['']
    })
  }

  rechercheNavire(templateRef: TemplateRef<any>){
    this.service.searchNavireS(this.formGroup.value.nom, this.formGroup.value.contrat).subscribe(
      data=>{
        this.tableDataSource = data
        this.dialogRef = this.dialog.open(templateRef, {
          width: '100%',
          data: data
        });
      }
    );
  }
  CommencerDech(i:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Etes vous sur de vouloir commencer le déchargement du navire"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.editValidation(i).subscribe(
          data=>{
            this.dataSource.push(data); 
            let cloned = this.dataSource.slice();
            this.dataSource = cloned; 
            this.service.searchNavireS(this.formGroup.value.nom, this.formGroup.value.contrat).subscribe(
              data=>{
                this.tableDataSource = data;
              }
            );
            this.dialogRef.close();         
          }
        );      
      }
    });   
  } 
  OpenCommencerDialog(templateRef: TemplateRef<any>){
    this.dialogRefComm = this.dialog.open(templateRef, {
      width: '100%',
    });
  }
  CommencerDechargement(){
    this.service.commencer(this.formSaisie.value).subscribe(
      data=>{
        console.log(data);
        this.dialogRefComm.close();
      }
    );
  }

}
