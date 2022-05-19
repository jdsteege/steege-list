//
import { useState, useLayoutEffect, useRef } from "react";
import { Checkbox, Container, Divider } from "semantic-ui-react";
import { db } from "../js/dexie-db";

//
export default function ItemDetails(props) {
  const [label, setLabel] = useState(props.itemInfo.label);

  // The following is needed to resize the textarea to match its content.
  //   const taRef = useRef();

  //   useLayoutEffect(() => {
  //     autosizeTextarea(taRef.current);
  //   }, [label]);

  //   const autosizeTextarea = (element) => {
  //     // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#autogrowing_textarea_example
  //     element.style.height = "1px";
  //     element.style.height = element.scrollHeight + "px";
  //   };

  //
  const itemLabelChanged = (id, element) => {
    console.log(element.innerHTML);
    setLabel(element.innerHTML);
    // TODO: debounce or check focus/blur so the database is not updated on every keypress.
    db.items.update(id, { label: element.innerHTML });
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
        <div
          contentEditable
          className="item-details"
          onBlur={(event) => {
            console.log("here");
            itemLabelChanged(props.itemInfo.itemId, event.target);
          }}
          style={{
            color: props.itemInfo.isComplete ? "#aaa" : "#000",
          }}
        >
          {label}
        </div>

        <Divider fitted />
      </td>
    </tr>
  );
}
