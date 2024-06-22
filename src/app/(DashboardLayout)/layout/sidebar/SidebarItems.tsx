import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List, Typography } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { fontSize } from "@mui/system";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => (
          <div key={item.heading}>
            <Typography sx={{ fontSize:'17px' , mt:4 , fontWeight:'600' }}>{item.heading}</Typography>
            {item.content &&
              item.content.map((value) => {
                if (value.subheader) {
                  return <NavGroup item={value} key={value.subheader} />;
                } else {
                  return (
                    <NavItem
                      item={value}
                      key={value.id}
                      pathDirect={pathDirect}
                      onClick={toggleMobileSidebar}
                    />
                  );
                }
              })}
          </div>
        ))}

      </List>
    </Box>
  );
};
export default SidebarItems;
