import { Box, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export interface SearchStrProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  onSearchKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Search: React.FC<SearchStrProps> = (props) => {
  const { onSearchChange, onSearchClick, onSearchKeyPress } = props;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 1,
        px: 1,
      }}
    >
      <InputBase
        placeholder="Search Amaze"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyPress}
      />
      <IconButton onClick={onSearchClick}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
export default React.memo(Search);
