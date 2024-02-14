import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordStrengthValidator} from "./core/validators/password-strength.validator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'validated-password';
  public form: FormGroup = this.getFormGroup();

  constructor(private readonly fb: FormBuilder) {
  }
  private getFormGroup(): FormGroup {
    return this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]]
    })
  }
}
