import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms/src/directives/ng_form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import { AuthService } from '../../service/auth.service';
import { DatabaseService } from '../../service/database.service';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-register-red',
  templateUrl: './register-red.component.html',
  styleUrls: ['./register-red.component.css']
})
export class RegisterRedComponent implements OnInit {
  registerForm: FormGroup;
  usuario: User = {
    userid: '',
    name: '',
    photoUrl: '',
    phone: '',
    mail: '',
    latitud: '',
    longitud: '',
    agenda: {
      nombre: '',
      contacto: ''
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private afs: AngularFirestore,
    private dataservice: DatabaseService,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addContac() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.dataservice.addPublish(this.usuario);
        this.usuario.agenda.nombre = 'holo';
        this.usuario.agenda.contacto = '';
        this.router.navigate(['/Perfil']);
      }
    });
  }
}
