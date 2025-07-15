import { Component, OnInit } from '@angular/core';
import { TextDisplay } from './text-display/text-display';
import { Formatters } from './formatters/formatters';
import { SharedView } from '../../services/shared-view';
import { CommonModule } from '@angular/common';
import { Gojs } from '../../gojs/gojs';
import { DatabaseFormComponent } from './form/form-input/form-input';
import { Output } from './form/output/output';
@Component({
  selector: 'app-home',
  imports: [
    TextDisplay,
    Formatters,
    CommonModule,
    DatabaseFormComponent,
    Output,
    Gojs,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  view = 'hello';
  dbData: any[] = [];

  constructor(private sharedView: SharedView) {}

  ngOnInit() {
    this.sharedView.view$.subscribe((v) => {
      this.view = v;

      // If switching to entry view, fetch stored cookie data
      if (v === 'entry') {
        const stored = localStorage.getItem('dbEntries');
        this.dbData = stored ? JSON.parse(stored) : [];
      }
    });
  }
  handleSubmitted(data: any[]) {
    this.dbData = data; // update passed to db-display
  }
}
