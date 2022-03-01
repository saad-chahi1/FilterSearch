import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class DechargementService {
  urlCargo:string = `http://localhost:3000/cargos`;
  urlCommener:string= `http://localhost:3000/commencers`;
  id!: number;
  productObj: object = {};
  
  constructor(private http:HttpClient) { }

  searchNavireS(nom: string, contrat:string) {
    if(nom != "" && contrat != ""){
      return this.http
      .get(`${this.urlCargo}?cargo_contrat_like=${contrat.trim()}&vessel_like=${nom.trim()}`);
    }
    else if (nom) {
      return this.http
        .get(`${this.urlCargo}?vessel_like=${nom.trim()}`)
        .pipe(tap((_) => console.log(`Searching for: ${nom}`)));
    }else if(contrat){
      return this.http
        .get(`${this.urlCargo}?cargo_contrat_like=${contrat.trim()}`)
        .pipe(tap((_) => console.log(`Searching for: ${contrat}`)));
    } else {
      return this.http.get(this.urlCargo);
    }
  }
  editValidation(cargaison: any){
    this.productObj = {
      id: cargaison.id,
      cargo_contrat:cargaison.cargo_contrat,
      cargo_number: cargaison.cargo_number,
      vessel: cargaison.vessel,
      quantity: cargaison.quantity,
      validation: true
    };
    const shipmentUrl = `${this.urlCargo}/${cargaison.id}`;

    return this.http.put(shipmentUrl, JSON.stringify(this.productObj), httpOptions);
  }
  commencer(object:any){
    return this.http.post(this.urlCommener, object);
  }
}
