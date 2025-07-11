import { Component } from '@angular/core';
import { TextService } from '../../../../services/text.service';
@Component({
  selector: 'app-formatting',
  imports: [],
  templateUrl: './formatting.html',
  styleUrl: './formatting.css',
})
export class Formatting {
  constructor(private textService: TextService) {}

  clearAll() {
    this.textService.clearText();
  }

  reverseAll() {
    this.textService.reverseSentence();
  }

  removeStyling() {
    this.textService.removeStyling();
  }

  removeWhiteSpace() {
    this.textService.removeWhiteSpace();
  }

  removeSpecialChar() {
    //this.textService.removeSpecialCharacters();
  }

  capitalizeWord() {
    this.textService.capitalizeWords();
  }

  toggle(style: 'bold' | 'italic' | 'underline') {
    this.textService.toggleStyle(style);
  }

  changeColor(event: Event) {
    const input = event.target as HTMLInputElement;
    this.textService.updateColor(input.value);
  }

  increaseFont() {
    this.textService.increaseFontSize();
  }

  decreaseFont() {
    this.textService.decreaseFontSize();
  }
}
