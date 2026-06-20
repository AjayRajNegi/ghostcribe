import { Box, Text, useFocus, useInput } from "ink";
import { useState, useEffect } from "react";
import { colors } from "./constants";

export const ModelAction = ({
  model,
  autoFocus,
  onSelect,
}: {
  model: string;
  autoFocus?: boolean;
  onSelect: (model: string) => void;
}) => {
  const { isFocused } = useFocus({ autoFocus });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useInput((input, key) => {
    if (!isFocused || !ready) return;

    if (key.return) {
      onSelect(model);
    }
  });

  return (
    <Box flexDirection="row" gap={1}>
      <Text color={isFocused ? colors.accent : colors.muted}>
        {isFocused ? "▸" : " "}
      </Text>

      <Text color={isFocused ? colors.accent : colors.ghost} bold={isFocused}>
        {model}
      </Text>
    </Box>
  );
};
