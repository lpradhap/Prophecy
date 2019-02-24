import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPostCode } from '../../app.component';
import { PostcodeService } from 'src/app/services/postcode.service';

@Component({
  selector: 'app-range-list',
  templateUrl: './range-list.component.html',
  styleUrls: ['./range-list.component.scss']
})
export class RangeListComponent implements OnInit {

  _postCode: IPostCode;

  _rangeList: IPostCode[];
  _isBusy: boolean;
  @Input()
  set postCode(val: any) {
    // input from parent
    // postal code object is recieved
    this._postCode = val;
    this.getRange(val);
  }
  get postCode(): any {
    return this._postCode;
  }


  // emit to parent
  // emit to clear range selection and close panel
  @Output() clearRange: EventEmitter<boolean> = new EventEmitter();

  constructor(private _postCodeService: PostcodeService) { }

  ngOnInit() {

  }

  getRange(_postCode: IPostCode): void {
    // method to request range request

    this._isBusy = true;
    
    this._postCodeService.getRange(_postCode).subscribe((res) => {
    
      this._rangeList = res;
      this._isBusy = false;
    
    }, (err)=>{
      // on error close panel
      this.closeRangePanel();
    })
  }

  closeRangePanel(): void {
    this.clearRange.emit(true);
  }
}
