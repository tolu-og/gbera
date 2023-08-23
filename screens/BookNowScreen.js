import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { BookNow } from "../assets";
import { useNavigation } from "@react-navigation/native";

const BookNowScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Success");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Image
        source={BookNow}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-2xl my-10 font-bold text-center text-[#06B2BE]"
      >
        {" "}
        Preparing your Booking!{" "}
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="#06B2BE" />
    </SafeAreaView>
  );
};

export default BookNowScreen;
