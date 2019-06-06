import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ServicoService } from '../servico.service';

declare var google;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  providers: [ServicoService]
})
export class CameraPage {

  map: any;
  photo: string = '../assets/icon/usuario2.png';

  public latitude: number
  public longitude: number

  constructor(
    private camera: Camera,
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController,
    private servicoService: ServicoService
  ) {

    this.Position()

  }

  //Reponsavel por chamar a camera
  takePicture(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100,
      cameraDirection: this.camera.Direction.FRONT
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photo = base64Image;
    }, (err) => {
      console.error(err);
    });
  }

  //Limpa a foto que foi tirada
  cleanPhoto(): void {
    this.photo = '../assets/icon/usuario2.png';
  }

  //Confirma o registro do ponto
  confirmar(): void {
    //Salva no banco a localidade do usuario
    this.SalvarPosicao(this.latitude, this.longitude)

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Ponto registrado com sucesso!!!',
      buttons: ['OK']
    });

    await alert.present();
  }

  //Exibe na tela a localização do usuario
  Position(): void {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        this.latitude = resp.coords.latitude
        this.longitude = resp.coords.longitude

        const mapOptions = {
          zoom: 18,
          center: position,
          disableDefaultUI: true
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  //Salva no banco o registro de ponto enviando a latitude e a longitude
  SalvarPosicao(latitude: number, longitude: number): void {
    this.servicoService.getSalvarPonto(latitude, longitude).
      then((registroSalvo: boolean) => {
        //Se o registro foi salvo continua a execução e direciona o usuario para a tela principal.
        if (registroSalvo) {
          this.presentAlert()
          this.photo = '../assets/icon/usuario2.png'
          this.navCtrl.navigateForward(['/principal/'])
        }
      })
  }

}
