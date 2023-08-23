import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const data = route?.params?.param;

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6 ">
        {/* Image Sectuin  */}
        <View className="relative shadow-lg bg-white">
          <Image
            source={{
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://img.freepik.com/free-icon/placeholder_318-543538.jpg",
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />
          {/* Icons on Images */}
          <View className="absolute flex-row inset-x-0 top-5 px-6 justify-between">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <Entypo name="chevron-left" size={24} color="#06b2be" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#06b2be]">
              <FontAwesome name="heartbeat" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-row inset-x-0 bottom-5 px-6 justify-between">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[12px] font-bold text-gray-100">
                {" "}
                {data?.price_level}
              </Text>
              <Text className="text-[32px] font-bold text-gray-100">
                {" "}
                {data?.price}
              </Text>
            </View>
            <View className="px-2 py-1 rounded-md bg-teal-100 justify-center">
              <Text>{data?.open_now_text}</Text>
            </View>
          </View>
        </View>
        {/* Location Body */}
        <View className="mt-6">
          <Text className="text-[#428288] text-[24px] font-bold">
            {data?.name}
          </Text>
        </View>

        <View className="flex-row items-center space-x-2 mt-2">
          <FontAwesome name="map-marker" size={24} color={"#8C9EA6"} />
          <Text className="text-[#8C9EA6] text-[20px] font-bold">
            {data?.location_string}
          </Text>
        </View>
        {/* Ratings et all */}
        <View className="mt-4 flex-row items-center justify-between">
          {data?.rating && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color={"#D58574"} />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.rating}</Text>
                <Text className="text-[#515151] font-semibold">Ratings</Text>
              </View>
            </View>
          )}

          {data?.price_level && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <FontAwesome name="dollar" size={24} color={"black"} />
              </View>
              <View>
                <Text className="text-[#515151]">{data?.price_level}</Text>
                <Text className="text-[#515151] font-semibold">
                  Price Level
                </Text>
              </View>
            </View>
          )}

          {data?.distance && (
            <View className="flex-row items-center space-x-2">
              <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                <MaterialCommunityIcons
                  name="map-marker-distance"
                  size={24}
                  color="black"
                />
              </View>
              <View>
                <Text className="text-[#515151]">
                  {Number(data?.distance).toFixed(1)} km
                </Text>

                <Text className="text-[#515151] font-semibold">Distance</Text>
              </View>
            </View>
          )}
        </View>

        {/* Description */}
        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
            {data.description}
          </Text>
        )}
        {/* Cuisine Tags */}
        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start mt-4 flex-wrap ">
            {data?.cuisine.map((i) => (
              <TouchableOpacity
                key={i.key}
                className="px-2 py-1 rounded-md bg-emerald-100"
              >
                <Text>{i.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {/* Contact details */}
        <View className="space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2 ">
          {data?.phone && (
            <View className="flex-row items-center space-x-6">
              <FontAwesome name="phone" size={24} color="#428288" />
              <Text className="text-lg"> {data?.phone}</Text>
            </View>
          )}
          {data?.email && (
            <View className="flex-row items-center space-x-6">
              <FontAwesome name="envelope" size={24} color="#428288" />
              <Text className="text-lg"> {data?.email}</Text>
            </View>
          )}
          {data?.address && (
            <View className="flex-row items-center space-x-6">
              <FontAwesome name="map-pin" size={24} color="#428288" />
              <Text className="text-lg"> {data?.address}</Text>
            </View>
          )}
          {/* Book Now Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Book Now")}
            className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12 "
          >
            <Text className="text-3xl font-semibold text-gray-100 uppercase tracking-wider">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
