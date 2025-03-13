import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dynamicFormJson } from '../shared/dynamicFormJson.interface';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  dynamicForm!: FormGroup;
  formFields: dynamicFormJson[] = [
    /*
    Text type
    Number type
    Slider
    Dropdown
    Checkbox
    Textarea
    */

    // for text type.
    {
      type: 'text',
      label: 'Name :',
      isVisible: true,
      isRequired: true,
      errorMessage: 'Name is required.',
      hint: 'Please enter your full name',
      value: '',
      options: [],
    },

    // for number type
    {
      type: 'number',
      label: 'Age :',
      isVisible: true,
      isRequired: true,
      errorMessage: 'Age is required.',
      hint: 'Please enter your Age',
      value: '',
      options: [],
    },

    // Slider
    {
      type: 'slider',
      label: 'Your experience level :',
      isVisible: true,
      isRequired: false,
      errorMessage: '',
      hint: 'Slide to select your experience level',
      value: '',
      options: [],
    },

    // Dropdown
    {
      type: 'dropdown',
      label: 'Country :',
      isVisible: true,
      isRequired: true,
      errorMessage: 'Country is required.',
      hint: 'Please select your country.',
      value: '',
      options: ['India', 'USA', 'UK'],
    },

    // Checkbox
    {
      type: 'checkbox',
      label: 'Agree to terms : ',
      isVisible: true,
      isRequired: true,
      errorMessage: 'Agree to terms & conditions',
      hint: 'I agree to terms & conditions',
      value: false,
      options: [],
    },

    // textarea
    {
      type: 'textarea',
      label: 'Comments :',
      isVisible: true,
      isRequired: false,
      errorMessage: '',
      hint: 'Your suggestions',
      value: '',
      options: [],
    },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({});
    this.createDynamicForm();
  }

  createDynamicForm() {
    // this will create dynamic form
    this.formFields.forEach((field) => {
      if (field.isVisible) {
        const validators = [];

        if (field.isRequired) {
          field.type === 'checkbox'
            ? validators.push(Validators.requiredTrue)
            : validators.push(Validators.required);
        }

        const control = this.formBuilder.control(field.value, validators);
        this.dynamicForm.addControl(field.label, control);
      }
    });
  }

  onSubmit() {
    this.dynamicForm.valid
      ? console.log(this.dynamicForm.value)
      : alert('Please fill the required values');
  }

  onReset() {
    this.dynamicForm.reset();
  }
}
