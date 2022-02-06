import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  currentPrice: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 1,
  },
  name: {
    color: 'white',
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal:10
  },
  priceChange: {
    color: 'white', 
    fontSize: 17, 
    fontWeight: '500'
  },
  input:{
    flex:1,
    width:120,
    height:50,
    margin:12,
    borderBottomWidth:2,
    borderBottomColor:'#fff',
    padding:10,
    fontSize:16,
    color:"#fff"
  },
  filtersContainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'#2b2b2b',
    paddingVertical:5,
    borderRadius:5,
    marginVertical:10
  }
});
