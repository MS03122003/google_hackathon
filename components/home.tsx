import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/header";
import CreditScoreCard from "./CreditScoreCard";
import Expense from "./Expense";
import NetWorthCard from "./NetWorthCard";
import Insights from "./Insights";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <CreditScoreCard score={800} />
        <NetWorthCard 
  name="Jane Smith" 
  netWorth="$1,234,567"
  accountNumber="4532 1234 5678 9012"
  cardType="emerald"
  bankName="PREMIUM BANK"
  showChip={true}
/>
        <Expense />
        <Insights />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Optional: white background
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: "center",
  },
});
