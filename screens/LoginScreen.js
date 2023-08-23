import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacityBase,
  TouchableOpacity,
  Touchable,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTogglePasswordVisibility } from "../hooks/useTogglePassword";

//const [userInfo, setUserInfo] = useState(" ");

const LoginScreen = () => {
  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   iosClientId:
  //     "902079048434-qa5mv29d8g3oujr3t4lu2ik5pfpptbk0.apps.googleusercontent.com",
  // });
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Discover");
      }
    });
    return unsubscribe;
  }, []);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [loading, setloading] = useState(false);
  const auth = FIREBASE_AUTH;
  const signIn = async () => {
    setloading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      const userEmail = response._tokenResponse.email; // Assuming the response object contains the user's email
      alert(`Welcome ${userEmail}`);
    } catch (error) {
      console.log(error);
      alert("Sign in failed" + error);
    } finally {
      setloading(false);
    }
  };
  // Password Visibility toggle
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  return (
    <SafeAreaView className="">
      <View className="px-6 mt-8 space-y-2 ">
        <Text className="text-[25px] font-semibold">Hi, Welcome Back!👋</Text>
        <Text className="font-light">Hello again, you've been missed</Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        {/* Email Text Box */}
        <View className="px-6 mt-10 relative">
          <Text>Email Address</Text>
          <MaterialIcons
            style={{ left: 3, top: 40, marginLeft: 10 }}
            name="email"
            size={20}
            color="black"
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="px-6 border mt-2 h-11 rounded-lg border-gray-400 pl-12 "
            placeholder="ryan20@gmail.com"
            keyboardType="email-address"
          />
        </View>

        {/* Password Text Box */}
        <View className="px-6 mt-8 w-full">
          <Text>Password</Text>
          <AntDesign
            style={{ left: 3, top: 40, marginLeft: 10 }}
            name="lock"
            size={24}
            color="black"
          />
          <TextInput
            onChangeText={setPassword}
            value={password}
            className="px-6 border mt-2 h-11 rounded-lg border-gray-400 pl-12"
            placeholder="Enter your password"
            secureTextEntry={passwordVisibility}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <Ionicons
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
              }}
              name={rightIcon}
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      {/* Remember me tick and forgot password */}
      <View className="flex-row items-center justify-between ">
        <View className="m-6 flex-row space-x-3 items-center">
          <Checkbox
            value={toggleCheckBox}
            onValueChange={setToggleCheckBox}
            color={toggleCheckBox ? "#3c6072" : undefined}
          />
          <Text> Remember Me</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          className="m-6 justify-end"
        >
          <Text className="text-red-600 text-md font-semibold">
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      {/* Login Button */}
      <TouchableOpacity
        onPress={signIn}
        className=" bg-[#00bcc9] rounded-lg justify-center items-center m-auto w-80 h-12"
      >
        <Text className="text-white font-semibold">Login</Text>
      </TouchableOpacity>

      {/* Or Login With */}
      <View className="flex-row mt-10 items-center justify-center space-x-3 ">
        <View className="px-6 border-t-2 border-[#3c6072] w-40 " />
        <Text className="">Or Login With</Text>
        <View className="px-6 border-t-2 border-[#3c6072] w-40 " />
      </View>

      {/* Social Icons */}
      <View className=" space-x-2 p-4 mt-4 flex-row m-auto">
        <TouchableOpacity className="border border-gray-400 py-2 px-8 /items-center justify-center rounded-lg ">
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
      {/* Sign Up */}
      <View className="mt-20 justify-center items-center p-6 flex-row ">
        <Text>New to Gbera? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text className="text-[#00bcc9] font-bold text-md "> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
