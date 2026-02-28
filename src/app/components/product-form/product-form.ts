import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../service/products.sevice';
import { IProduct } from '../../interfaces/iproduct.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule], // ✔️ El FormsModule ya lo tenías importado correctamente
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  productService = inject(ProductsService);

  productForm: FormGroup; // Declaramos el FormGroup para el formulario reactivo

  constructor() {
    // Inicializamos el FormGroup con los controles necesarios
    this.productForm = new FormGroup({
      title: new FormControl('',[Validators.required, Validators.minLength(3)]),
      price: new FormControl('',[Validators.required, Validators.min(0.01)]),
      quantity: new FormControl('',[Validators.required, Validators.min(1)])
    });
  }

  checkError(controlName: string, errorName: string): boolean | undefined {
        //Existe un formulario que tiene un campo controlName -->
        //y dicho formulario tiene un error-->
    return this.productForm.get(controlName)?.hasError(errorName) && this.productForm.get(controlName)?.touched;
  }


  addProduct() {
    // Esto ahora debería mostrar los datos del formulario en la consola

    const newProduct: IProduct = this.productForm.value; // Obtenemos los valores del formulario y los asignamos a newProduct
    this.productService.insertProduct(newProduct);


    if (this.productForm.valid) {
      Swal.fire({
        icon: 'success',
        title: '¡Producto añadido!',
        text: `Se ha guardado: ${this.productForm.value.title}`,
        showConfirmButton: false, 
        timer: 1500 
      });

      this.productForm.reset(); // Limpiar el formulario después de agregar el producto
    }
  }



}
