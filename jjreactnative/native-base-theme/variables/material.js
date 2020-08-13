import color from "color";

import {Platform, Dimensions, PixelRatio} from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = "material";
const ios = ios;
const isIphoneX = ios && deviceHeight === 812 && deviceWidth === 375;

export default {
    platformStyle,
    platform,
    // AndroidRipple
    androidRipple: true,
    androidRippleColor: "rgba(256, 256, 256, 0.3)",
    androidRippleColorDark: "rgba(0, 0, 0, 0.15)",

    // Badge
    badgeBg: "#ED1727",
    badgeColor: "#fff",
    // New Variable
    badgePadding: ios ? 3 : 0,

    // Button
    btnFontFamily: ios ? "Roboto" : "Roboto_medium",
    btnDisabledBg: "#b5b5b5",
    btnDisabledClr: "#f1f1f1",

    //Android
    btnUppercaseAndroidText: true,

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: ios ? 0 : 5,
    CheckboxIconSize: ios ? 18 : 14,
    CheckboxIconMarginTop: ios ? undefined : 1,
    CheckboxFontSize: ios ? 21 : 18,
    DefaultFontSize: 17,
    checkboxBgColor: "#039BE5",
    checkboxSize: 20,
    checkboxTickColor: "#fff",

    // Segment
    segmentBackgroundColor: "#3F51B5",
    segmentActiveBackgroundColor: "#fff",
    segmentTextColor: "#fff",
    segmentActiveTextColor: "#3F51B5",
    segmentBorderColor: "#fff",
    segmentBorderColorMain: "#3F51B5",

    // New Variable
    get defaultTextColor() {
        return this.textColor;
    },

    get btnPrimaryBg() {
        return this.brandPrimary;
    },
    get btnPrimaryColor() {
        return this.inverseTextColor;
    },
    get btnInfoBg() {
        return this.brandInfo;
    },
    get btnInfoColor() {
        return this.inverseTextColor;
    },
    get btnSuccessBg() {
        return this.brandSuccess;
    },
    get btnSuccessColor() {
        return this.inverseTextColor;
    },
    get btnDangerBg() {
        return this.brandDanger;
    },
    get btnDangerColor() {
        return this.inverseTextColor;
    },
    get btnWarningBg() {
        return this.brandWarning;
    },
    get btnWarningColor() {
        return this.inverseTextColor;
    },
    get btnTextSize() {
        return ios ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
    },
    get btnTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get btnTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },

    buttonPadding: 6,

    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: "#fff",

    // Color
    brandPrimary: "#fff",
    brandInfo: "#fff",
    brandSuccess: "#5cb85c",
    brandDanger: "#d9534f",
    brandWarning: "#f0ad4e",
    brandSidebar: "#252932",
    brandDark: "#000",
    brandLight: "#f4f4f4",

    // Font
    fontFamily: "Roboto",
    fontSizeBase: 15,

    get fontSizeH1() {
        return this.fontSizeBase * 1.8;
    },
    get fontSizeH2() {
        return this.fontSizeBase * 1.6;
    },
    get fontSizeH3() {
        return this.fontSizeBase * 1.4;
    },

    // Footer
    footerHeight: isIphoneX ? 89 : 55,
    footerDefaultBg: "#fff",
    footerPaddingBottom: isIphoneX ? 34 : 0,

    // FooterTab
    tabBarTextColor: "#b3c7f9",
    tabBarTextSize: ios ? 14 : 11,
    activeTab: "#fff",
    sTabBarActiveTextColor: "#fff",
    tabBarActiveTextColor: "#fff",
    tabActiveBgColor: undefined,

    // Tab
    tabDefaultBg: "#fff",
    topTabBarTextColor: "#b3c7f9",
    topTabBarActiveTextColor: "#fff",
    topTabActiveBgColor: undefined,
    topTabBarBorderColor: "#fff",
    topTabBarActiveBorderColor: "#fff",

    // Header
    toolbarBtnColor: "#fff",
    toolbarDefaultBg: "#fff",
    toolbarHeight: ios ? (isIphoneX ? 88 : 64) : 56,
    toolbarIconSize: ios ? 20 : 22,
    toolbarSearchIconSize: ios ? 20 : 23,
    toolbarInputColor: "#fff",
    searchBarHeight: ios ? 30 : 40,
    searchBarInputHeight: ios ? 30 : 50,
    toolbarInverseBg: "#222",
    toolbarTextColor: "#fff",
    toolbarDefaultBorder: "#fff",
    iosStatusbar: "dark-content",
    androidStatusbar: "dark-content",
    androidStatusBarColor: 'red',
    get statusBarColor() {
        return color(this.toolbarDefaultBg)
            .darken(0.2)
            .hex();
    },

    // Icon
    iconFamily: "Ionicons",
    iconFontSize: ios ? 30 : 28,
    iconMargin: 7,
    iconHeaderSize: ios ? 29 : 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: "#D9D5DC",
    inputSuccessBorderColor: "#2b8339",
    inputErrorBorderColor: "#ed2f2f",

    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return "#575757";
    },

    inputGroupMarginBottom: 10,
    inputHeightBase: 50,
    inputPaddingLeft: 5,

    get inputPaddingLeftIcon() {
        return this.inputPaddingLeft * 8;
    },

    // Line Height
    btnLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 27,
    lineHeightH3: 22,
    iconLineHeight: ios ? 37 : 30,
    lineHeight: ios ? 20 : 24,

    // List
    listBg: "#fff",
    listBorderColor: "#c9c9c9",
    listDividerBg: "#f4f4f4",
    listBtnUnderlayColor: "#DDD",

    // Card
    cardBorderColor: "#ccc",

    // Changed Variable
    listItemPadding: ios ? 10 : 12,

    listNoteColor: "#808080",
    listNoteSize: 13,

    // Progress Bar
    defaultProgressColor: "#E4202D",
    inverseProgressColor: "#1A191B",

    // Radio Button
    radioBtnSize: ios ? 25 : 23,
    radioSelectedColorAndroid: "#5067FF",

    // New Variable
    radioBtnLineHeight: ios ? 29 : 24,

    radioColor: "#7e7e7e",

    get radioSelectedColor() {
        return color(this.radioColor)
            .darken(0.2)
            .hex();
    },

    // Spinner
    defaultSpinnerColor: "#45D56E",
    inverseSpinnerColor: "#1A191B",

    // Tabs
    tabBgColor: "#F8F8F8",
    tabFontSize: 15,
    tabTextColor: "#222222",

    // Text
    textColor: "#000",
    inverseTextColor: "#fff",
    noteFontSize: 14,

    // Title
    titleFontfamily: ios ? "Roboto" : "Roboto_medium",
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: "#FFF",

    // New Variable
    titleFontColor: "#FFF",

    // Other
    borderRadiusBase: 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,

    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    dropdownBg: "#000",
    dropdownLinkColor: "#414142",
    inputLineHeight: 24,
    jumbotronBg: "#C9C9CE",
    jumbotronPadding: 30,
    deviceWidth,
    deviceHeight,
    isIphoneX,

    // New Variable
    inputGroupRoundedBorderRadius: 30,
};
