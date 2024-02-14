import {ChangeDetectionStrategy, Component, DestroyRef, inject, Injector, Input, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlName, FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule, ValidationErrors
} from "@angular/forms";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {BehaviorSubject, Observable} from "rxjs";
import {passwordVisibility} from "../core/models/password-visibility.type";
import {SvgIconComponent} from "angular-svg-icon";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-password-control',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    SvgIconComponent,
    AsyncPipe,
    HttpClientModule
  ],
  templateUrl: './password-control.component.html',
  styleUrl: './password-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordControlComponent
    }
  ]
})
export class PasswordControlComponent implements OnInit, ControlValueAccessor {
  public formControl!: FormControl;
  public passwordVisibilityState$!: Observable<passwordVisibility>;
  private passwordVisibilityStateSource: BehaviorSubject<passwordVisibility> = new BehaviorSubject<passwordVisibility>('hidden');
  onChange = (value: string) => {
  };

  onTouched = () => {
  };

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.passwordVisibilityState$ = this.passwordVisibilityStateSource.asObservable();
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.formControl =
        this.injector.get(FormGroupDirective).getControl(ngControl);
    }

  }
  public getPasswordVisibilityIcon(visibilityStatus: passwordVisibility | null): string {
    return `/assets/icons/${visibilityStatus === 'hidden' ? 'hidden' : 'opened'}-eye.svg`
  }

  public getErrorObjectKey(errorObject: ValidationErrors): string {
    return Object.keys(errorObject)[0]
  }
  public changePasswordVisibilityStatus(): void {
    const visibilityStatus = this.passwordVisibilityStateSource.getValue();
    this.passwordVisibilityStateSource.next(visibilityStatus === 'opened' ? 'hidden' : 'opened');
  }

  writeValue(password: string) {
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }


  setDisabledState(disabled: boolean) {
  }
}
