
import {map} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "../_models/product";
import "rxjs/add/operator/map";
import { Observable } from "rxjs";
import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable()
export class ProductsDataService extends CachcingServiceBase {
  private products: Observable<Product[]>;

  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get("./assets/products.json").pipe(
                                           map((response) => response.json()
                                                                      .map((item) => {
                                                                        let model = new Product();
                                                                        model.updateFrom(item);
                                                                        return model;
                                                                      }))));

  }
}