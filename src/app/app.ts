import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Home, FormsModule, Header],
  /* template: ``, */
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'text-formatter';
}
