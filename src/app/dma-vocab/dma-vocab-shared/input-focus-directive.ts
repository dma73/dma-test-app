import {AfterContentChecked, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[appInputAutoFocus]'
})
export class InputFocusDirective implements AfterContentChecked {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngAfterContentChecked(): void {
    if (this.element.nativeElement.value.length === 0) {
      this.element.nativeElement.focus();
    }
  }
}
