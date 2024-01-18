import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';

export interface IPaginator {
    pageIndex: number;
    pageSize: number;
    totalElements?: number;
}

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

    @Output() page = new EventEmitter();

    @Input() pageIndex: number = 0;
    @Input() pageSize: number = 10;
    @Input() totalElements: number = 0;

    buttons: any[] = []
    maxPage = 0;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.maxPage = Math.ceil(this.totalElements / this.pageSize);
        this.setItensButton();
    }

    ngOnInit() {
    }

    setPageConfig(totalElements: any, pageIndex: any, pageSize: any) {
        this.pageIndex = pageIndex
        this.pageSize = pageSize
        this.totalElements = totalElements
        // ===this.ngOnInit();
    }

    showIndex(index: any) {
        this.pageIndex = Number(index - 1);
        this.setItensButton();
        this.page.emit({pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.totalElements});
    }


    back() {
        if (this.pageIndex > 0) {
            this.pageIndex--;
            this.page.emit({pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.totalElements});
            this.setItensButton();
        }
    }

    more() {
        if (this.pageIndex + 3 < this.maxPage) {
            this.pageIndex = this.pageIndex + 3
        } else {
            this.pageIndex = this.maxPage - 1
        }
        this.setItensButton();
        this.page.emit({pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.totalElements});
    }

    next() {
        if (this.pageIndex < this.maxPage - 1) {
            this.pageIndex++;
            this.page.emit({pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.totalElements});
            this.setItensButton();
        }
    }


    setItensButton() {
        if (this.maxPage > 3) {
            this.buttons = [];
            let index = 0;

            if (this.pageIndex < this.maxPage - 3) {
                index = this.pageIndex;
            } else {
                index = this.maxPage - 3;
            }


            for (let i = index; i < this.maxPage; i++) {
                this.buttons.push((i + 1).toString());
                if (this.buttons.length >= 3) {
                    break;
                }
            }
        } else {
            this.buttons = [];
            for (let i = 0; i < this.maxPage; i++) {
                this.buttons.push((i + 1).toString());
            }
        }
    }
}