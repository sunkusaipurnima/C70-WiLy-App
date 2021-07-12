/** @format */

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { Rajdhani_600SemiBold } from "@expo-google-fonts/rajdhani";
import { BarCodeScanner } from "expo-barcode-scanner";

const bgImg = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

const BookTransactionScreen = (props) => {
  const [hasPermissions, setHasPermissions] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [buttonId, setButtonId] = useState("normal");
  const [studentData, setStudentData] = useState("");
  const [bookData, setBookData] = useState("");

  const handlePermissions = async (id) => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermissions(status === "granted");
    setButtonId(id);
    setScanned(false);
  };

  const handleScan = async ({ type, data }) => {
    if (buttonId === "bookId") {
      setBookData(data);
      setScanned(true);
      setButtonId("normal");
    } else if (buttonId === "studentId") {
      setStudentData(data);
      setScanned(true);
      setButtonId("normal");
    }
  };

  if (buttonId !== "normal") {
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bgImg} style={styles.bgImage}>
        <View style={styles.upperContainer}>
          <Image source={appIcon} style={styles.appIcon} />
          <Image source={appName} style={styles.appName} />
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Book Id"
              placeholderTextColor="#ffff"
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handlePermissions("bookId")}
              value={bookData}
            >
              <Text style={styles.scanButtonText}> Scan</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.textInputContainer, { marginTop: 20 }]}>
            <TextInput
              style={styles.textInput}
              placeholder="Student Id"
              placeholderTextColor="#ffff"
              value={studentData}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handlePermissions("studentId")}
            >
              <Text style={styles.scanButtonText}> Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  appIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginTop: 80,
  },
  appName: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  lowerContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    width: 100,
    height: 50,
    backgroundColor: "#9DFD24",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonText: {
    fontSize: 24,
    fontFamily: "Rajdhani_600SemiBold",
    color: "#0A0101",
  },

  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#9DFD24",
    borderColor: "#FFFFFF",
  },
  textInput: {
    width: "57%",
    height: 50,
    padding: 10,
    borderColor: "#fff",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontSize: 18,
    backgroundColor: "#5653d4",
    fontFamily: "Rajdhani_600SemiBold",
    color: "#fff",
  },
  upperContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookTransactionScreen;
