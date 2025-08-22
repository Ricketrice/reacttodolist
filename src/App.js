import './awsConfig';  
import { withAuthenticator } from '@aws-amplify/ui-react';
import MainMenu from "./Component/MainMenu"
import '@aws-amplify/ui-react/styles.css';


function App({user, signOut}) {
  return (
    <>
    <MainMenu signOut={signOut} user={user}/>

    </>
  )
}

export default withAuthenticator(App)
