import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchResultService } from 'src/app/youtube/services/search-result.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/redux/reducers';
import { clearYoutube, getYoutube } from 'src/app/redux/actions/youtube.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSettingsMenu = false;

  searchText = '';

  currentName: string | null = '';

  showHeader = true;

  logged = false;

  private searchInput: Subject<string> = new Subject<string>();

  constructor(
    private store$: Store<State>,
    public router: Router,
    public searchResult: SearchResultService,
    public loginService: LoginService,
  ) {}

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  onSearchInputChange(text: string) {
    this.searchInput.next(text);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleSettingsMenu();
    }
  }

  ngOnInit() {
    this.searchInput
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((text: string) => {
        const minCharacters = 3;
        if (text.length >= minCharacters && this.logged) {
          this.searchResult.searchQuery.next(text);
          this.store$.dispatch(new clearYoutube());
          this.store$.dispatch(new getYoutube());
          this.router.navigate(['/youtube']);
        }
      });
    this.loginService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.logged = isLoggedIn;
      this.currentName = this.loginService.getUsername() || 'Your Name';
    });
    this.logged = this.loginService.isLoggedIn();
  }

  toggleLogin() {
    if (this.logged) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
