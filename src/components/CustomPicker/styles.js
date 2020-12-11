import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    contentCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mainHeading: {
        fontSize: 45,
        fontWeight: "bold",
    },
    subHeading: {
        fontSize: 30,
        fontWeight: "bold",
    },
    dashboardCart: {
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get('window').width * 0.45,
        height: 250,
        borderRadius: 30,
    },
    contentMiddleLeft: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    themeBackColor: {
        backgroundColor: "#5244a0",
    },
    themeBorderColor: {
        borderColor: "#5244a0",
    },
    themeColor: {
        color: "#5244a0",
    },
    themeBorderColor: {
        borderColor: "#5244a0",
    },
    whiteColor: {
        color: "white",
    },
    secondaryButton: {
        backgroundColor: "#FDD656",
        borderRadius: 10,
    },
    primaryButton: {
        backgroundColor: "#5244a0",
        borderRadius: 10,
    },
    borderRadius10: {
        borderRadius: 10,
    },
    borderRadius15: {
        borderRadius: 15,
    },
    borderRadius20: {
        borderRadius: 20,
    },
    primaryText: {
        color: "#5244a0",
    },
    primaryinnerButton: {
        borderRadius: 10,
        borderColor: "#5244a0"
    },
    secondaryColor: {
        color: "#FDD656",
    },
    greyColor: {
        color: "#a3a8ae",
    },
    greyBackground: {
        backgroundColor: "#a3a8ae",
    },
    lightgreyColor: {
        color: "#f5f5f5",
    },
    lightgreyBorder: {
        borderColor: "#f5f5f5",
    },
    buttonRadius: {
        borderRadius: 10,
    },
    lightgreyBackground: {
        backgroundColor: "#f5f5f5",
    },

    rowInputtext: {
        marginTop: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    inputsideText: {
        fontSize: 17,
        color: "black",
        marginTop: -4,
        marginLeft: 7,
    },
    cardstyle: {
        width: "90%",
        borderRadius: 15,
        minWidth: "30%",
        minHeight: 110,
    },
    cardinnerView: {
        width: "50%",
        marginTop: 20,
        alignSelf: "center",
    },

    searchInput: {
        backgroundColor: "#f5f5f5",
        borderColor: "transparent",
        borderRadius: 10,
    },
    contentHeading: {
        alignSelf: "center",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 25,
    },
    plusText: {
        fontSize: 35,
        color: "white",
        //marginLeft: 7,
    },
    plusButton: {
        width: 35,
        height: 35,
        backgroundColor: "#FDD656",
        borderRadius: 100,
    },

    //for modal use this
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(192,192,192,0.7)",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalCrossbutton: {
        alignSelf: "flex-end",
        marginTop: -20,
        marginBottom: 20,
        backgroundColor: "white",
        elevation: 0.5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
    },
    modalHeading: {
        fontSize: 25,
        fontWeight: "bold",
    },
    underlineModal: {
        textDecorationLine: "underline",
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold",
    },

    modalBottomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(192,192,192,0.7)",
    },
    modalViewBottom: {
        backgroundColor: "white",
        padding: 35,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        width: "100%", margin: 0,
        position: "absolute", bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //modal



    leftRightSpace: {
        width: "95%",
    },
    //select activity
    activityCart: {
        justifyContent: "center",
        width: "99%",
        height: 150,
        marginTop: 10,
        marginLeft: 10, marginRight: 10,
        paddingLeft: 20, borderRadius: 30,
    },
    selectActivityLogo: {
        width: 58,
        height: 58,
        borderRadius: 20
    },
    activityCartText: {
        fontWeight: "bold", marginTop: 15, marginLeft: 10
    },
    activityCartRound: {
        position: "absolute",
        right: 22, marginTop: 20,
        width: 12,
        height: 12,
        borderRadius: 12,
    },
    RoundCircle: {
        alignSelf: "center",
        width: 10,
        height: 10,
        borderRadius: 12,
    },
    RoundCircleCount: {
        width: 25, height: 25, borderRadius: 30, justifyContent: "center"

    },
    subHeadingGrey: {
        fontSize: 20, fontWeight: "bold", color: "#a3a8ae"
    },
    fontSize20: {
        fontSize: 20
    }
    ,
    fontSize17Bold: {
        fontSize: 17, fontWeight: "bold"
    },
    fontSize13Bold: {
        fontSize: 13, fontWeight: "bold"
    },
    fontSize17: {
        fontSize: 17
    },
    fontSize25Bold: {
        fontSize: 25, fontWeight: "bold"
    },
    fontSize20Bold: {
        fontSize: 20, fontWeight: "bold"
    },
    rightCornerIcon: {
        alignSelf: "flex-end",
        position: "absolute", right: 15
    },
    whiteShadow: {
        shadowColor: "#000",
        elevation: 6,
    },
    footerEnd: {
        margin: 10
    },

    feedingHistoryCart: {
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        width: "100%",
        height: 50,
        marginTop: 10,

        paddingLeft: 20,
        borderRadius: 15,
    },
    DateCart: {
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        width: "100%",
        height: 50,
        marginTop: 10,
        paddingLeft: 20,
        borderRadius: 15,
    },

    plusIconEnd: {
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 20,
        right: 10,
        height: 70,
        backgroundColor: '#FDD656',
        borderRadius: 100,
    },
    //View Profile
    curveTop: {
        borderColor: "white", backgroundColor: "white",
        borderTopLeftRadius: 40, borderTopEndRadius: 40
    },
    leftRight10px: {
        marginLeft: 10,
        marginRight: 10
    },
    leftRight15px: {
        marginLeft: 15,
        marginRight: 15
    },
    leftRight20px: {
        marginLeft: 20,
        marginRight: 20
    },
    leftRight25px: {
        marginLeft: 25,
        marginRight: 25
    },
    leftRight30px: {
        marginLeft: 30,
        marginRight: 30
    },
    fontSize15Bold: {
        fontSize: 15, fontWeight: "bold"
    },
    margin10top: {
        marginTop: 10
    },
    margin12top: {
        marginTop: 12
    },
    margin13top: {
        marginTop: 13
    },
    margin14top: {
        marginTop: 14
    },
    margin15top: {
        marginTop: 15
    },
    galleryImage: {
        width: 80,
        height: 80,
        borderRadius: 20
    },


    HealthRecordCart: {
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        height: 70,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
    },
    HealthCartDropdown: {
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        marginTop: -12,
        padding: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },

    VaccineBottom: {
        backgroundColor: "white",
        padding: 35,
        borderTopEndRadius: 30,
        borderTopLeftRadius: 30,
        width: "100%", margin: 0,
        position: "absolute", bottom: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    VacinationHistoryCart: {
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        width: "100%",
        height: 70,
        marginTop: 10,
        paddingLeft: 20,
        borderRadius: 15,
    },

    FamilyTreeCart: {
        backgroundColor: "white",
        elevation: 4,
        justifyContent: "center",
        height: 100,
        marginTop: 10,
        paddingLeft: 20,
        borderRadius: 15,
    },


    //QR SCAN
    barcontainer: {
        flex: 1,
        position: 'relative',
    },
    baroverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    unfocusedContainer: {
        flex: 1,
        backgroundColor: 'rgba(112,92,154,0.7)',
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 1.5,
    },
    focusedContainer: {
        flex: 8,
    },
    rescanIconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //////////

    searchbutton: {
        width: 35, height: 35,
        alignSelf: "center", marginRight: 10
    },

    messageImageBackground: {
        backgroundColor: "white",
        borderRadius: 30, width: 50, height: 50,
        alignItems: "center", justifyContent: "center"
    },

    messageCart: {
        elevation: 1,
        backgroundColor: "white",
        justifyContent: "center",
        marginBottom: 10,
        marginLeft: 20,
        height: 50,
        paddingRight: 68,
        paddingLeft: 10,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        height: 110,
    },
    selectAnimalCart: {
        backgroundColor: "white",
        // elevation: 4,
        width: "100%",
        height: "85%",
        marginTop: 10,
        paddingLeft: 20,
        paddingStart: 135,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    selectAnimalCart2: {
        backgroundColor: "white",
        // elevation: 4,
        width: "65%",
        height: "85%",
        marginTop: 10,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    Bottom10pxItems: {
        flex: 1, justifyContent: 'flex-end',
        marginBottom: 10
    },
    ItemsBorderTop: {
        backgroundColor: "white",
        minHeight: Dimensions.get('window').height * 0.9,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40
    },
    ItemBottomHeight: {
        minHeight: Dimensions.get('window').height * 0.12, justifyContent: "center"
    },
    ItemBottomHeightAbsolute: {
        minHeight: Dimensions.get('window').height * 0.1, justifyContent: "center"
    },
    Itemiconplus: {
        fontSize: 22, position: "absolute", right: 10, top: 15
    },
    Itemiconclose: {
        fontSize: 22, right: 8, top: 5
    },

    TopWhiteBorderShadow: {
        backgroundColor: "white", width: "100%",
        borderTopRightRadius: 35, borderTopLeftRadius: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    TopThemeBorder: {
        backgroundColor: "#5244a0", width: "100%",
        borderTopRightRadius: 35, borderTopLeftRadius: 35,
    },

    PurchaseHistoryCart: {
        borderWidth: 0.5,
        borderColor: "white",
        alignItems: "center",
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        width: "100%",
    },

    //sectionlist
    renderSectionHeader: {
        paddingLeft: 10, paddingVertical: 10, backgroundColor: "#5244a0", borderRadius: 10,
    },
    renderItem: {
        marginLeft: 10, paddingVertical: 10, marginBottom: 10
    },

    errorMsg: {
        color: "red", fontSize: 18, marginLeft: 3
    },

    imageSibling: {
        width: 102, height: 102, marginTop: 7, borderRadius: 10, marginLeft: 3
    }
});