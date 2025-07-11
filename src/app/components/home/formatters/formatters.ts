import { Component } from '@angular/core';
import { Count } from './count/count';
import { Formatting } from './formatting/formatting';

@Component({
  selector: 'app-formatters',
  imports: [Count, Formatting],
  templateUrl: './formatters.html',
  styleUrl: './formatters.css',
})
export class Formatters {}
