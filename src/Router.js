import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import AnaSayfa from './components/ana_sayfa/AnaSayfa';
import SideMenu from './components/SideMenu';
import KisilerList from './components/kisiler/KisilerList';
import KisiProfili from './components/kisiler/KisiProfili';
import YeniKisiEkle from './components/kisiler/YeniKisiEkle';
import YeniIsEkle from './components/is_teklifleri/YeniIsEkle';
import Ayarlar from './components/Ayarlar';
import Profil from './components/Profil';
import IsTeklifleri from './components/is_teklifleri/IsTeklifleri';
import IsDetaylari from './components//is_teklifleri/IsDetaylari';
import Mesajlar from './components/ana_sayfa/chat/Mesajlar';

import Image from '../img/menu_burger.png';

let editable = false;

const RouterComponent = () => {
  return (
    <Router>
      <Scene overlay>
        <Scene
          key="lightbox"
          lightbox
          leftButtonTextStyle={{ color: 'green' }}
          backButtonTextStyle={{ color: 'red' }}
          initial
        >
          <Scene key="modal" modal hideNavBar>
            <Scene key="auth" initial>
              <Scene
                key="login"
                component={LoginForm}
                title="Lütfen Giriş Yapın"
                titleStyle={{ textAlign: 'center' }}
                hideNavBar
              />
            </Scene>
            <Scene
              key="drawer"
              drawer
              contentComponent={SideMenu}
              drawerImage={Image}
              navigationBarStyle={{ backgroundColor: '#4169e1' }}
              leftButtonStyle={{ color: 'white' }}
              titleStyle={{ color: 'white', alignSelf: 'center' }}
              rightButtonTextStyle={{ color: 'white', padding: 10 }}
            >
              <Scene key="main">
                <Scene key="anaSayfa" component={AnaSayfa} title="Pano" initial />
                <Scene key="mesajlar" component={Mesajlar} title="Mesajlar" back />
                <Scene
                  key="isTeklifleri"
                  component={IsTeklifleri}
                  title="İş Teklifleri"
                  rightTitle="Yeni"
                  onRight={() => Actions.yeniIsEkle()}
                />
                <Scene key="isDetaylari" component={IsDetaylari} title="İş Detayları" back />
                <Scene key="yeniIsEkle" component={YeniIsEkle} title="Yeni İş Ekle" back />
                <Scene
                  key="kisilerList"
                  component={KisilerList}
                  title="Kişiler"
                  rightTitle="Yeni"
                  onRight={() => Actions.yeniKisiEkle()}
                />
                <Scene key="kisiProfili" component={KisiProfili} title="Kişi Profili" back />
                <Scene key="yeniKisiEkle" component={YeniKisiEkle} title="Yeni Kişi Ekle" back />
                <Scene
                  key="profil"
                  component={Profil}
                  title="Profilim"
                  rightTitle="Düzenle"
                  editable={editable}
                  onRight={() => {
                    //Burda bilgileri güncelle
                    editable = !editable;
                    Actions.refresh({ editable, rightTitle: editable ? 'Kaydet' : 'Düzenle' });
                  }}
                />
                <Scene key="ayarlar" component={Ayarlar} title="Ayarlar" />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
