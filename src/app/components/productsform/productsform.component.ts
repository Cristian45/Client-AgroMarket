import { Component, OnInit } from '@angular/core';
import { Products } from '../../models/products';
import { ProductsService } from '../../services/products.service'
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-productsform',
  templateUrl: './productsform.component.html',
  styleUrls: ['./productsform.component.css']
})
export class ProductsformComponent implements OnInit {

  products: any = [];
  edit: boolean = false;
  conversionDecryptOutput: string;

  product: Products = {

    codigo: 0,
    descripcion: '',
    cantidad: null,
    precio: null,
    imagen: '',

  };

  constructor(private productService: ProductsService, private router: Router, private activateRout: ActivatedRoute) { }

  ngOnInit() {

    const params = this.activateRout.snapshot.params;
    if (params.id) {

      this.productService.getOneProduct(params.id)
        .subscribe(
          res => {

            this.products = res[0];

            this.product = this.products;

            this.edit = true;

          },
          err => console.log(err)

        )
    }

  }

  saveNewProduct() {

    console.log(this.product);

    this.productService.saveProduct(this.product)

      .subscribe(
        res => {
          console.log(res);

          this.router.navigate(['/']);

        },
        err => console.log(err)

      )


  }

  updateProduct() {


    this.productService.updateProduct(this.product.codigo, this.product)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/products']);

        },
        err => console.error(err)


      )

  }


  logIn(): boolean {

    // Decrypt
    this.conversionDecryptOutput = localStorage.getItem('prf')

    if (this.conversionDecryptOutput) {

      var bytes = CryptoJS.AES.decrypt(this.conversionDecryptOutput.toString(), 'dcripcoagroeco');

      var plaintext = bytes.toString(CryptoJS.enc.Utf8);

      if (plaintext[1] == '1') {
        return (localStorage.getItem('auth_token') !== null);
      }
    }
  }



}
