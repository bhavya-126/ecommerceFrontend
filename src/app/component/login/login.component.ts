import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    formBuilder: FormBuilder = inject(FormBuilder);
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);


    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    onLogIn() {

        this.httpService.login(this.loginForm.value).subscribe({
            next: (res: any) => {
                sessionStorage.setItem("token", res.data.token ?? "");
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(["/home"]);

            },
            error: (err: any) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message
                });
            },
        });
    }
}