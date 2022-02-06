import { Pressable, Text } from "react-native";
import React from "react";

const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange, key } = props;
  const isSelectedFilter = (filter) => filter === selectedRange;
  return (
    <Pressable
      onPress={() => setSelectedRange(filterDay)}
      style={{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: isSelectedFilter(filterDay)
          ? "#1e1e1e"
          : "transparent",
        borderRadius: 5,
      }}
    >
      <Text style={{ color: isSelectedFilter(filterDay) ? "#fff" : "grey" }}>
        {filterText}
      </Text>
    </Pressable>
  );
};

export default FilterComponent;
