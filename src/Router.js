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
              />
            </Scene>
            <Scene key="drawer" drawer contentComponent={SideMenu}>
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
                <Scene key="profil" component={Profil} title="Profilim" />
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
