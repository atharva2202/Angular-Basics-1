import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-database-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrls: ['./form-input.css'],
})
export class DatabaseFormComponent implements OnInit {
  dbForm!: FormGroup;
  @Output() dataSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dbForm = this.fb.group({
      dbName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]+$/)],
      ],
      port: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(http|https):\/\/[^\/]+[^\/]$/),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.dbForm.valid) {
      const { password, ...dataToStore } = this.dbForm.value;
      const entries = JSON.parse(localStorage.getItem('dbEntries') || '[]');
      entries.push(dataToStore);
      localStorage.setItem('dbEntries', JSON.stringify(entries));
      this.dataSubmitted.emit(entries); // emit updated list
      this.dbForm.reset();
    }
  }

  onCancel() {
    this.dbForm.reset();
  }
}
