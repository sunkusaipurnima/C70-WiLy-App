/** @format */

import React, { useState, useEffect } from "react";
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

import { TextBase } from "react-native";

const bgImg = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

const BookTransactionScreen = (props) => {
  const [hasPermissions, setHasPermissions] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanStudentId, setScanStudentId] = useState("normal");
  const [scanBookId, setScanBookId] = useState("normal");
  const [studentData, setStudentData] = useState("");
  const [bookData, setBookData] = useState("");

  console.log(hasPermissions, scanned, bookData);

  // useEffect(() => {
  //   handlePermissions();
  // }, []);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermissions(status === "granted");
    })();
  }, []);

  // const handlePermissions = async () => {
  //   const { status } = await BarCodeScanner.requestPermissionsAsync();
  //   setHasPermissions(status === "granted");
  // };

  const handleScan = async ({ type, data }) => {
    console.log("inside handle scan");
    if (scanBookId === "clicked") {
      setBookData(data);
      setScanned(true);
      setScanBookId("normal");
    } else if (scanStudentId === "clicked") {
      setStudentData(data);
      setScanned(true);
      setScanStudentId("normal");
    }
  };

  if (
    (scanBookId === "clicked" || scanStudentId === "clicked") &&
    hasPermissions
  ) {
    console.log("inside bar code scanner");
    console.log("scanned is", scanned);
    return (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleScan}
        style={StyleSheet.absoluteFillObject}
      />
    );
  }

  return (
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
            value={bookData}
          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {
              setScanBookId("clicked");
            }}
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
            onPress={() => {
              setScanStudentId("clicked");
            }}
          >
            <Text style={styles.scanButtonText}> Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ImageBackground>
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
  submitButton: {
    width: "43%",
    height: 55,
    backgroundColor: "#f4d820",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 50,
  },
  submitButtonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "Rajdhani_600SemiBold",
    textAlign: "center",
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
