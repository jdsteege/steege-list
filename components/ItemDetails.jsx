//
import { useState, useLayoutEffect, useRef } from "react";
import { Checkbox, Container, Divider } from "semantic-ui-react";
import { db } from "../js/dexie-db";
import TextAreaAutosize from "./TextAreaAutosize";

//
export default function ItemDetails(props) {
  const [label, setLabel] = useState(props.itemInfo.label);

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
        <TextAreaAutosize
          value={label}
          textColor={props.itemInfo.isComplete ? "#aaa" : "#000"}
          onValueChange={(newValue) => {
            setLabel(newValue);
          }}
          onBlur={() => {
            db.items.update(props.itemInfo.itemId, { label: label });
          }}
        />

        <Divider fitted />
      </td>
      <td></td>
    </tr>
  );
}
