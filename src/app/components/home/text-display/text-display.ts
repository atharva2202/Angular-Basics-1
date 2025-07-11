import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextService } from '../../../services/text.service';
import { CommonModule } from '@angular/common';

import { SpecialCharRemoverPipe } from '../../../pipes/special-char-remover-pipe';

@Component({
  selector: 'app-text-display',
  imports: [FormsModule, CommonModule, SpecialCharRemoverPipe],
  templateUrl: './text-display.html',
  styleUrl: './text-display.css',
})
export class TextDisplay implements OnInit {
  @Input() formatAction: string = '';
  name: string = '';
  styleObject: any = {};
  constructor(private textService: TextService) {}

  ngOnInit(): void {
    this.textService.text$.subscribe((text) => {
      this.name = text;
    });

    this.textService.style$.subscribe((style) => {
      this.styleObject = {
        'font-weight': style.bold ? 'bold' : 'normal',
        'font-style': style.italic ? 'italic' : 'normal',
        'text-decoration': style.underline ? 'underline' : 'none',
        color: style.color,
        'font-size.px': style.fontSize,
      };
    });
  }

  onInputChange(): void {
    this.textService.updateText(this.name);
  }
}
