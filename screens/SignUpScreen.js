import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebase";
import { useTogglePasswordVisibility } from "../hooks/useTogglePassword";
const SignUpScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setloading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  // const signUp = async () => {
  //   setloading(true);
  //   try {
  //     const response = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     console.log(response);
  //     alert("Check your email");
  //   } catch (error) {
  //     console.log(error);
  //     alert("Sign in failed" + error);
  //   } finally {
  //     setloading(false);
  //   }
  // };

  // Password visibility toggle
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  return (
    <SafeAreaView className="">
      {/* Create account + Logo */}
      <View className="px-6 mt-8 space-y-2 flex-row justify-between items-center ">
        <Text className="text-[22px] font-semibold">Create Account</Text>
        <View className="w-8 h-8 bg-black rounded-full items-center justify-center ">
          <Text
            className="text-[#00bcc9] text-xl font-semibold
          "
          >
            Go
          </Text>
        </View>
      </View>
      <View className="mt-2 px-6">
        <Text className="font-light">Connect on Gbera today!</Text>
      </View>

      {/* Email Text Box */}
      <View className="px-6 mt-10">
        <Text>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="px-6 border mt-2 h-11 rounded-lg border-gray-400"
          placeholder="ryan20@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Mobile Number */}
      <View className="px-6 mt-10">
        <Text>Mobile Number</Text>
        <TextInput
          value={number}
          onChangeText={(text) => setNumber(text)}
          className="px-6 border mt-2 h-11 rounded-lg border-gray-400"
          placeholder="+44"
          keyboardType="numeric"
        />
      </View>
      {/* Password */}
      <Pressable onPress={handlePasswordVisibility}>
        <View className="px-6 mt-10 relative">
          <Text>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            className="px-6 border mt-2 h-11 rounded-lg border-gray-400"
            placeholder="Enter your password"
            secureTextEntry={passwordVisibility}
          />
          <Ionicons
            style={{
              position: "absolute",
              right: 40,
              top: 35,
            }}
            name={rightIcon}
            size={24}
            color="black"
          />
        </View>
      </Pressable>

      {/* T */}
      <View className="flex-row items-center justify-between ">
        <View className="m-6 flex-row space-x-3 items-center">
          <Checkbox
            value={toggleCheckBox}
            onValueChange={setToggleCheckBox}
            color={toggleCheckBox ? "#3c6072" : undefined}
          />
          <Text>I agree to the terms and conditions</Text>
        </View>
      </View>

      {/* Sign Up Button */}

      <TouchableOpacity
        onPress={handleSignUp}
        className=" bg-[#00bcc9] rounded-lg justify-center items-center m-auto w-80 h-12"
      >
        <Text className="text-white font-semibold">Sign Up</Text>
      </TouchableOpacity>

      {/* Or Sign up With */}
      <View className="flex-row mt-10 items-center justify-center space-x-3 ">
        <View className="px-6 border-t-2 border-[#3c6072] w-40 " />
        <Text className="">Or Sign Up With</Text>
        <View className="px-6 border-t-2 border-[#3c6072] w-40 " />
      </View>

      {/* Social Icons */}
      <View className=" space-x-2 p-4 mt-4 flex-row m-auto">
        <TouchableOpacity className="border border-gray-400 py-2 px-8 items-center justify-center rounded-lg ">
          <View className="flex-row items-center space-x-1">
            <FontAwesome5 name="facebook" size={24} color="#059ae6" />
            <Text> Facebook </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="border border-gray-400 py-2 px-8 items-center justify-center rounded-lg ">
          <View className="flex-row items-center space-x-1">
            <AntDesign name="google" size={24} color="#fe3b04" />
            <Text> Google </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" justify-center items-center p-6 flex-row ">
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-[#00bcc9] font-bold text-md "> Login </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
