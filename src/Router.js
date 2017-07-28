import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import SideMenu from './SideMenu';
import YeniKisiEkle from './components/YeniKisiEkle';
import YeniIsEkle from './components/YeniIsEkle';
import Ayarlar from './components/Ayarlar';
import Profil from './components/Profil';
import IsTeklifleri from './components/IsTeklifleri';
import IsDetaylari from './components/IsDetaylari';
import MessageBar from './components/MessageBar';

const RouterComponent = () => {
    return (
        <Router>
            <Scene overlay>
                <Scene key="messageBar" component={MessageBar} />
                <Scene key="lightbox" lightbox leftButtonTextStyle={{ color: 'green' }} backButtonTextStyle={{ color: 'red' }} initial>
                    <Scene key="modal" modal hideNavBar>
                        <Scene key="auth" initial>
                            <Scene key="login" component={LoginForm} title="Please Login" titleStyle={{ textAlign: 'center' }} />
                        </Scene>
                        <Scene key="drawer" drawer contentComponent={SideMenu}>
                            <Scene key="main" >
                                <Scene
                                    key="anaSayfa"
                                    component={Home}
                                    title="Ana Sayfa"
                                    initial
                                />
                                <Scene
                                    key="isTeklifleri"
                                    component={IsTeklifleri}
                                    title="İş Teklifleri"
                                />
                                <Scene
                                    key="isDetayları"
                                    component={IsDetaylari}
                                    title="İş Detayları"
                                />
                                <Scene
                                    key="yeniKisiEkle"
                                    component={YeniKisiEkle}
                                    title="Yeni Kişi Ekle"
                                />
                                <Scene
                                    key="yeniIsEkle"
                                    component={YeniIsEkle}
                                    title="Yeni İş Ekle"
                                />
                                <Scene
                                    key="profil"
                                    component={Profil}
                                    title="Profilim"
                                />
                                <Scene
                                    key="ayarlar"
                                    component={Ayarlar}
                                    title="Ayarlar"
                                />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
