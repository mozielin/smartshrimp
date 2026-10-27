import DashboardApp from './dashboard/DashboardApp';
import MemberPortal from './pages/MemberPortal';
import { LanguageProvider } from './i18n/LanguageContext';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Market from './pages/Market';
import Product from './pages/Product';
import Franchise from './pages/Franchise';
import Contact from './pages/Contact';
import About from './pages/About';
import Farmer from './pages/Farmer';

export default function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardApp />} />
        <Route path="/member" element={<MemberPortal />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="market" element={<Market />} />
          <Route path="product" element={<Product />} />
          <Route path="farmer" element={<Farmer />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}
