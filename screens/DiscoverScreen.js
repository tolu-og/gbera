import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MenuContainer from "../components/MenuContainer";
import { FontAwesome } from "@expo/vector-icons";
import CardContainer from "../components/CardContainer";
import { getPlacesData } from "../api";
import { getAuth, signOut } from "firebase/auth";

const DiscoverScreen = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("restaurants");
  const [loading, setloading] = useState(false);
  const [mainData, setmainData] = useState([]);
  // Get Geometry
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,

      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setloading(true);
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setmainData(data);
      setInterval(() => {
        setloading(false);
      }, 2000);
    });
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
        alert("Sign Out Successfully");
      })
      .catch((error) => {
        alert("error");
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white relative ">
      <View className="flex-row items-center justify-between px-8 mt-3">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold ">
            Discover{" "}
          </Text>
          <Text className="text-[#527283] text-[36px]">the Beauty today </Text>
        </View>
        {/* Profile image */}
        <View className="h-12 w-12 bg-gray-400 rounded-md items-center justify-center shadow-lg ">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover "
          />
        </View>
      </View>

      {/* Search Box */}
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true

            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            key: "AIzaSyD0tVVkAptoiHi5Io-XF5JES3UDX4TWhrI",
            language: "en",
          }}
        />
      </View>
      {/* Menu Container */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0B646B" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between px-8 mt-8 ">
            <MenuContainer
              key={"hotels"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>
          {/* Main Container */}
          {/* Text Section */}
          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#2C7379] text-[28px] font-bold">
                Top Trips
              </Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#A0C4C7] text-[20px] font-bold">
                  {" "}
                  Explore
                </Text>
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#A0C4C4"
                />
              </TouchableOpacity>
            </View>

            <View className="px-2s mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <CardContainer
                      key={i}
                      imgSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://img.freepik.com/free-icon/placeholder_318-543538.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      No vex boss, No data found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={handleSignOut}
        className="mt-8 bg-[#00bcc9] rounded-lg justify-center items-center m-auto w-80 h-12"
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DiscoverScreen;
