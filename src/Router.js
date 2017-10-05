import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Timeline from './components/home/Timeline';
import SideMenu from './components/SideMenu';
import UserList from './components/users/UserList';
import UserProfile from './components/users/UserProfile';
import NewUser from './components/users/NewUser';
import NewJob from './components/jobs/NewJob';
import Settings from './components/Settings';
import Profile from './components/Profile';
import JobsList from './components/jobs/JobsList';
import OppurtunityJobDetails from './components//jobs/opportunity/OppurtunityJobDetails';
import ActiveJobTab from './components/jobs/active/ActiveJobTab';
import Messages from './components/home/chat/Messages';

import Image from '../img/menu_burger.png';

let editable = false;

const RouterComponent = () => {
  return (
    <Router>
      <Scene overlay>
        <Scene key="lightbox" lightbox initial>
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
              titleStyle={{ color: 'white', alignSelf: 'center' }}
              rightButtonTextStyle={{ color: 'white', padding: 10 }}
            >
              <Scene key="main">
                <Scene key="timeline" component={Timeline} title="Pano" initial />
                <Scene key="messages" component={Messages} title="Mesajlar" back />
                <Scene
                  key="jobsList"
                  component={JobsList}
                  title="İş Teklifleri"
                  rightTitle="Yeni"
                  onRight={() => Actions.newJob()}
                />
                <Scene
                  key="opportunityJobDetails"
                  component={OppurtunityJobDetails}
                  title="İş Detayları"
                  back
                />
                <Scene
                  key="activeJobTab"
                  component={ActiveJobTab}
                  title="İş Detayları"
                  back
                />
                <Scene key="newJob" component={NewJob} title="Yeni İş Ekle" back />
                <Scene
                  key="userList"
                  component={UserList}
                  title="Kişiler"
                  rightTitle="Yeni"
                  onRight={() => Actions.newUser()}
                />
                <Scene key="userProfile" component={UserProfile} title="Kişi Profili" back />
                <Scene key="newUser" component={NewUser} title="Yeni Kişi Ekle" back />
                <Scene
                  key="profile"
                  component={Profile}
                  title="Profilim"
                  rightTitle="Düzenle"
                  editable={editable}
                  onRight={() => {
                    //Burda bilgileri güncelle
                    editable = !editable;
                    Actions.refresh({ editable, rightTitle: editable ? 'Kaydet' : 'Düzenle' });
                  }}
                />
                <Scene key="settings" component={Settings} title="Ayarlar" />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
