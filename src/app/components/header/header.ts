import { Component } from '@angular/core';
import { SharedView } from '../../services/shared-view';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private sharedView: SharedView) {}

  loadFormatterView() {
    this.sharedView.setView('formatter');
  }

  loadEntryView() {
    this.sharedView.setView('entry');
  }
}
