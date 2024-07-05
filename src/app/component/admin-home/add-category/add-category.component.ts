import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
    httpService: HttpService = inject(HttpService)
    formBuilder: FormBuilder = inject(FormBuilder);
    router: Router = inject(Router);
    categroyForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]]
    })

    get categroyFormControl() {
        return this.categroyForm.controls;
    }

    onSubmit() {
        this.httpService.addCategroy(this.categroyForm.value).subscribe({
            next: (res) => {
                Swal.fire('Success', 'Category added successfully', 'success')
                this.categroyForm.reset()
                this.router.navigate(['/admin-home'])
            },
            error: (err: any) => {
                Swal.fire('Error', err.error.message, 'error')
            }
        })
    }
}
