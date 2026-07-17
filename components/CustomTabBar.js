import React, { useContext, memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

const CustomTabBar = memo(({ state, descriptors, navigation }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName = "home";

          if (route.name === "NuevaSimulacion") iconName = "add-circle";
          if (route.name === "Recomendaciones") iconName = "bulb";
          if (route.name === "Perfil") iconName = "person";
          if (route.name === "Test") iconName = "clipboard";

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              activeOpacity={0.8}
              style={[
                styles.tabBtn,
                isFocused && { backgroundColor: isDarkMode ? theme.primary + "30" : theme.primary + "15" }
              ]}
            >
              <Icon
                name={isFocused ? iconName : `${iconName}-outline`}
                size={22}
                color={isFocused ? theme.primary : theme.textSecondary}
              />
              {isFocused && (
                <Text style={[styles.tabLabel, { color: theme.primary }]}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    elevation: 0,
    pointerEvents: "box-none",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 10,
    width: "100%",
    maxWidth: 400,
    pointerEvents: "auto",
  },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft: 6,
  }
});

export default CustomTabBar;
