import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import forgotpassword from "../assets/forgotpassword.jpg";
import { Entypo } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [email, setEmail] = useState();

  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAwareScrollView className="ml-4 bg-white flex-1 mt-11">
      <Pressable className="p-2" onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="gray" />
      </Pressable>
      <Image className="h-[300px] w-[350px]" source={forgotpassword} />
      <View className="mt-6 space-y-1">
        <Text className="font-bold text-[25px] ">Forgot </Text>
        <Text className="font-bold text-[25px]">Password? </Text>
        <Text>
          Don't worry! It happens. Please enter the address associated with your
          account.
        </Text>
      </View>

      <View className="m-auto">
        <Entypo
          style={{ left: 3, top: 40, marginLeft: 10 }}
          name="email"
          size={20}
          color="gray"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="px-6 border mt-2 h-11 rounded-lg border-gray-400 pl-12 w-[350px] "
          placeholder="Email/Mobile Number"
          keyboardType="email-address"
        />

        <TouchableOpacity className=" bg-[#00bcc9] rounded-lg justify-center items-center m-auto w-80 h-12 mt-8">
          <Text className="text-white font-semibold">Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
