import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;
/*
Generated class for the Organizations page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/


@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html'
})
export class OrganizationsPage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(public navCtrl: NavController) {}
  
  ionViewDidLoad(){
    this.loadMap();
  }
  
  loadMap(){
    
    Geolocation.getCurrentPosition().then((position) => {
      
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
    }, (err) => {
      console.log(err);
    });
    
  }
  
  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP
      // position: this.map.getCenter()
    });
    
    let content = "<h4>Information!</h4>";
    this.addInfoWindow(marker, content);
  }
  
  addInfoWindow(marker, content){
    
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
    
  }
  
  
}
