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
var faceApiCall_service_1 = require('../common/service/faceApiCall.service');
var mission_service_1 = require('../common/service/mission.service');
var CenterComponent = (function () {
    function CenterComponent(faceApi, mission, renderer, element) {
        var _this = this;
        this.faceApi = faceApi;
        this.mission = mission;
        this.renderer = renderer;
        this.element = element;
        this.selectImgID = 4;
        this.homeDisplayStyle = 'block';
        this.detailDisplayStyle = 'none';
        this.candidates = [];
        this.hasBaseDropZoneOver = false;
        this.options = {
            url: '/Home/IdentifyAsync'
        };
        faceApi.getDefaultImages().then(function (myImages) {
            _this.images = myImages;
            _this.images[_this.selectImgID - 1].isSelected = true;
        });
        this.mission.missionImageSelect$.subscribe(function (mission) {
            _this.images[_this.selectImgID - 1].isSelected = false;
            _this.selectImgID = mission;
            _this.images[mission - 1].isSelected = true;
        });
    }
    CenterComponent.prototype.identify = function (index, item) {
        // do what ever logic you need to come up with the unique identifier of your item in loop, 
        // i will just return the object id.
        return item.id;
    };
    CenterComponent.prototype.useThisPhotoClick = function () {
        var _this = this;
        this.homeDisplayStyle = 'none';
        this.detailDisplayStyle = 'block';
        this.selectedImage = this.images[this.selectImgID - 1];
        var url = this.selectedImage.imgUrl;
        var baseUrl = this.element.nativeElement.baseURI;
        if (this.selectedImage.imgUrl.indexOf('http') < 0) {
            url = baseUrl + this.selectedImage.imgUrl;
        }
        this.error = "";
        this.candidates = [];
        this.faceApi.postLinkImage({
            Name: 'test',
            ImageUrl: url
        }).subscribe(function (out) {
            if (out.error != '') {
                _this.error = out.error;
                return;
            }
            [].forEach.call(out.result[0].Candidates, function (item, index) {
                _this.faceApi.getPerson(item.PersonId).subscribe(function (out) {
                    _this.candidates.push(out.result);
                }, function (err) {
                    // Log errors if any
                    _this.error = err;
                    console.log(err);
                });
            });
            console.log(out);
        }, function (err) {
            // Log errors if any
            console.log(err);
        });
    };
    CenterComponent.prototype.tryAnotherPhotoClick = function () {
        this.error = "";
        this.candidates = [];
        this.homeDisplayStyle = 'block';
        this.detailDisplayStyle = 'none';
    };
    CenterComponent.prototype.handleUpload = function (data) {
        var _this = this;
        this.candidates = [];
        this.error = "";
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            if (data.error == '') {
                var out = data.result || {};
                [].forEach.call(out[0].Candidates, function (item, index) {
                    _this.faceApi.getPerson(item.PersonId).subscribe(function (out) {
                        _this.candidates.push(out.result);
                    }, function (err) {
                        // Log errors if any
                        console.log(err);
                    });
                });
            }
            else {
                console.log(data);
            }
        }
    };
    CenterComponent.prototype.uploadBtnClick = function () {
        this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'click', []);
    };
    CenterComponent.prototype.onFileChange = function (event) {
        var _this = this;
        var file = event.target.files[0];
        if (!file) {
            return;
        }
        console.log(file);
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.selectedImage = {
                id: 0,
                imgUrl: e.target.result,
                isSelected: false
            };
        };
        reader.readAsDataURL(file);
        this.homeDisplayStyle = 'none';
        this.detailDisplayStyle = 'block';
        this.error = "";
        this.candidates = [];
    };
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', core_1.ElementRef)
    ], CenterComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.ViewChild('thumbnail'), 
        __metadata('design:type', core_1.ElementRef)
    ], CenterComponent.prototype, "thumbnail", void 0);
    CenterComponent = __decorate([
        core_1.Component({
            selector: 'my-center',
            templateUrl: './wwwroot/app/center/center.component.html',
            styleUrls: [
                './wwwroot/app/center/center.component.css',
                './wwwroot/app/common/css/searchBing.css',
                './wwwroot/app/common/css/imageDiv.css',
                './wwwroot/app/common/css/uploadLabel.css',
                './wwwroot/app/common/css/results.css'
            ],
            providers: [faceApiCall_service_1.FaceApiCall, mission_service_1.MissionService]
        }), 
        __metadata('design:paramtypes', [faceApiCall_service_1.FaceApiCall, mission_service_1.MissionService, core_1.Renderer, core_1.ElementRef])
    ], CenterComponent);
    return CenterComponent;
}());
exports.CenterComponent = CenterComponent;
//# sourceMappingURL=center.component.js.map