import { Box, Text } from "ink";
import { Commit } from "./commit";

export const OutputContainer = ({
  command,
  onComplete,
}: {
  command: string;
  onComplete: () => void;
}) => {
  if (command == "/help") {
    return <Commit onComplete={onComplete} />;
  }
  return <></>;
};
