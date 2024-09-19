import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';


export const authGuard:  CanActivateFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);


    if (authService.isLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
}
