import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as AOS from 'aos';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss']
})

export class ComponentsComponent implements OnInit {
    page = 4;
    page1 = 5;
    focus;
    focus1;
    focus2;
    date: {year: number, month: number};
    model: NgbDateStruct;
    zoomedImages: boolean[] = [];
    numCards = 7;
    imagesLoaded = 0;
    constructor( private renderer : Renderer2, private elRef: ElementRef) {}

    ngOnInit() {
        AOS.init();
    }

    goToLink(link: string) {
        window.open(link, "_blank");
    }

    zoomImage(imageIndex: number) {
        let zoomableImages = this.elRef.nativeElement.getElementsByClassName("zoomable");
        let cards = this.elRef.nativeElement.getElementsByClassName("card");

        // Zoom in/out
        if (this.zoomedImages[imageIndex]) {
            zoomableImages[imageIndex].style.transform = "scale(1)";
            this.zoomedImages[imageIndex] = false;
            zoomableImages[imageIndex].style.zIndex = "1";
            cards[imageIndex].style.zIndex = "1";
            return;
        }
        zoomableImages[imageIndex].style.transform = "scale(2)";
        this.zoomedImages[imageIndex] = true;

        // Increase current card's z-index with the image so that other cards do not overlap with zoomed image
        zoomableImages[imageIndex].style.position = "relative";
        zoomableImages[imageIndex].style.zIndex = "3";
        cards[imageIndex].style.zIndex = "2";
    }

    imageLoaded() { 
        this.imagesLoaded += 1;
        if (this.imagesLoaded == 7 ) AOS.refresh();
    }
}
