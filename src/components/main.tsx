'use client';

import ButtonAppBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Box from "@mui/material/Box";
import { ReactNode, useState } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const onMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{ display: "flex" }}
      className={!isMenuOpen ? "menu-open" : "menu-close"}
    >
      <Box>
        <Sidebar />
      </Box>
      <Box width="100%">
        <ButtonAppBar onMenuClick={onMenuClick} />
        {children}
      </Box>
    </Box>
  );
}
