import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textbox',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './textbox.component.html',
})
export class TextboxComponent {
  @Input() controller!: FormControl;
  @Input() name!: string;
  @Input() label!: string;
  @Input() type!: string;

  ngOnInit() {
    this.controller.valueChanges.subscribe((val: string) => {
      console.log({ val });
    });
  }
}
