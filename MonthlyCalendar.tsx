// 없어도 되는데 혹시 몰라서
import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

export const MonthlyCalendar = () => {
    return (
        <View style={{marginTop: 50}}>
            <Calendar/>
        </View>
    );
};
