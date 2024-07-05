import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    formBuilder: FormBuilder = inject(FormBuilder);
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);

    signupForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        mobile: ['', [Validators.required, Validators.minLength(10)]],
    })


    onSignup() {
        this.httpService.signUp(this.signupForm.value).subscribe({
            next: (res: any) => {
                sessionStorage.setItem("s", res.data.userId)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                this.router.navigate(["/verify"]);
            },
            error: (err: { error: { message: string } }) => {
                console.log(err);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.error.message,
                });
            }
        })

    }
}
