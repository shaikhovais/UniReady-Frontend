import { Box } from "@mui/material";

import type { ShoppingList } from "../../../../types/features/shoppingLists";
import ShoppingListCard from "./ShoppingListCard";

type ShoppingListsGridProps = {
  lists: ShoppingList[];
  selectedListId: number | "all";
  onSelectList: (listId: number) => void;
  onDeleteList: (list: ShoppingList) => void;
  isTemplateList: (list: ShoppingList) => boolean;
};

const ShoppingListsGrid = ({
  lists,
  selectedListId,
  onSelectList,
  onDeleteList,
  isTemplateList,
}: ShoppingListsGridProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
        p: {
          xs: 0.5,
          sm: 1,
        },
        borderRadius: 1.5,
      }}
    >
      {lists.map((list) => (
        <Box
          key={list.id}
          sx={{
            minWidth: 0,
            width: "100%",
          }}
        >
          <ShoppingListCard
            list={list}
            isSelected={selectedListId === list.id}
            canDelete={!isTemplateList(list)}
            onSelect={() => onSelectList(list.id)}
            onDelete={() => onDeleteList(list)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ShoppingListsGrid;