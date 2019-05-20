import LinearGradient from 'react-native-linear-gradient'
import React,{Component } from 'react'
import {ListItem} from  'react-native-elements'
import {Text, StyleSheet, Dimensions, FlatList, View,Image, Alert, TextInput, ScrollView} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
import { TouchableOpacity } from 'react-native-gesture-handler';
import  {DeviceEventEmitter} from 'react-native';

class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={users:[],text:'',isSelect:-1};
  }
  static navigationOptions = {
    header:null,
  };

    componentDidMount(){
      fetch('https://api.github.com/users')
        .then( response => response.json())
        .then( data => this.setState({
          users:data
        }))
        .catch( error => alert(error) )
        DeviceEventEmitter.addListener("details", (callback) => {
          this.setState({users:callback})
      })
    }

    render(){
      return(
        <View style={styles.container}>
          <LinearGradient
            start={{ x : 0.0, y : 0.0 }} end={{ x : 1.0, y : 1.0 }}
            locations={[0,0.3,0.5,0.8,1]}
            colors={['#252652', '#4A3560', '#815D67', '#880A47', '#650142']}
            // colors={['#252652', '#815D67']}
            style={styles.viewTitle}>
            
              <Text style={styles.textTitle}>
                  Users Of Github
              </Text>
          </LinearGradient>
          <FlatList 
          renderItem = {this._renderItem}
          data = {this.state.users}
          getItemLayout={(data,index)=>({length:100,offset:(100+2)*index,index})}
          keyExtractor={(item,index)=>String(index)}
          ItemSeparatorComponent={this._itemSeparator}
          >
          </FlatList>
      </View>
      )
    }
    _renderItem=(item)=>(
      <View style={styles.itemBox}>
        
      <ListItem
        title={item.item.login}
        subtitle={item.item.type}
        leftAvatar={{rounded:true,source: item.item.avatar_url && { uri: item.item.avatar_url }}}
        style={styles.itemBox}
        // rightTitle='>'
        rightTitle=
        {
          <TouchableOpacity 
            onPress={()=>{
              this.props.navigation.navigate('Details',
                {param1:this.state.users,
                   param2:item.index,
                    }
                    )}} 
            style={styles.rightButton}>
            <Text style={fontSize=30}>></Text>
          </TouchableOpacity>
        }
        onLongPress={()=>{Alert.alert('Warning','Do you want to delete it?',
          [
            {text:'No'},
            {text:'Yes',onPress:()=>{
              if(this.state.users.length==1){
                    this.setState({
                      users:[]
                    })
                  }
              else{
                this.state.users.splice(item.index,1);
                this.setState(
                  {users:this.state.users});}
            }}
          ])
        }
        }
        >
        </ListItem>
      </View>
    )
    _itemSeparator(){
      return(
      <View
        style={{
        height: 1,
        width: "90%",
        backgroundColor: "#CED0CE",
        marginLeft: "14%"
        }}
        />
      )
    }
    // _passToDetails(index){

    // }
}

