import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useState } from "react";

import { colors } from "../styles/global";

import Input from "../components/Input";
import Button from "../components/Button";
import validateEmail from "../utils/validateEmailUtils";

type Data = {
  login: string;
  email: string;
  password: string;
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const RegistrationScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true);
  const [formData, setFormData] = useState<Data>({
    login: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string): void => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const onRegister = () => {
    const { login, email, password } = formData;

    if (!login || !email || !password) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля.");
    } else if (!validateEmail(email)) {
      Alert.alert(
        "Помилка",
        "Будь ласка, введіть електрону адресу у форматі example@gmail.com."
      );
    } else {
      Alert.alert("Credentials", `${login} + ${email} + ${password}`);
    }
  };

  const onSignIn = () => {
    console.log("Go to login form!");
  };

  const showButton = (
    <TouchableOpacity style={styles.passwordButton} onPress={showPassword}>
      <Text style={[styles.showButtonText, styles.baseText]}>Показати</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.baseContainer}>
        <ImageBackground
          source={require("../assets/images/background.png")}
          resizeMode="cover"
          style={styles.background}
        />
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.formContainer}>
            <View style={styles.userImageContainer}>
              <Image />
              <TouchableOpacity style={styles.buttonAdd}>
                <Image
                  style={styles.buttonAddImage}
                  source={require("../assets/images/plus.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Реєстрація</Text>

            <View style={[styles.innerContainer, styles.inputContainer]}>
              <Input
                value={formData.login}
                placeholder="Логін"
                onTextChange={(text) => handleChange("login", text)}
              />
              <Input
                value={formData.email}
                placeholder="Адреса електронної пошти"
                onTextChange={(text) => handleChange("email", text)}
              />
              <Input
                value={formData.password}
                placeholder="Пароль"
                onTextChange={(text) => handleChange("password", text)}
                rightButton={showButton}
                otherStyles={styles.positionRelative}
                secureTextEntry={isPasswordVisible}
              />
            </View>

            <View style={[styles.innerContainer, styles.buttonContainer]}>
              <Button onPress={onRegister}>
                <Text style={[styles.baseText, styles.loginButtonText]}>
                  Увійти
                </Text>
              </Button>

              <View style={styles.signUpContainer}>
                <Text style={[styles.showButtonText, styles.baseText]}>
                  Вже є акаунт?&nbsp;
                </Text>
                <TouchableOpacity onPress={onSignIn}>
                  <Text style={[styles.signUpButtonText, styles.baseText]}>
                    Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  innerContainer: {
    gap: 16,
  },
  inputContainer: {
    marginTop: 32,
  },
  buttonContainer: {
    marginTop: 42,
  },
  formContainer: {
    height: "65%",
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  userImageContainer: {
    position: "absolute",
    height: 120,
    width: 120,
    borderRadius: 16,
    left: SCREEN_WIDTH * 0.5 - 60,
    top: -60,
    backgroundColor: colors.light_gray,
  },
  buttonAdd: {
    position: "absolute",
    right: -12,
    bottom: 14,
    height: 24,
    width: 24,
    borderRadius: "50%",
    borderWidth: 1,
    borderColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddImage: {
    width: 16,
    height: 16,
    color: colors.orange,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 36,
    textAlign: "center",
    color: colors.black_primary,
  },
  baseText: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
  },
  showButtonText: {
    color: colors.blue,
  },
  loginButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  signUpButtonText: {
    color: colors.blue,
    textDecorationLine: "underline",
  },
  passwordButton: {
    position: "absolute",
    right: 16,
    top: 15,
  },
  positionRelative: {
    position: "relative",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
