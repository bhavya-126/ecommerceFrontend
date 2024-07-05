import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
    httpService: HttpService = inject(HttpService);
    categorySub: Subject<any> = new Subject();
    categoryList: any[] = [];
    formBuilder: FormBuilder = inject(FormBuilder);
    productForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        mrp: [0, [Validators.required],],
        discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        description: ['', [Validators.required]],
        category: ['', [Validators.required]],
        totalQuantity: [0, [Validators.required, Validators.min(0)]],
    });
    selectedFile: any;

    constructor() {
        this.httpService.getCategory().subscribe({
            next: (res: any) => {
                this.categorySub.next(res.data)
            },
            error: (err) => {
                console.log(err);

            }
        })
    }

    ngOnInit() {
        this.categorySub.subscribe({
            next: (res: any) => {
                this.categoryList = res;
                console.log(this.categoryList);

            }
        })
    }

    onSelectingFile(event: Event) {
        this.selectedFile = (event.target as HTMLInputElement).files?.[0];
        console.log(this.selectedFile);

    }

    get productFormControl() {
        return this.productForm.controls;
    }

    onSubmit() {
        let formData = new FormData();
        let imageUrl
        formData.append('productImage', this.selectedFile);
        this.httpService.uploadImage(formData).subscribe({
            next: (res: any) => {
                imageUrl = res.data.filePath;
                console.log("image uploaded", res.data.filePath);
                this.httpService.addProduct({ ...this.productForm.value, imageUrl }).subscribe({
                    next: (res) => {
                        Swal.fire('Success', 'Product added successfully', 'success');
                    },
                    error: (err) => {
                        Swal.fire('Error', 'Product not added', 'error');
                    }
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
