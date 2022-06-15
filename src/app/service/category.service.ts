import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categoryUrl = "http://localhost:3000/category/";
  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(this._categoryUrl)
  }

  getCategoryById(id: String){
    console.log('id passed ' + this._categoryUrl + id)
    return this.http.get<any>(this._categoryUrl + id)
  }

  deleteCategoryById(id: String) {
    console.log('deleting category ' + id)
    return this.http.get<any>(this._categoryUrl + 'delete/' + id);
  }

  putCategoryById(id: String, category){
    return this.http.put<any>(this._categoryUrl + 'edit/' + id, category);
  }

  putActivateById(id: String, category) {
    return this.http.put<any>(this._categoryUrl + 'activate/' + id, category);
  }

  createCategory(category){
    console.log('passed category ' + category)
    return this.http.post<any>(this._categoryUrl + 'create', category)
  }
}
