// import { Component } from '@angular/core';
// import { NavController, NavParams } from 'ionic-angular';
//
// /*
//   Generated class for the Login page.
//
//   See http://ionicframework.com/docs/v2/components/#navigation for more info on
//   Ionic pages and navigation.
// */
// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html'
// })
// export class LoginPage {
//
//   constructor(public navCtrl: NavController, public navParams: NavParams) {}
//
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad LoginPage');
//   }
//
// }
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
// import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
  
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
  
  public createAccount() {
    this.nav.push(RegisterPage);
  }
  
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          this.nav.setRoot(RegisterPage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }
  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
  
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
    
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
