import React, { useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconn from "react-native-vector-icons/MaterialCommunityIcons";
import { DataTable } from "react-native-paper";

export default function Calculations({ navigation, route }) {

  //Saving the Props data into a state
  const [calculations, setCalculations] = useState([
    ...route.params.calculations,
  ]);

  //Setting headerLeft and Header Right of the header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Home", {
              calculations: calculations,
            })
          }
        >
          <Iconn name="keyboard-backspace" size={40} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={GenereateAlert}
          disabled={!calculations.length > 0}
        >
          {calculations.length > 0 ? (
            <Iconn name="delete-empty" size={40} />
          ) : (
            <Iconn name="delete-empty-outline" size={40} />
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, calculations]);

  //Function to delete a single item from Table
  const removeCalculations = (itemID) => {
    setCalculations((currentItems) => {
      return currentItems.filter((item) => item.id !== itemID);
    });
  };
  const clearCalculations = () => {
    setCalculations([]);
  };

  //Function to generate a Alert 
  const GenereateAlert = () => {
    Alert.alert(
      "Clear Memory",
      "Are you sure you want to delete all memory? ",
      [
        {
          text: "No",
          onPress: () => console.log("."),
          style: "cancel",
        },
        { text: "Yes", onPress: () => clearCalculations() },
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      {calculations.length > 0 ? (
        <View>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Original Price</DataTable.Title>
              <DataTable.Title numeric>Discount(%)</DataTable.Title>
              <DataTable.Title numeric>Final Price</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>

            {calculations.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.originalPrice}</DataTable.Cell>
                <DataTable.Cell numeric style={{ justifyContent: "center" }}>
                  {item.discount + "%"}
                </DataTable.Cell>
                <DataTable.Cell numeric>{item.remain}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <TouchableOpacity onPress={() => removeCalculations(item.id)}>
                    <Icon name="delete" size={25} color="black" />
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      ) : (
        <View>
          <Text
            style={{
              justifyContent: "center",
              textAlign: "center",
              fontStyle: "italic",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            No Saved Memory
          </Text>
        </View>
      )}
    </View>
  );
}
