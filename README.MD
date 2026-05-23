# SnackExpo 🍟☕

SnackExpo is a modern food/snack delivery mobile app built with **React Native + Expo**.
This project demonstrates advanced **React Navigation patterns**, authentication flow, nested navigators, deep linking, and reusable UI architecture.

---

## ✨ Features

* Onboarding flow with auto-sliding cards
* Authentication flow (Login / Register)
* Persistent login using AsyncStorage
* Bottom Tab Navigation
* Nested Stack Navigation
* Drawer Navigation
* Cart state management using Context API
* Restaurant detail & cart flow
* Orders badge support
* Dynamic theming (Light/Dark)
* Smooth screen transitions
* Deep linking support

---

## 🛠 Tech Stack

* React Native
* Expo
* React Navigation
* Context API
* AsyncStorage
* Expo Google Fonts
* TypeScript

---

## 📱 Navigation Structure

```txt
Root Stack
│
├── Auth Stack
│   ├── Onboarding
│   ├── Login
│   └── SignUp
│
└── Main Drawer
    │
    └── Bottom Tabs
        ├── Home Stack
        │   ├── Home
        │   ├── Restaurant Detail
        │   └── Cart
        │
        ├── Search
        ├── Orders
        |   ├── Order Details
        └── Profile
```

---

## 🔗 Deep Linking

```txt
snackexpo://restaurant/123
```

Opens the Restaurant Detail screen directly.

---

## 🚀 Run Locally

```bash
git clone https://github.com/Omkar-t06/snacks-Expo

cd snackexpo

npm install

npx expo start
```

---

## 📦 Main Features Implemented

* `navigate()`
* `replace()`
* `reset()`
* `goBack()`
* Nested Navigators
* Conditional Auth Navigation
* Drawer + Tabs Combination
* Persistent Auth State

---

## 📸 Screens

* Onboarding
* Login / Register
* Home
* Restaurant Detail
* Cart
* Orders
* Orders Detail
* Profile
* Drawer Menu

---

## Demo

<video width="640" height="360" controls>
  <source src="./assets/demo/demo-snack-expo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 👨‍💻 Author

**Omkar Tavva**
SnackExpo — Bite-Sized Delivery 🚀
