import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Iconn from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation, route }) {

  //Declaring all states
  const [calculations, setcalculations] = useState([]);
  const [originalPrice, setoriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [saved, setSaved] = useState(0);
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [remainingValue, setRemainingValue] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  //UseEffect hook to show calculation at real time
  useEffect(() => {
    if (originalPrice.length > 0 && discount.length > 0) {
      let price = parseFloat(originalPrice);
      let reminder = price / 100;
      let final = (reminder * parseInt(discount, 10)).toFixed(2);
      let remain = (price - final).toFixed(2);
      setRemainingValue(remain);
      setSaved(final);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      setSaved(0);
      setRemainingValue(0);
    }
  }, [originalPrice, discount]);

  //useEffect hook for overwriting the returned calculations array
  useEffect(() => {
    if (route.params !== undefined) {
      setcalculations(route.params.calculations);
    }
  }, [route]);

  //useLayoutEffect hook for HeaderRight (History) Icon
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Calculations", {
              calculations: calculations,
            })
          }
        >
          <Icon name="history" size={40} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, calculations]);

  const priceHandler = (enteredText) => {
    if (enteredText > 0) {
      setoriginalPrice(enteredText);
    } else {
      if (enteredText == "") {
        setoriginalPrice("");
      } else {
        setNotification("Invalid Input");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 650);
      }
    }
  };

  const discountHandler = (enteredText) => {
    if (enteredText > 0 && enteredText <= 100) {
      setDiscount(enteredText);
    } else {
      if (enteredText == "") {
        setDiscount("");
      } else {
        setNotification("Invalid Input");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 650);
      }
    }
  };

  const addToList = () => {
    if (saved.length > 0 && remainingValue.length > 0) {
      setcalculations((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          originalPrice: originalPrice,
          discount: discount,
          remain: remainingValue,
        },
      ]);
      setNotification("Data Saved");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 450);
      clear();
    }
  };

  const clear = () => {
    setoriginalPrice("");
    setDiscount("");
    setSaved(0);
    setRemainingValue(0);
  };

  return (
    <View style={styles.inputContainer}>
      <Text
        style={{
          marginVertical: 10,
          fontSize: 30,
          textAlign: "center",
          fontStyle: "italic",
          fontWeight: "bold",
        }}
      >
        Discount Calculator
      </Text>
      <View>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/cal.png")}
        />
      </View>
      {showNotification ? (
        <Text style={styles.notification}>{notification}</Text>
      ) : (
        <Text></Text>
      )}
      <TextInput
        placeholder="Original Price"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={priceHandler}
        value={originalPrice}
      />
      <TextInput
        placeholder="Discount"
        style={styles.input}
        keyboardType="numeric"
        keyboardAppearance="dark"
        onChangeText={discountHandler}
        maxLength={3}
        value={discount}
      />
      {saved ? (
        <TextInput
          placeholder="You Saved"
          style={styles.input2}
          editable={false}
          value={"You Saved: " + saved}
        />
      ) : (
        <TextInput
          placeholder="You Saved"
          style={styles.input2}
          editable={false}
        />
      )}
      {remainingValue ? (
        <TextInput
          placeholder="Discounted Value"
          style={styles.input2}
          editable={false}
          value={"Discounted Value: " + remainingValue}
        />
      ) : (
        <TextInput
          placeholder="Discounted Value"
          style={styles.input2}
          editable={false}
        />
      )}
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Clear"
            onPress={clear}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black" }}
            icon={
              <Iconn
                name="circle-with-cross"
                style={{ paddingRight: 8 }}
                size={25}
                color="white"
              />
            }
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Save"
            onPress={addToList}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black" }}
            disabled={isDisabled}
            icon={
              <Icon
                name="save-alt"
                style={{ paddingRight: 8 }}
                size={25}
                color="white"
              />
            }
          />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  input2: {
    width: "80%",
    fontSize: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  button: {
    width: "40%",
  },
  notification: {
    color: "red",
    fontSize: 19,
  },
});
