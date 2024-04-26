import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminTemplate from './template/AdminTemplate';
import HomePage from './page/home-page';
import Mailer from './page/mailer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AdminTemplate />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/mailer" element={<Mailer />}></Route>
        </Route>

        {/* <Route path="/admin" element={<AdminTemplate />}>
          <Route path="aboutvn" element={<AboutVn />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
