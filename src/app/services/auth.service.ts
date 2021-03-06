import { Injectable } from '@angular/core';
import {AuthProviders, AuthMethods, FirebaseAuth, FirebaseAuthState} from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;

  constructor(public auth$: FirebaseAuth) {
    this.authState = auth$.getAuth();

    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null && !this.expired;
  }

  get expired(): boolean {
    return !this.authState || (this.authState.expires * 1000) < Date.now();
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  signInWithGithub(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup
    });
  }

  signInWithGoogle(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signInWithTwitter(): Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
  }

  signOut(): void {
    this.auth$.logout();
  }
}
