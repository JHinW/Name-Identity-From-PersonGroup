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
var imageList_entity_1 = require('../entity/imageList.entity');
var FaceApiCall = (function () {
    function FaceApiCall() {
    }
    FaceApiCall.prototype.getDefaultImages = function () {
        return Promise.resolve(imageList_entity_1.Images);
    };
    FaceApiCall = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FaceApiCall);
    return FaceApiCall;
}());
exports.FaceApiCall = FaceApiCall;
//# sourceMappingURL=faceApiCall.js.map