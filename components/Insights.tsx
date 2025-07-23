import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Platform,
} from "react-native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import { Picker } from '@react-native-picker/picker';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, ChevronDown } from 'lucide-react-native';

const screenWidth = Dimensions.get("window").width;

type ChartType = "bar" | "pie" | "line";
type RangeType = "1d" | "1w" | "1m" | "3m" | "6m" | "1y";

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    colors?: Array<() => string>;
    color?: () => string;
    strokeWidth?: number;
  }>;
}

interface ExpenseData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
}

interface PieChartData {
  name: string;
  population: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface RangeOption {
  label: string;
  value: RangeType;
}

const dummyData: ExpenseData[] = [
  { name: "Health", amount: 300, color: "#EF4444", legendFontColor: "#1F2937" },
  { name: "Grocery", amount: 500, color: "#F97316", legendFontColor: "#1F2937" },
  { name: "Personal", amount: 200, color: "#EAB308", legendFontColor: "#1F2937" },
  { name: "Travel", amount: 100, color: "#22C55E", legendFontColor: "#1F2937" },
  { name: "Entertainment", amount: 150, color: "#3B82F6", legendFontColor: "#1F2937" },
  { name: "Shopping", amount: 250, color: "#8B5CF6", legendFontColor: "#1F2937" },
];

const rangeOptions: RangeOption[] = [
  { label: "Last 24 Hours", value: "1d" },
  { label: "Last 7 Days", value: "1w" },
  { label: "Last 30 Days", value: "1m" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last Year", value: "1y" },
];

const chartTypeOptions = [
  { 
    type: "bar" as ChartType, 
    icon: BarChart3, 
    label: "Bar Chart",
    color: "#3B82F6"
  },
  { 
    type: "pie" as ChartType, 
    icon: PieChartIcon, 
    label: "Pie Chart",
    color: "#10B981"
  },
  { 
    type: "line" as ChartType, 
    icon: TrendingUp, 
    label: "Line Chart",
    color: "#8B5CF6"
  },
];

const Insights: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [range, setRange] = useState<RangeType>("1w");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const total = dummyData.reduce((acc, item) => acc + item.amount, 0);

  const barChartData: ChartData = {
    labels: dummyData.map((item) => item.name),
    datasets: [
      {
        data: dummyData.map((item) => item.amount),
        colors: dummyData.map((item) => () => item.color),
      },
    ],
  };

  const lineChartData: ChartData = {
    labels: dummyData.map((item) => item.name),
    datasets: [
      {
        data: dummyData.map((item) => item.amount),
        color: () => "#3B82F6",
        strokeWidth: 3,
      },
    ],
  };

  const pieChartData: PieChartData[] = dummyData.map((item) => ({
    name: item.name,
    population: item.amount,
    color: item.color,
    legendFontColor: item.legendFontColor,
    legendFontSize: 12,
  }));

  const selectedRangeLabel = rangeOptions.find(option => option.value === range)?.label || "Last 7 Days";

  const handleRangeChange = (itemValue: string | number): void => {
    setRange(itemValue as RangeType);
  };

  const renderChart = () => {
    const chartConfig = {
      backgroundGradientFrom: "#ffffff",
      backgroundGradientTo: "#ffffff",
      decimalPlaces: 0,
      color: (opacity: number = 1): string => `rgba(59, 130, 246, ${opacity})`,
      labelColor: (opacity: number = 1): string => `rgba(31, 41, 55, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForBackgroundLines: {
        stroke: "#E5E7EB",
        strokeDasharray: "3,3",
      },
      barPercentage: 0.7,
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart
            data={barChartData}
            width={screenWidth - 32}
            height={280}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars={true}
            fromZero={true}
            withInnerLines={true}
          />
        );
      case "pie":
        return (
          <PieChart
            data={pieChartData}
            width={screenWidth - 32}
            height={280}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute={false}
            hasLegend={true}
            chartConfig={{
              color: (opacity: number = 1): string => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={styles.chart}
          />
        );
      case "line":
        return (
          <LineChart
            data={lineChartData}
            width={screenWidth - 32}
            height={280}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              color: (opacity: number = 1): string => `rgba(59, 130, 246, ${opacity})`,
            }}
            style={styles.chart}
            bezier={true}
            withDots={true}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={true}
            withHorizontalLines={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Expense Insights</Text>
        <Text style={styles.subtitle}>Analyze your spending patterns</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Expenses</Text>
        <Text style={styles.summaryAmount}>${total.toLocaleString()}</Text>
        <Text style={styles.summaryPeriod}>for {selectedRangeLabel.toLowerCase()}</Text>
      </View>

      {/* Controls Section */}
      <View style={styles.controlsSection}>
        {/* Time Range Dropdown */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.controlLabel}>Time Period</Text>
          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={range}
              onValueChange={handleRangeChange}
              style={styles.picker}
              dropdownIconColor="#6B7280"
              mode="dropdown"
            >
              {rangeOptions.map((option) => (
                <Picker.Item 
                  key={option.value} 
                  label={option.label} 
                  value={option.value}
                  color="#1F2937"
                />
              ))}
            </Picker>
            <ChevronDown 
              size={20} 
              color="#6B7280" 
              style={styles.dropdownIcon}
            />
          </View>
        </View>

        {/* Chart Type Selection */}
        <View style={styles.chartTypeContainer}>
          <Text style={styles.controlLabel}>Chart Type</Text>
          <View style={styles.chartTypeButtons}>
            {chartTypeOptions.map((option) => {
              const IconComponent = option.icon;
              const isActive = chartType === option.type;
              
              return (
                <TouchableOpacity
                  key={option.type}
                  style={[
                    styles.chartTypeButton,
                    isActive && { ...styles.activeChartButton, borderColor: option.color }
                  ]}
                  onPress={() => setChartType(option.type)}
                  activeOpacity={0.7}
                >
                  <IconComponent
                    size={20}
                    color={isActive ? option.color : "#6B7280"}
                  />
                  <Text style={[
                    styles.chartTypeText,
                    isActive && { color: option.color }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Chart Container */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>
          {chartTypeOptions.find(opt => opt.type === chartType)?.label} - Expense Breakdown
        </Text>
        {renderChart()}
      </View>

      {/* Category Breakdown */}
      <View style={styles.categoryBreakdown}>
        <Text style={styles.breakdownTitle}>Category Breakdown</Text>
        {dummyData.map((item, index) => {
          const percentage = ((item.amount / total) * 100).toFixed(1);
          return (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
              <View style={styles.categoryAmount}>
                <Text style={styles.amount}>${item.amount}</Text>
                <Text style={styles.percentage}>{percentage}%</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  summaryCard: ViewStyle;
  summaryLabel: TextStyle;
  summaryAmount: TextStyle;
  summaryPeriod: TextStyle;
  controlsSection: ViewStyle;
  dropdownContainer: ViewStyle;
  controlLabel: TextStyle;
  dropdownWrapper: ViewStyle;
  picker: TextStyle;
  dropdownIcon: ViewStyle;
  chartTypeContainer: ViewStyle;
  chartTypeButtons: ViewStyle;
  chartTypeButton: ViewStyle;
  activeChartButton: ViewStyle;
  chartTypeText: TextStyle;
  chartContainer: ViewStyle;
  chartTitle: TextStyle;
  chart: ViewStyle;
  categoryBreakdown: ViewStyle;
  breakdownTitle: TextStyle;
  categoryItem: ViewStyle;
  categoryInfo: ViewStyle;
  categoryColor: ViewStyle;
  categoryName: TextStyle;
  categoryAmount: ViewStyle;
  amount: TextStyle;
  percentage: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  summaryCard: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 4,
  },
  summaryPeriod: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "400",
  },
  controlsSection: {
    marginBottom: 24,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  dropdownWrapper: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  picker: {
    flex: 1,
    height: Platform.OS === "android" ? 50 : 44,
    color: "#1F2937",
  },
  dropdownIcon: {
    position: "absolute",
    right: 12,
    pointerEvents: "none",
  },
  chartTypeContainer: {
    marginBottom: 8,
  },
  chartTypeButtons: {
    flexDirection: "row",
    gap: 12,
  },
  chartTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeChartButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
  },
  chartTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  chart: {
    borderRadius: 12,
  },
  categoryBreakdown: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  categoryAmount: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  percentage: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
});

export default Insights;