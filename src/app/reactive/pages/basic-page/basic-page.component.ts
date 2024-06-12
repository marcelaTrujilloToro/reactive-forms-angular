import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const initialProduct = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6,
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export class BasicPageComponent implements OnInit {
  /* //? una manera de hacerlo  - es un poco mas de codigo !!
  public myForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(0),
    storage: new FormControl(0),
  });
  */

  //? form builder
  public basicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.basicForm.reset(initialProduct);
  }

  isValidField(field: string): boolean | null {
    return (
      this.basicForm.controls[field].errors &&
      this.basicForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.basicForm.controls[field]) return null;

    const errors = this.basicForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} characteres`;

        default:
          break;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.basicForm.invalid) {
      this.basicForm.markAllAsTouched();
      return;
    }

    console.log(this.basicForm.value);

    this.basicForm.reset({ price: 10, inStorage: 0 });
  }
}
