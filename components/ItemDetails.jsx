//
import { useState, useLayoutEffect, useRef } from "react";
import { Checkbox, Container, Divider } from "semantic-ui-react";
import { db } from "../js/dexie-db";
import TextAreaAutosize from "./TextAreaAutosize";

//
export default function ItemDetails(props) {
  const [label, setLabel] = useState(props.itemInfo.label);

  //
  const itemLabelChanged = (id, newLabel) => {
    setLabel(newLabel);
    // TODO: debounce or check focus so the database is not updated on every keypress.
    db.items.update(id, { label: newLabel });
  };

  const completed = (id, isChecked) => {
    db.items.update(id, { isComplete: isChecked });
  };

  return (
    <tr style={{ verticalAlign: "middle" }}>
      <td
        onClick={() =>
          completed(props.itemInfo.itemId, !props.itemInfo.isComplete)
        }
        style={{ padding: "5px" }}
      >
        <Checkbox checked={props.itemInfo.isComplete} />
      </td>

      <td style={{ width: "100%" }}>
        {/* <textarea
          value={label}
          className="item-details"
          rows={1}
          onChange={(event) =>
            itemLabelChanged(props.itemInfo.itemId, event.target)
          }
          style={{
            color: props.itemInfo.isComplete ? "#aaa" : "#000",
          }}
          ref={taRef}
        /> */}
        <TextAreaAutosize
          value={label}
          onValueChange={(newValue) =>
            itemLabelChanged(props.itemInfo.itemId, newValue)
          }
          style={{
            color: props.itemInfo.isComplete ? "#aaa" : "#000",
            width: "100%",
          }}
        />

        <Divider fitted />
      </td>
    </tr>
  );
}
