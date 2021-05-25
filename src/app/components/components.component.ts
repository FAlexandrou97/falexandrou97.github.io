import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
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
    constructor( private renderer : Renderer2, private elRef: ElementRef) {}
    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

    ngOnInit() {
        let input_group_focus = document.getElementsByClassName('form-control');
        let input_group = document.getElementsByClassName('input-group');
        for (let i = 0; i < input_group.length; i++) {
            input_group[i].children[0].addEventListener('focus', function (){
                input_group[i].classList.add('input-group-focus');
            });
            input_group[i].children[0].addEventListener('blur', function (){
                input_group[i].classList.remove('input-group-focus');
            });
        }

        // Initialize zoomedImages
        for (let i = 0; i < this.numCards; i++) this.zoomedImages.push(false);
    }

    goToLink(link: string) {
        window.open(link, "_blank");
    }

    zoomImage(imageIndex: number) {
        let zoomableImages = this.elRef.nativeElement.getElementsByClassName("zoomable");
        // Zoom in/out
        if (this.zoomedImages[imageIndex]) {
            zoomableImages[imageIndex].style.transform = "scale(1)";
            this.zoomedImages[imageIndex] = false;
            return;
        }
        zoomableImages[imageIndex].style.transform = "scale(2)";
        this.zoomedImages[imageIndex] = true;

        // Increase current card's z-index with the image so that other cards do not overlap with zoomed image
        zoomableImages[imageIndex].style.position = "relative";
        zoomableImages[imageIndex].style.zIndex = "3";
        let cards = this.elRef.nativeElement.getElementsByClassName("card");
        cards[imageIndex].style.zIndex = "2";
    }
}
