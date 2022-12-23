import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _theme: string ="";

  get theme(): string {
    return this._theme;
  }

  set theme(value: string) {
    this._theme = value;
    this.loadTheme(value);
  }

  loadTheme(theme: string) {
    // Use the style-loader and css-loader to load the theme file.
  //  import(`style-loader!css-loader!./themes/${theme}.css`);
  }  
}
