import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AngularFireModule} from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
    apiKey: "AIzaSyASmkJs4phvlGjH4ySgrqD7FxRlZWrtw2Y",
    authDomain: "epper-4d1a7.firebaseapp.com",
    databaseURL: "https://epper-4d1a7.firebaseio.com",
    storageBucket: "epper-4d1a7.appspot.com",
    messagingSenderId: "262321847467"
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
