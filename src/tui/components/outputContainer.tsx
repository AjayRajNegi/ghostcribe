import { useEffect } from "react";
import { useApp } from "ink";
import { Commit } from "./commit";

export const OutputContainer = ({
  command,
  onComplete,
}: {
  command: string;
  onComplete: () => void;
}) => {
  const { exit } = useApp();

  useEffect(() => {
    if (command === "/exit") {
      exit();
    }
  }, [command, exit]);

  if (command === "/help") {
    return <Commit onComplete={onComplete} />;
  }

  return null;
};
