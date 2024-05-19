import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminTemplate from './template/AdminTemplate';
import HomePage from './page/home-page';
import Mailer from './page/mailer';
import TuyenDung from './page/tuyen-dung';
import SanPham from './page/san-pham';
import LienHe from './page/lien-he';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AdminTemplate />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/mailer" element={<Mailer />}></Route>
          <Route path="/tuyen-dung" element={<TuyenDung />}></Route>
          <Route path="/san-pham" element={<SanPham />}></Route>
          <Route path="/lien-he" element={<LienHe />}></Route>
        </Route>

        {/* <Route path="/admin" element={<AdminTemplate />}>
          <Route path="aboutvn" element={<AboutVn />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
