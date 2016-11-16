"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var mission_service_1 = require('../service/mission.service');
var Draggable = (function () {
    //transform: translate(-750px, 0px) translateZ(0px);
    function Draggable(element, renderer, mission) {
        this.element = element;
        this.renderer = renderer;
        this.mission = mission;
        this.mouseDown = false;
        this.X = 0;
        this.horizonX = -750;
    }
    Draggable.prototype.onMouseup = function (event) {
        if (this.mouseDown) {
            this.mouseDown = false;
            this.horizonX = Math.round(this.horizonX / 250) * 250;
            this.horizonX = this.horizonX > 0 ? 0 : this.horizonX;
            this.horizonX = this.horizonX < -3250 ? -3250 : this.horizonX;
            this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translate(' + String(this.horizonX) + 'px,0px) translateZ(0px)');
            this.mission.emitMission(this.horizonX / 250 * -1 + 1);
        }
    };
    Draggable.prototype.onMousedown = function (event) {
        this.mouseDown = true;
        this.X = event.x;
    };
    Draggable.prototype.onMousemove = function (event) {
        if (this.mouseDown) {
            this.horizonX = this.horizonX - this.X + event.x;
            this.X = event.x;
            this.renderer.setElementStyle(this.element.nativeElement, 'transform', 'translate(' + String(this.horizonX) + 'px,0px) translateZ(0px)');
        }
    };
    Draggable.prototype.ngOnInit = function () {
    };
    Draggable.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousemove", null);
    Draggable = __decorate([
        core_1.Directive({
            selector: '[draggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, mission_service_1.MissionService])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;
var DRAGGABLE_DIRECTIVES = [Draggable];
var DraggableModule = (function () {
    function DraggableModule() {
    }
    DraggableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            exports: DRAGGABLE_DIRECTIVES,
            declarations: DRAGGABLE_DIRECTIVES
        }), 
        __metadata('design:paramtypes', [])
    ], DraggableModule);
    return DraggableModule;
}());
exports.DraggableModule = DraggableModule;
//# sourceMappingURL=ng2-draggable.js.map