import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ViewStyle, TextStyle } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';

type RangeType = 'days' | 'weeks' | 'months';

const screenWidth = Dimensions.get('window').width;

interface DataSet {
  labels: string[];
  data: number[];
}

const dummyData: Record<RangeType, DataSet> = {
  days: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [120, 90, 150, 80, 200, 70, 100],
  },
  weeks: {
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'],
    data: [500, 700, 800, 650, 900, 750, 620],
  },
  months: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    data: [3000, 2800, 3500, 4000, 3700, 3900, 4500],
  },
};

const Expense: React.FC = () => {
  const [range, setRange] = useState<RangeType>('days');

  const chartData = {
    labels: dummyData[range].labels,
    datasets: [{ data: dummyData[range].data }],
  };

  const handleValueChange = (itemValue: string | number): void => {
    setRange(itemValue as RangeType);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Expenses</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={range}
            onValueChange={handleValueChange}
            style={styles.picker}
            dropdownIconColor="#000"
            mode="dropdown"
          >
            <Picker.Item label="Last 7 Days" value="days" />
            <Picker.Item label="Last 7 Weeks" value="weeks" />
            <Picker.Item label="Last 7 Months" value="months" />
          </Picker>
        </View>
      </View>

      <BarChart
        data={chartData}
        width={screenWidth - 48}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        fromZero={true}
        showValuesOnTopOfBars={false}
        withInnerLines={true}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity: number = 1): string => `rgba(30, 136, 229, ${opacity})`,
          labelColor: (opacity: number = 1): string => `rgba(33, 33, 33, ${opacity})`,
          propsForBackgroundLines: {
            stroke: '#e0e0e0',
            strokeDasharray: '4',
          },
          barPercentage: 0.6,
        }}
        style={styles.chartStyle}
        verticalLabelRotation={0}
      />
    </View>
  );
};

interface Styles {
  card: ViewStyle;
  headerRow: ViewStyle;
  heading: TextStyle;
  pickerWrapper: ViewStyle;
  picker: TextStyle;
  chartStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 32,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    height: Platform.OS === 'android' ? 44 : 40,
    width: 150,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  chartStyle: {
    borderRadius: 12,
    marginTop: 4,
  },
});

export default Expense;