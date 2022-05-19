import { useLayoutEffect, useRef } from "react";

// This component automatically resizes the textarea to match its content.
export default function TextAreaAutosize(props) {
  const taRef = useRef();

  useLayoutEffect(() => {
    autosizeTextarea(taRef.current);
  }, [props.value]);

  const autosizeTextarea = (element) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement#autogrowing_textarea_example
    element.style.height = "1px";
    element.style.height = Number(element.scrollHeight) + 1 + "px";
  };

  const onElementChange = (event) => {
    props.onValueChange(event.target.value);
  };

  return (
    <textarea
      value={props.value}
      rows={1}
      onChange={(event) => onElementChange(event)}
      ref={taRef}
      style={{
        outline: "0px solid transparent",
        borderStyle: "hidden",
        resize: "none",
        overflow: "hidden",
        width: "100%",
      }}
    />
  );
}
