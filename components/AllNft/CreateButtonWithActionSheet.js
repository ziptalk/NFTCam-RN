// Using the provided hook
import { useActionSheet } from "@expo/react-native-action-sheet";

import IconTextButton from "../UI/IconTextButton";

function CreateButtonWithActionSheet({
  buttonStyle,
  imagePickerHandler,
  cameraHandler,
}) {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    const options = ["Photo Library", "Camera", "Cancel"];
    const cancelButtonIndex = 2;
    const title = "Where to get image from?";
    const userInterfaceStyle = "dark";

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title,
        userInterfaceStyle,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            imagePickerHandler();
            break;
          case 1:
            cameraHandler();
            break;
          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  return (
    <IconTextButton
      style={buttonStyle}
      icon="add"
      color={"white"}
      onPress={onPress}
    >
      Create
    </IconTextButton>
  );
}

export default CreateButtonWithActionSheet;
