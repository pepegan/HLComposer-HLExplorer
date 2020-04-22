/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PropietarioRestauranteService } from './PropietarioRestaurante.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-propietariorestaurante',
  templateUrl: './PropietarioRestaurante.component.html',
  styleUrls: ['./PropietarioRestaurante.component.css'],
  providers: [PropietarioRestauranteService]
})
export class PropietarioRestauranteComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  nombreRestaurante = new FormControl('', Validators.required);
  id = new FormControl('', Validators.required);
  nombre = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  telefono = new FormControl('', Validators.required);
  direccion = new FormControl('', Validators.required);


  constructor(public servicePropietarioRestaurante: PropietarioRestauranteService, fb: FormBuilder) {
    this.myForm = fb.group({
      nombreRestaurante: this.nombreRestaurante,
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      direccion: this.direccion
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicePropietarioRestaurante.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.supplychain.jamon.PropietarioRestaurante',
      'nombreRestaurante': this.nombreRestaurante.value,
      'id': this.id.value,
      'nombre': this.nombre.value,
      'email': this.email.value,
      'telefono': this.telefono.value,
      'direccion': this.direccion.value
    };

    this.myForm.setValue({
      'nombreRestaurante': null,
      'id': null,
      'nombre': null,
      'email': null,
      'telefono': null,
      'direccion': null
    });

    return this.servicePropietarioRestaurante.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'nombreRestaurante': null,
        'id': null,
        'nombre': null,
        'email': null,
        'telefono': null,
        'direccion': null
      });
      this.loadAll(); 
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.supplychain.jamon.PropietarioRestaurante',
      'nombreRestaurante': this.nombreRestaurante.value,
      'nombre': this.nombre.value,
      'email': this.email.value,
      'telefono': this.telefono.value,
      'direccion': this.direccion.value
    };

    return this.servicePropietarioRestaurante.updateParticipant(form.get('id').value, this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteParticipant(): Promise<any> {

    return this.servicePropietarioRestaurante.deleteParticipant(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicePropietarioRestaurante.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'nombreRestaurante': null,
        'id': null,
        'nombre': null,
        'email': null,
        'telefono': null,
        'direccion': null
      };

      if (result.nombreRestaurante) {
        formObject.nombreRestaurante = result.nombreRestaurante;
      } else {
        formObject.nombreRestaurante = null;
      }

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.nombre) {
        formObject.nombre = result.nombre;
      } else {
        formObject.nombre = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.telefono) {
        formObject.telefono = result.telefono;
      } else {
        formObject.telefono = null;
      }

      if (result.direccion) {
        formObject.direccion = result.direccion;
      } else {
        formObject.direccion = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'nombreRestaurante': null,
      'id': null,
      'nombre': null,
      'email': null,
      'telefono': null,
      'direccion': null
    });
  }
}
