
import { Directive, Input, ElementRef, HostListener, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[ng2-draggable]'
})
export class Draggable implements OnInit{

    topStart:number=0;
    leftStart:number=0;
    _allowDrag:boolean = true;
    md:boolean;

    constructor(public element: ElementRef) {}

    ngOnInit(){
      //css changes
      if(this._allowDrag){
        this.element.nativeElement.style.position = 'relative';
        this.element.nativeElement.className += ' cursor-draggable';
      }
    }


        @HostListener('mousedown', ['$event'])
        onMouseDown(event:MouseEvent) {
          console.log("mouse down");
          this.md = true;
          this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px','');
          this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px','');
        }

        @HostListener('document:mouseup')
        onMouseUp() {
          this.md = false;
        }

        @HostListener('mousemove', ['$event'])
        onMouseMove(event:MouseEvent) {
          console.log("mouse move");
          if(this.md && this._allowDrag){
            this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
            this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
          }
        }

        @HostListener('touchstart', ['$event'])
        onTouchStart(event:TouchEvent) {
          console.log("touch start");
          this.md = true;
          this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px','');
          this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px','');
          event.stopPropagation();
        }

        @HostListener('document:touchend')
        onTouchEnd() {
          this.md = false;
        }

        @HostListener('touchmove', ['$event'])
        onTouchMove(event:TouchEvent) {
          console.log("touch move");
          if(this.md && this._allowDrag){
            this.element.nativeElement.style.top = (event.changedTouches[0].clientY - this.topStart) + 'px';
            this.element.nativeElement.style.left = (event.changedTouches[0].clientX - this.leftStart) + 'px';
          }
          event.stopPropagation();
        }

    @Input('ng2-draggable')
    set allowDrag(value:boolean){
      this._allowDrag = value;
      if(this._allowDrag)
        this.element.nativeElement.className += ' cursor-draggable';
      else
        this.element.nativeElement.className = this.element.nativeElement.className
                                                .replace(' cursor-draggable','');
    }
}
