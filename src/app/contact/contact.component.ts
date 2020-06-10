import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Contact from '../models/contact';
import {ContactService} from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  formulaire: FormGroup;

  constructor(private contactService: ContactService, private form: FormBuilder) { }

  ngOnInit(): void {
    this.contact = new Contact();
    this.formulaire = this.form.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phoneNumber: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.requiredTrue],
    });
  }
  onSubmit() {
    this.contactService.registerContactForm(this.contact).subscribe(() => {
      alert('Your message has been sent.');
      this.formulaire.reset();
    }, (error: any) => {
      console.log('Error', error);
    });
  }
}
