import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PostcodeService } from './services/postcode.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  _searchControl: FormControl;
  _debounce: number = 600; // delay on keypress event trigger

  _postCodeList: IPostCode[] = [];
  _selectedPostCode: IPostCode;

  _previousKeyword: string;

  _isBusy: boolean;
  _keyword: string = '';

  constructor(private _postCodeService: PostcodeService) {

  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.\

    this._searchControl = new FormControl('');
    
    // listen to value change in postcode search control
    this._searchControl.valueChanges
      .pipe(debounceTime(this._debounce), distinctUntilChanged())
      .subscribe(query => {
        if (query) {

          this.searchPostCode(query.toString());
        }

      });
  }

  searchPostCode(_keyword: string): void {
    // method to get keyword related postcode

    this._keyword = _keyword;
    
    if (_keyword.length < 3) {
      this._postCodeList = [];
      this.clearRangePanel(true)
      // Ask user to enter at least first 3 digits of a postcode prior to search
      // search refused when less than 3 characters entered
      return;
    }

    this.clearRangePanel(true)
   
    this._isBusy = true;

    // search postcode
    this._postCodeService.getPostCode(_keyword).subscribe((res) => {
      this._postCodeList = res;
      this._isBusy = false;
    });

  }

  postCodeSelected(_selectedCode: IPostCode): void {
    // method assigns user selected value to property
    this._selectedPostCode = _selectedCode;
  }

  isListEnabled(): boolean {
    // method returns postcode list exist or not.
    return this._postCodeList && this._postCodeList.length > 0;
  }

  isRangeSelected(): boolean {
    // method return postcode selection status by user.
    return this._selectedPostCode !== undefined;
  }

  clearRangePanel(_clearStatus: boolean): void {
    // method clears range selected value
    // method evokes by child event emiiter
    if (_clearStatus) {
      this._selectedPostCode = undefined;
    }
  }

  isInvalidPostCode(): boolean {
    // method returns true when search keyword included and no list value 
    return !this._isBusy &&  this._keyword.length > 2 && this._postCodeList.length === 0;
  }
}

export interface IPostCode {
  latitude: number;
  locality: string;
  longitude: number;
  name: string;
  postcode: number;
  state: {
    abbreviation: string;
    name: string;
  };
}
