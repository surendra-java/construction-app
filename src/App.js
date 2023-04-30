import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";

import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";

import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Sites from "./scenes/sites";
import Clients from "./scenes/clients";
import Engineers from "./scenes/engineer";
import Supervisors from "./scenes/supervisors";

import ClientInfoForm from "./components/clientOperation/ClientInfoForm";
import SiteInfoForm from "./components/siteOperation/SiteInfoForm";
import EngineerInfoForm from "./components/engineerOperation/EngineerInfoForm";
import SupervisorInfoForm from "./components/supervisorOperation/SupervisorInfoForm";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              
              <Route path="/clients" element={<Clients />} />
              <Route path="/sites" element={<Sites />} />
              <Route path="/engineers" element={<Engineers />} />
              <Route path="/supervisors" element={<Supervisors />} />

              <Route path="/geography" element={<Geography />} />
              <Route path="/ClientInfoForm" element={<ClientInfoForm />} />
              <Route path="/SiteInfoForm" element={<SiteInfoForm />} />
              <Route path="/EngineerInfoForm" element={<EngineerInfoForm />} />
              <Route path="/SupervisorInfoForm" element={<SupervisorInfoForm />} />

              
              
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
