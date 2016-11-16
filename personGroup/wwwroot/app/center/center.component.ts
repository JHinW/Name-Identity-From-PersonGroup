import { Component, ViewChild, ElementRef, EventEmitter, HostListener, Renderer } from '@angular/core';
import { FaceApiCall } from '../common/service/faceApiCall.service';

import { Image, Images } from '../common/entity/imageList.entity';
import { MissionService } from '../common/service/mission.service';

@Component({
    selector: 'my-center',
    templateUrl: './wwwroot/app/center/center.component.html',
    styleUrls: [
        './wwwroot/app/center/center.component.css',
        './wwwroot/app/common/css/searchBing.css',
        './wwwroot/app/common/css/imageDiv.css',
        './wwwroot/app/common/css/uploadLabel.css',
        './wwwroot/app/common/css/results.css'
    ],
    providers: [FaceApiCall, MissionService]
})
export class CenterComponent {

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('thumbnail') thumbnail: ElementRef;
    images: Image[];
    selectImgID: number = 4;
    homeDisplayStyle: string = 'block';
    detailDisplayStyle: string = 'none';
    selectedImage: Image;
    candidates: Array<any> = [];
    error: string;

    constructor(private faceApi: FaceApiCall,
        private mission: MissionService,
        private renderer: Renderer,
        public element: ElementRef) {
        faceApi.getDefaultImages().then(myImages => {
            this.images = myImages;
            this.images[this.selectImgID - 1].isSelected = true;
        });

        this.mission.missionImageSelect$.subscribe(mission => {
            this.images[this.selectImgID - 1].isSelected = false;
            this.selectImgID = mission;
            this.images[mission - 1].isSelected = true;
        });
    }

    identify(index: number, item: Image): number {
        // do what ever logic you need to come up with the unique identifier of your item in loop, 
        // i will just return the object id.
        return item.id;
    }

    useThisPhotoClick(): void {
        this.homeDisplayStyle = 'none';
        this.detailDisplayStyle = 'block';
        this.selectedImage = this.images[this.selectImgID - 1];
        let url = this.selectedImage.imgUrl;
        let baseUrl = this.element.nativeElement.baseURI;
        if (this.selectedImage.imgUrl.indexOf('http') < 0) {
            url = baseUrl + this.selectedImage.imgUrl;
        }
        this.error = "";
        this.candidates = [];
        this.faceApi.postLinkImage({
            Name: 'test',
            ImageUrl: url
        }).subscribe(
            out => {
                if (out.error != '') {
                    this.error = out.error;
                    return;
                }
                [].forEach.call(out.result[0].Candidates, (item: any, index: any) => {
                    this.faceApi.getPerson(item.PersonId).subscribe(
                        out => {
                            this.candidates.push(out.result);
                        },
                        err => {
                            // Log errors if any
                            this.error = err;
                            console.log(err);
                        });
                });
                console.log(out);
            }, 
            err => {
                // Log errors if any
                console.log(err);
            });
    }

    tryAnotherPhotoClick(): void {
        this.error = "";
        this.candidates = [];
        this.homeDisplayStyle = 'block';
        this.detailDisplayStyle = 'none';
    }

    uploadFile: any;
    hasBaseDropZoneOver: boolean = false;
    options: Object = {
        url: '/Home/IdentifyAsync'
    };

    handleUpload(data: any): void {
        this.candidates = [];
        this.error = "";
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            if (data.error == '') {
                let out = data.result || {};
                [].forEach.call(out[0].Candidates, (item: any, index: any) => {
                    this.faceApi.getPerson(item.PersonId).subscribe(
                        out => {
                            this.candidates.push(out.result);
                        },
                        err => {
                            // Log errors if any
                            console.log(err);
                        });
                });
            } else {
                console.log(data);
            }
        }
    }

    uploadBtnClick(): void {
        this.renderer.invokeElementMethod(
            this.fileInput.nativeElement, 'click', []);
    }

    onFileChange(event: any) {
        let file = event.target.files[0];
        if (!file) {
            return;
        }
        console.log(file);

        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedImage = {
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
    }
}
