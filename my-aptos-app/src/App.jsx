import './App.css'
import { Routes , Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Home from './pages/home';
import NotFound from './pages/notFound';
import UploadPage from './pages/docsPage';
import IdentityPage from './pages/identity';
function App() {
    return (
        <div>
          <Routes>
          <Route path = '/' element= {<HomePage/>}>
          <Route index element = {<Home/>}/>
          <Route path = '/upload' element = {<UploadPage/>}/>
          <Route path = '/identity' element = {<IdentityPage/>}/>
          <Route path='*' element = {<NotFound/>}/>
          </Route>
       </Routes>
        </div>
    );
}

export default App
