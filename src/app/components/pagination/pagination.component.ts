import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAGINATION_CONSTANTS } from '../../utils/constants';

@Component({
  selector: 'app-pagination',
  imports: [NgIf],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() pageNum = 1;
  @Input() totalCount = 0;
  buttonStyle =
    'cursor-pointer border border-white p-2 py-0.5 mx-1 rounded hover:bg-red-500 hover:text-white';
  size = 20;
  paginationConstants = PAGINATION_CONSTANTS;
  @Output() handlePagination = new EventEmitter();

  get pageInfo() {
    const start = (this.pageNum - 1) * this.size + 1;
    let end = this.pageNum * this.size;

    if (end > this.totalCount) end = this.totalCount;

    const totalPages = Math.ceil(this.totalCount / this.size);

    return { start, end, totalPages };
  }

  handleButtonClick(action: PAGINATION_CONSTANTS) {
    if (action === PAGINATION_CONSTANTS.PAGE_LEFT_BUTTON) {
      this.pageNum -= 1;
    } else {
      this.pageNum += 1;
    }

    this.handlePagination.emit(this.pageNum);
  }
}
