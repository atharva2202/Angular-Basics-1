import { Component } from '@angular/core';
import { TextDisplay } from './text-display/text-display';
import { Formatters } from './formatters/formatters';

@Component({
  selector: 'app-home',
  imports: [TextDisplay, Formatters],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
