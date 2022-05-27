//
import { useState, useLayoutEffect, useRef } from "react";
import { Button, Checkbox, Divider } from "semantic-ui-react";
import { db } from "../js/dexie-db";
import EditItemButton from "./EditItemButton";
import DragItemButton from "./DragItemButton";
import TextAreaAutosize from "./TextAreaAutosize";
import { Box, ButtonGroup, Flex } from "@chakra-ui/react";

//
export default function ItemDetails(props) {
  const [label, setLabel] = useState(props.itemInfo.label);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <tr
      style={{
        verticalAlign: "middle",
      }}
    >
      <td
        onClick={() =>
          db.items.update(props.itemInfo.itemId, {
            isComplete: !props.itemInfo.isComplete,
          })
        }
        style={{ padding: "5px", transform: "scale(1.2)" }}
      >
        <Checkbox checked={props.itemInfo.isComplete} />
      </td>

      <td style={{ width: "100%" }}>
        <Flex>
          <Box w="100%">
            <TextAreaAutosize
              value={label}
              textColor={props.itemInfo.isComplete ? "#aaa" : "#000"}
              onValueChange={(newValue) => {
                setLabel(newValue);
              }}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                db.items.update(props.itemInfo.itemId, { label: label });
                setIsFocused(false);
              }}
            />
          </Box>

          <ButtonGroup w="50px" spacing="0.5">
            {isFocused && (
              <>
                {/* <EditItemButton></EditItemButton> */}
                <DragItemButton></DragItemButton>
              </>
            )}
          </ButtonGroup>
        </Flex>
        <Divider fitted />
      </td>
    </tr>
  );
}
