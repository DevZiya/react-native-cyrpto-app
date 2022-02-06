import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    marginHorizontal: 5,
  },
  rankContainer:{
      backgroundColor:"#585858",
      paddingHorizontal:5,
      paddingVertical:2,
      borderRadius:5
  }
});
