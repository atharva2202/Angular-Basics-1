import { Component, OnInit } from '@angular/core';
import { TextService } from '../../../../services/text.service';

@Component({
  selector: 'app-count',
  imports: [],
  templateUrl: './count.html',
  styleUrl: './count.css',
})
export class Count implements OnInit {
  charCount = 0;
  wordCount = 0;

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.textService.text$.subscribe((text) => {
      this.charCount = text.length;
      this.wordCount = text ? text.split(/\s+/).length : 0;
    });
  }
}
