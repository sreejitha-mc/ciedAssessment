import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router} from '@angular/router';



/* @figmaId 1:178 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  
  toggle: boolean = false;
	responseData: any;
	errorMsg: any;
	loading:boolean=false;
  // loginForm = new FormGroup({
	// 	password: new FormControl('', Validators.required),
	// 	username: new FormControl('', Validators.required),

	// }
	// );
  constructor(
    private router: Router,
		private _login: LoginService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  

  get f() {
		return this.loginForm.controls;
	}

	// submit() {
	// 	this.loading =true;
	// 	if (!this.loginForm.valid) {
	// 		this.loginForm.markAllAsTouched();
	// 		this.loading = false;
	// 		return false;
	// 	}
	// 	else {
	// 		this._login.proceedLogin(this.loginForm.value).subscribe(res => {
	// 			if (res != null) {
	// 				this.responseData = res;
	// 				if (this.responseData.status) {
	// 					localStorage.setItem('userProfile', JSON.stringify(this.responseData .data.user));
	// 					localStorage.setItem('token', this.responseData.data['token']);
	// 					this.router.navigateByUrl('/dashboard');
	// 					this.loading = false
	// 				}
	// 				else {
	// 					this.errorMsg = `${this.responseData.msg}`;
	// 					this.loading = false;
	// 				}
	// 			}
	// 		},
	// 			err => {
	// 				this.errorMsg = err;
	// 				this.loading = false;

	// 			}
				
	// 		);
	// 	}
	// 	return true;
	// }

  onSubmit() {
    this.loading =true;
    if (this.loginForm.valid) {
      // Perform the login logic here
      console.log('Form submitted:', this.loginForm.value);
    }
    	this.loading =true;
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			this.loading = false;
			return false;
		}
		else {
			this._login.proceedLogin(this.loginForm.value).subscribe(res => {
				if (res != null) {
					this.responseData = res;
					if (this.responseData.success) {
            console.log("here",this.responseData.data)
						localStorage.setItem('userProfile', JSON.stringify(this.responseData .data.user));
						localStorage.setItem('token', this.responseData.data['token']);
						localStorage.setItem('USER-ID', this.responseData.data['id']);
						this.router.navigateByUrl('/dashboard');
						this.loading = false
					}
					else {
						this.errorMsg = `${this.responseData.msg}`;
						this.loading = false;
					}
				}
			},
				err => {
					this.errorMsg = err;
					this.loading = false;

				}
				
			);
		}
		return true;
  }

	
}
