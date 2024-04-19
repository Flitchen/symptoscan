import { View, Text, Image } from "react-native";
import React from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { sliderImages } from "../constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function ImageSlider() {
  return (
    <Carousel
      data={sliderImages}
      loop={true}
      autoplay={true}
      renderItem={({ item }) => <ItemCard item={item} />}
      hasParallaxImages={false}
      sliderWidth={wp(100)}
      firstItem={1}
      autoplayInterval={4000}
      itemWidth={wp(100) - 70}
      slideStyle={{ display: "flex", alignItems: "center" }}
    />
  );
}

const ItemCard = ({ item }) => {
  return (
    <View style={{ width: wp(100) - 70, height: hp(30) }}>
      <Image
        source={item}
        style={{
          resizeMode: "contain",
          borderRadius: 30,
          width: wp(80),
          height: hp(30),
        }}
      />
    </View>
  );
};
