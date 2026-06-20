import { execSync } from "child_process";
import { Box, Text, useApp, useFocus, useInput } from "ink";
import { useState, useEffect } from "react";
import { colors } from "./constants";

export const Action = ({
  label,
  shortcut,
  commit,
  onComplete,
  autoFocus,
}: {
  label: string;
  shortcut: string;
  commit: string;
  onComplete: () => void;
  autoFocus?: boolean;
}) => {
  const { isFocused } = useFocus({ autoFocus });
  const { exit } = useApp();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useInput((input, key) => {
    if (!isFocused || !ready) return;

    if (key.escape) {
      onComplete();
      return;
    }

    if (key.return || input.toLowerCase() === shortcut) {
      const isYes = label === "Yes";
      if (isYes && commit) {
        execSync(`git commit -m "${commit.replace(/"/g, '\\"')}"`, {
          stdio: "inherit",
        });
      }
      onComplete();
    }
  });

  const isYes = label === "Yes";
  const activeColor = isYes ? colors.success : colors.error;
  const inactiveColor = colors.muted;

  return (
    <Box flexDirection="row" gap={1}>
      {/* Shortcut bracket */}
      <Text color={isFocused ? activeColor : inactiveColor}>
        {isFocused ? "▸" : " "}
      </Text>
      <Text
        color={isFocused ? activeColor : inactiveColor}
        backgroundColor={
          isFocused ? (isYes ? "#14532d" : "#7f1d1d") : undefined
        }
        bold={isFocused}
      >
        {" "}
        {shortcut.toUpperCase()}{" "}
      </Text>
      <Text color={isFocused ? colors.ghost : colors.muted}>{label}</Text>
    </Box>
  );
};
