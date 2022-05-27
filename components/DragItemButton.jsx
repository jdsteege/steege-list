import { IconButton } from "@chakra-ui/react";
import { MdDragIndicator } from "react-icons/md";

export default function DragItemButton(props) {
  return <IconButton size="xs" icon={<MdDragIndicator />} />;
}
