import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(null);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  return ctx ?? { mobileOpen: false, setMobileOpen: () => {} };
};

export const SidebarProvider = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
