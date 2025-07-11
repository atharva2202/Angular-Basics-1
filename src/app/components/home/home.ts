import { Component, OnInit } from '@angular/core';
import { TextDisplay } from './text-display/text-display';
import { Formatters } from './formatters/formatters';
import { SharedView } from '../../services/shared-view';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [TextDisplay, Formatters, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  view = 'hello';

  constructor(private sharedView: SharedView) {}

  ngOnInit() {
    this.sharedView.view$.subscribe((v) => (this.view = v));
  }
}