class DetailsScreen extends React.Component {
  constructor(props){
    super(props)
    // const{navigation}= this.props
    this.state={
      user:this.props.navigation.getParam('param1'),
      order:this.props.navigation.getParam('param2'),
      person:[],
      isSelect:-1,
      following:[],
      following_url:'',
    }
  }
  componentDidMount(){
    fetch(this.state.user[this.state.order].url)
      .then( response => response.json())
      .then( data => this.setState({
        person:data
      }))
      .catch( error => alert(error) )
      let str=this.state.user[this.state.order].following_url;
      let s='{/other_user}';
      let len=str.length-s.length;
      let retstr=str.substr(0,len);
      // let retstr='https://api.github.com/users/mojombo/following';
      // this.setState({following:retstr});
      fetch(retstr)
        .then( response => response.json())
        .then( data => this.setState({
          following:data
        }))
        .catch( error => alert(error) )
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#4A3560',
    },
    headerHintColor:'#815D67'
  };
  render(){
    return (
      <View style={styles.containerDetails}>
        <View style={styles.boxView1}>
          <View  style={styles.imgBackground}>
          <Image source={{uri:this.state.user[this.state.order].avatar_url}} style={styles.imgStyle}></Image>
          </View>
        </View>
        <View style={styles.boxView2}>
          
            <Text style={styles.LoginText}>{this.state.user[this.state.order].login}</Text>
            <TouchableOpacity onPress={this.changeIsSelect}>
              <Image source={require('./edit.png')} style={{width:20, height:20, backgroundColor:"transparent"}} ></Image>
            </TouchableOpacity>
            {this.state.isSelect===-1? null:
            <TextInput style={styles.inputText} autoFocus={true} onEndEditing={(event)=> this.changeLogin(this.state.order,event.nativeEvent.text)}></TextInput>
            }
            <Text style={styles.typeText}>{this.state.user[this.state.order].type}</Text>
            <View style={styles.infoView}>
              {this.state.person.name===null ? <View/>:<Text style={styles.nameText}>name:{this.state.person.name}</Text>}
              {this.state.person.company===null ? <View/>:<Text style={styles.nameText}>company:{this.state.person.company}</Text>}
              {this.state.person.location===null ? <View/>:<Text style={styles.nameText}>location:{this.state.person.location}</Text>}
              {this.state.person.blog===null ? <View/>:<Text style={styles.nameText}>blog:{this.state.person.blog}</Text>}
              {this.state.person.bio===null ? <View/>:<Text style={styles.nameText}>bio:{this.state.person.bio}</Text>}
              {this.state.person.email===null ? <View/>:<Text style={styles.nameText}>email:{this.state.person.email}</Text>}
              {this.state.person.hireable===null ? <View/>:<Text style={styles.nameText}>hireable:{this.state.person.hireable}</Text>}
              {/* <Text style={styles.nameText}>hireable:{this.state.following[0].login}</Text> */}

            {/* <View> */}
              {this.state.following.map((e,i)=> i<9? <Text key={i} style={styles.ok}>{e.login}</Text>:null)}
            {/* </View> */}

            </View>
        </View>
        <View style={styles.boxView3}>
            <Text style={styles.bottomText}>{this.state.user[this.state.order].url}</Text>
        </View>
      </View>
    )
  }
  changeIsSelect=()=>{
    let is=1;
    this.setState({isSelect:is});
  }
  changeLogin=(index,text)=>{
    let cc=[...this.state.user]; 
    let is=-1;
    cc[index].login=text;
    cc[index].url="https://api.github.com/users/";
    cc[index].url+=text;
    this.setState({user:cc,isSelect:is});
    DeviceEventEmitter.emit('details',cc);
  }

}
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    // Following: FollowingScreen,
  },
  {
    initialRouteName: "Home"
    // initialRouteName:'Details'
  },
);
const Width=Dimensions.get('window').width;
const Height=Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDetails:{
    width:Width,
    height:Height,
    backgroundColor:'#650142',
    flexDirection:'column',
    // justifyContent:'space-around'
  },
  textTitle:{
    fontSize:20,
    color:'white',
  },
  viewTitle:{
    width:Dimensions.get('window').width,
    height:100,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'black',
  },
  itemBox:{
    // backgroundColor:'white',
    // height:100,
    width:Dimensions.get('window').width-20,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
  },
  imgStyle:{
    width:150,
    height:150,
    borderRadius:250,
  },
  imgBackground:{
    height:180,
    width:180,
    borderRadius:250,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#815D67'
  },
  boxView1:{
    justifyContent:'center',
    alignItems:'center',
    width:Width,
    height:Height*0.3,
    // backgroundColor:'orange'
    // marginBottom:10,
  },
  boxView2:{
    justifyContent:'flex-start',
    alignItems:'center',
    width:Width,
    height:Height*0.5,
    // backgroundColor:'yellow'
  },
  boxView3:{
    justifyContent:'flex-start',
    alignItems:'center',
    width:Width,
    height:Height*0.1,
    // backgroundColor:'red'
  },
  bottomText:{
    fontSize:15,
    color:'#CB81B1'
  },
  LoginText:{
    fontSize:36,
    color:'#CB81B1'
  },
  typeText:{
    fontSize:20,
    color:'#815D67'
  },
  editImg:{
    width:20,
    height:20,
    // marginBottom:10
  },
  inputText:{
    marginTop:10,
    width:50,
    height:50,
  },
  infoView:{
    justifyContent:'center',
    alignItems:'center'
  },
  nameText:{
    color:'#CB81B1',
    fontSize:15,
  },
  ok:{
    fontSize:15,
    color:'#CB81B1'
  }
});
export default createAppContainer(AppNavigator);
//可以显示渐变，列表，页面跳转