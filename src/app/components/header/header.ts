import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.css',
})
export class Header {}
