import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-output',
  imports: [CommonModule],
  templateUrl: './output.html',
  styleUrl: './output.css',
})
export class Output implements OnInit {
  @Input() entries: any[] = [];

  ngOnInit() {
    const stored = localStorage.getItem('dbEntries');
    if (stored) {
      this.entries = JSON.parse(stored);
    }
  }
}
