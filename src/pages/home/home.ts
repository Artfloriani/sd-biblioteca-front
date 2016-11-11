import { Component } from '@angular/core';

import { NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';


import { Http, Headers, Response } from '@angular/http';

import { Webservice } from '../../providers/webservice'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inputName: string;

  user = {
    name: null,
    id: null
  };

  books: {
    id: number,
    name: string,

  } | null;

  reloadTime = 2000;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public ws: Webservice, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.books = null;


    this.updateList();



  }

  entrar() {
    console.log(this.inputName);


    switch (this.inputName) {
      case 'Arthur':
        this.user.id = 2;
        break;
      case 'Ana':
        this.user.id = 3;
        break;
      case 'Andre':
        this.user.id = 4;
        break;
      case 'Mariana':
        this.user.id = 5;
        break;
      case 'AndreFedalto':
        this.user.id = 1;
        break;
      default:
        this.showToast('Usuário não cadastrado');
        return;
    }

    this.user.name = this.inputName;
    this.updateList();
    this.showToast(this.inputName + ", curta o maior acervo de JAVA!");


  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  showAlert(data) {
    let alert = this.alertCtrl.create({
      title: data.title,
      subTitle: data.message,
      buttons: ['Ok']
    });
    alert.present();
  }


  updateList() {
    let requestData = null;
    if(this.user.id != null)
      requestData = {
        id : this.user.id
      }
    this.ws.getLivros(requestData).subscribe(
      (success) => {
        this.books = success.json();

        setTimeout(
          () => {
            this.updateList();
          }, this.reloadTime
        )
      },
      (error) => {
        console.log(error);
        setTimeout(
          () => {
            this.updateList();
          }, this.reloadTime
        )
      }
    )
  }

  emprestar(book) {


    let data = {
      userId: this.user.id,
      bookId: book.id
    };


    let loading = this.loadingCtrl.create({
      content: 'Emprestando...'
    });

    loading.present();

    this.ws.emprestaLivro(data).then(
      (success) => {
        let alertData = {
          title: 'Sucesso',
          message: 'Emprestado com sucesso'
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )

        console.log(success);
      },
      (error) => {

        console.log(error.json());
     
        let alertData = {
          title: 'Erro',
          message: error.json()
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )
        console.log(error);
      }
    );

  }

  renovar(book) {
    let data = {
      userId: this.user.id,
      bookId: book.id
    };


    let loading = this.loadingCtrl.create({
      content: 'Renovando...'
    });

    loading.present();

    this.ws.renovarLivro(data).then(
      (success) => {
        let alertData = {
          title: 'Sucesso',
          message: 'Renovado com sucesso'
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )

        console.log(success);
      },
      (error) => {
        let alertData = {
          title: 'Erro',
          message: error.json()
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )
        console.log(error);
      }
    );

  }

  reservar(book) {


    let alert = this.alertCtrl.create({
      title: 'Reservar',
      message: 'Por quantos segundos gostaria de reservar este livro?',
      inputs: [
        {
          name: 'tempo',
          placeholder: 'Em segundos',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Reservar',
          handler: check => {
            console.log(check.tempo);




            let data = {
              userId: this.user.id,
              bookId: book.id
            };


            let loading = this.loadingCtrl.create({
              content: 'Reservando...'
            });

            loading.present();

            this.ws.reservarLivro(data).then(
              (success) => {
                let alertData = {
                  title: 'Sucesso',
                  message: 'Resevado com sucesso'
                }
                this.updateList();
                loading.dismiss().then(
                  () => {
                    this.showAlert(alertData);

                  }
                )

                console.log(success);
              },
              (error) => {
                let alertData = {
                  title: 'Erro',
                  message: error.json()
                }
                this.updateList();
                loading.dismiss().then(
                  () => {
                    this.showAlert(alertData);

                  }
                )
                console.log(error);
              }
            );




          }
        }
      ]
    });
    alert.present();



  }

  devolver(book) {
    let data = {
      userId: this.user.id,
      bookId: book.id
    };


    let loading = this.loadingCtrl.create({
      content: 'Devolvendo...'
    });

    loading.present();

    this.ws.devolverLivro(data).then(
      (success) => {
        let alertData = {
          title: 'Sucesso',
          message: 'Devolvido com sucesso'
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )

        console.log(success);
      },
      (error) => {
        let alertData = {
          title: 'Erro',
          message: error.json()
        }
        this.updateList();
        loading.dismiss().then(
          () => {
            this.showAlert(alertData);

          }
        )
        console.log(error);
      }
    );
  }


  //Emprestimo
  canBorrow(book) {
    if (this.user.name != null && book.available)
      return true;
    return false;
  }

  //Renovacao
  canRenew(book) {
    if (this.user.name != null && !book.available && book.myBorrow)
      return true;
    return false;
  }
  //Reserva
  canReserve(book) {
    if (this.user.name != null && !book.available && !book.myBorrow)
      return true;
    return false;
  }

  //Retornar
  canReturn(book) {
    if (this.user.name != null && !book.available && book.myBorrow)
      return true;
    return false;
  }


}
