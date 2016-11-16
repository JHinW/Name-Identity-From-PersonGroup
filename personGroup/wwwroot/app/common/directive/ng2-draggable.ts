import { Directive, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, NgModule, Renderer} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionService } from '../service/mission.service';

@Directive({
    selector: '[draggable]'
})
export class Draggable implements OnDestroy, OnInit {

    mouseDown: boolean = false;

    X: number = 0;
    horizonX: number = -750;

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: any) {
        if (this.mouseDown) {
            this.mouseDown = false;
            this.horizonX = Math.round(this.horizonX / 250) * 250;
            this.horizonX = this.horizonX > 0 ? 0 : this.horizonX
            this.horizonX = this.horizonX < -3250 ? -3250 : this.horizonX;
            this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translate(' + String(this.horizonX) + 'px,0px) translateZ(0px)');
            this.mission.emitMission(this.horizonX/250 * -1 + 1);
        }
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: any) {
        this.mouseDown = true;
        this.X = event.x;
    }

    @HostListener('mousemove', ['$event'])
    onMousemove(event: any) {
        if (this.mouseDown) {
            this.horizonX = this.horizonX - this.X + event.x;
            this.X = event.x;
            this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translate(' + String(this.horizonX) + 'px,0px) translateZ(0px)');
        }
    }
    //transform: translate(-750px, 0px) translateZ(0px);
    constructor(public element: ElementRef, private renderer: Renderer, private mission: MissionService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}

const DRAGGABLE_DIRECTIVES: any[] = [Draggable];

@NgModule({
    imports: [CommonModule],
    exports: DRAGGABLE_DIRECTIVES,
    declarations: DRAGGABLE_DIRECTIVES
})
export class DraggableModule { }