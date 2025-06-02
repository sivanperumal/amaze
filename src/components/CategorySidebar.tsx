import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useCategories } from "../redux/slices/category.slice";
import { Link } from "react-router-dom";
interface SidebarProps {
  open: boolean;
  onCloseSidebar: () => void;
}
const CategorySidebar: React.FC<SidebarProps> = (props) => {
  const { open, onCloseSidebar } = props;
  const { list } = useCategories();
  return (
    <Drawer anchor="left" open={open} onClose={onCloseSidebar}>
      <List>
        <ListItem>
          <b>Hello, sign in</b>
        </ListItem>
        <Divider />
        {list &&
          list.map((category) => {
            return (
              <ListItem>
                <ListItemText
                  primary={
                    <Link
                      to={`/category/${category.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {category.name}
                    </Link>
                  }
                />
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
};
export default CategorySidebar;
