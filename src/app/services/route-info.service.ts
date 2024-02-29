import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteInfoService {

  private routeIdentifiers: Map<string, string> = new Map();

  setRouteIdentifier(path: string, identifier: string): void {
    this.routeIdentifiers.set(path, identifier);
  }

  getRouteIdentifier(path: string): string | undefined {
    return this.routeIdentifiers.get(path);
  }

  getAllRouteIdentifiers(): Map<string, string> {
    return this.routeIdentifiers;
  }
}
