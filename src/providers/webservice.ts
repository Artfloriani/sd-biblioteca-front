import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Webservice {
    url: string;

    headers: Headers;

    constructor(public http: Http) {

        this.url = 'http://192.168.108.60:8000/api';
    }

    getLivros(user = null) {

        
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
        });

        if(user != null)
            headers.append('Authorization', user.id);
            
        return this.http.get(this.url + '/books', { headers });
    }

    emprestaLivro(data) {
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': data.userId
            });

            this.http.post(this.url + '/book/' + data.bookId + '/borrow',{}, { headers }).subscribe(
                
                (success) => 
                {
                    console.log(success);
                    resolve(success);
                },
                (error) => 
                {
                    console.error(error);
                   reject(error); 
                });

        });

        return promise;

    }

    renovarLivro(data) {
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': data.userId
            });

            this.http.post(this.url + '/book/' + data.bookId + '/renew',{}, { headers }).subscribe(
                
                (success) => 
                {
                    console.log(success);
                    resolve(success);
                },
                (error) => 
                {
                    console.error(error);
                   reject(error); 
                });

        });

        return promise;

    }

    reservarLivro(data) {
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': data.userId
            });

            this.http.post(this.url + '/book/' + data.bookId + '/reserve',{}, { headers }).subscribe(
                
                (success) => 
                {
                    console.log(success);
                    resolve(success);
                },
                (error) => 
                {
                    console.error(error);
                   reject(error); 
                });

        });

        return promise;

    }

    devolverLivro(data) {
        let promise = new Promise((resolve, reject) => {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': data.userId
            });

            this.http.post(this.url + '/book/' + data.bookId + '/return',{}, { headers }).subscribe(
                
                (success) => 
                {
                    console.log(success);
                    resolve(success);
                },
                (error) => 
                {
                    console.error(error);
                   reject(error); 
                });

        });

        return promise;

    }



}