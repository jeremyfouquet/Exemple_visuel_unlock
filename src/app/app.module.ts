import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JeuxComponent } from './jeux/jeux.component';
import { JoueurComponent } from './joueur/joueur.component';
import { IndiceComponent } from './indice/indice.component';
import { HttpClientModule } from '@angular/common/http';
import { JeuxService } from './services/jeux.service';
import { IndiceService } from './services/indice.service';
import { JoueurService } from './services/joueur.service';

@NgModule({
  declarations: [
    AppComponent,
    JeuxComponent,
    JoueurComponent,
    IndiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    JeuxService,
    IndiceService,
    JoueurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
