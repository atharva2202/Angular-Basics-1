import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export interface TextStyle {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  color: string;
  fontSize: number;
}
@Injectable({
  providedIn: 'root',
})
export class TextService {
  private textSubject = new BehaviorSubject<string>(''); // holds latest input text
  text$ = this.textSubject.asObservable();

  private styleSubject = new BehaviorSubject<TextStyle>({
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
    fontSize: 16,
  });
  style$ = this.styleSubject.asObservable();

  updateText(newText: string) {
    this.textSubject.next(newText);
  }

  getCurrentText(): string {
    return this.textSubject.getValue();
  }
  toggleStyle(property: keyof TextStyle) {
    const current = this.styleSubject.getValue();
    this.styleSubject.next({
      ...current,
      [property]: !current[property],
    });
  }

  updateColor(color: string) {
    const current = this.styleSubject.getValue();
    this.styleSubject.next({ ...current, color });
  }

  increaseFontSize() {
    const current = this.styleSubject.getValue();
    this.styleSubject.next({ ...current, fontSize: current.fontSize + 1 });
  }

  decreaseFontSize() {
    const current = this.styleSubject.getValue();
    this.styleSubject.next({ ...current, fontSize: current.fontSize - 1 });
  }
  clearText() {
    this.updateText('');
  }

  removeWhiteSpace() {
    const cleaned = this.getCurrentText().replace(/\s+/g, ' ').trim();
    this.updateText(cleaned);
  }

  reverseSentence() {
    const reversed = this.getCurrentText().split(' ').reverse().join(' ');
    this.updateText(reversed);
  }

  removeSpecialCharacters() {
    const clean = this.getCurrentText().replace(/[^a-zA-Z0-9 ]/g, '');
    this.updateText(clean);
  }

  capitalizeWords() {
    const capitalized = this.getCurrentText().replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    this.updateText(capitalized);
  }

  removeStyling() {
    const plain = this.getCurrentText();
    this.updateText(plain);

    // Reset style to defaults
    this.styleSubject.next({
      bold: false,
      italic: false,
      underline: false,
      color: '#000000',
      fontSize: 16,
    });
  }
}
