import { Component, OnInit } from "@angular/core";
import { Contact } from "src/app/_models/contact";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ContactService } from "../_services/contact.service";
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  contact: Contact;
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createContactForm();
  }

  sendContact() {
    if (this.contactForm) {
      this.contact = Object.assign({}, this.contactForm.value);
      this.contactService.sendContactMessage(this.contact).subscribe(() => {
        this.alertify.success("Trimis cu succes");
        this.router.navigate(["/home"]);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      name: [""],
      email: [""],
      phone: [""],
      message: [""],
    });
  }
}
