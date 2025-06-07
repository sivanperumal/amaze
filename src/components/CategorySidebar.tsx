import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useCategories } from "../redux/slices/category.slice";
import { useNavigate } from "react-router-dom";
import { useUser } from "../redux/slices/user.slice";
interface SidebarProps {
  open: boolean;
  onCloseSidebar: () => void;
}
const CategorySidebar: React.FC<SidebarProps> = (props) => {
  const { open, onCloseSidebar } = props;
  const navigate = useNavigate();
  const { list } = useCategories();
  const { loggedUser } = useUser();

  const handleCategoryItemClick = (url: string) => {
    navigate(url);
    onCloseSidebar();
  };
  return (
    <Drawer anchor="left" open={open} onClose={onCloseSidebar}>
      <List sx={{ width: "250px!important" }}>
        <ListItem>
          <b>
            Hello,{" "}
            {loggedUser
              ? loggedUser?.firstname + " " + loggedUser?.lastname
              : "GUEST"}
          </b>
        </ListItem>
        <Divider />
        {list &&
          list.map((category) => {
            return (
              <ListItem>
                <ListItemText
                  onClick={() =>
                    handleCategoryItemClick(`/category/${category.slug}`)
                  }
                  primary={category.name}
                  sx={{ cursor: "pointer" }}
                />
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
};
export default CategorySidebar;
