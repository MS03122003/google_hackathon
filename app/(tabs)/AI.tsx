import React from "react";
import { View } from "react-native";
import Header from "@/components/header";
import ChatInterface from "@/components/ChatInterface";

export default function AIScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ChatInterface />
    </View>
  );
}
