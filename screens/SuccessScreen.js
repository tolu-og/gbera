import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";
const BookingSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center p-[20px]">
      <Ionicons name="md-checkmark-circle-outline" size={80} color="#00bcc9" />

      <Text className="text-[24px] font-bold mt-[10px] mb-[5px] ">
        Booking Successful!
      </Text>

      <Text className="text-[18px] text-center mb-[20px]">
        Thank you for booking with us. Your reservation has been confirmed.
      </Text>
      <View className="justify-center">
        <QRCode size={100} value="https://github.com/tolu-og" />
      </View>

      <TouchableOpacity
        className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] justify-center"
        onPress={() => navigation.navigate("Discover")}
      >
        <Text className="text-xl font-semibold text-gray-100 uppercase tracking-wider">
          More bookings? Gbera!
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default BookingSuccessScreen;
