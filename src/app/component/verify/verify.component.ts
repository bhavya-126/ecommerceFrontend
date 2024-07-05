import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
    router: Router = inject(Router);
    httpService: HttpService = inject(HttpService);
    formBuilder: FormBuilder = inject(FormBuilder);
    otpForm: FormGroup = this.formBuilder.group({
        otp: this.formBuilder.array([
            new FormControl(),
            new FormControl(),
            new FormControl(),
            new FormControl(),
            new FormControl(),
            new FormControl(),
        ])
    });
    get otpControls() {
        return (this.otpForm.get('otp') as FormArray).controls;
    }
    onSubmit() {
        let otp = (this.otpForm.value.otp).join('')

        let data = {
            otp: otp,
            userId: sessionStorage.getItem('userId')
        }

        this.httpService.verify({ ...data }).subscribe({
            next: (res: any) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.removeItem('userId');
                this.router.navigate(['/home']);
            },
            error: (err: any) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.error.message,
                });
            }
        })
    }
    moveToNext(nextInput: number, event: any) {
        const maxLength = parseInt(event.target.maxLength, 10);
        if (event.target.value.length === maxLength) {
            const nextInputElement = document.getElementById(`digit${nextInput + 1}`) as HTMLInputElement;
            if (nextInputElement) {
                nextInputElement.focus();
            }
        }
    }
}
