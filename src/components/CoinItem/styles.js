import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:3
      },
      text: {
        color: '#fff',
        marginRight: 5,
      },
      coinContainer: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        padding: 15
      },
      rankContainer:{
        backgroundColor:'#585858',
        paddingHorizontal:5,
        borderRadius:5,
        marginRight:5
      },
      rank:{
        color:'white',
        fontWeight:'bold',
        
      }
})