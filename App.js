
import React, { Component } from 'react';
import SwipeRow from './SwipeRow'
import {
StyleSheet,
View,
Image,
Dimensions,
TouchableOpacity,
FlatList,
Text,
Button,
Alert,
ToastAndroid,
TouchableHighlight,
TextInput,
LayoutAnimation,
Animated
} from 'react-native';

var users = [
  {   key:'1',
      login: 'mojomb',
      avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
      name: 'Tom Preston-Werner',
      blog: 'http://tom.preston.werner.com',
      location:'San Francisco',
  },
  {   key:'2',
      login: 'defunkt',
      avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
      name: 'Chris Wanstrath',
      blog: 'http://chriswanstrath.com/',
      location:'San Francisco',
  },
  {   key:'3',
      login: 'pjhyett',
      avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
      name: 'PJ Hyett',
      blog: 'https://hyett.com',
      location:'San Francisco',
  },
  {   key:'4',
      login: 'wycats',
      avatar_url: 'https://avatars0.githubusercontent.com/u/4?v=4',
      name: 'Yehuda Katz',
      blog: 'http://yehudakatz.com',
      location:'San Francisco',
  },
  {   key:'5',
      login: 'ezmobius',
      avatar_url: 'https://avatars0.githubusercontent.com/u/5?v=4',
      name: 'Ezra Zygmuntowicz',
      blog: 'http://stuffstr.com',
      location:'San Francisco',
  },
  {   key:'6',
      login: 'ivey',
      avatar_url: 'https://avatars0.githubusercontent.com/u/6?v=4',
      name: 'Micheal D. Ivey',
      blog: 'http://gweezlebur.com',
      location:'Bay Minette, AL',
  },
  {   key:'7',
      login: 'evanphx',
      avatar_url: 'https://avatars0.githubusercontent.com/u/7?v=4',
      name: 'Evan Phoenix',
      blog: 'http://blog.fallingsnow.net',
      location:'Los Angeles, CA',
  },
  {   key:'8',
      login: 'vanpelt',
      avatar_url: 'https://avatars0.githubusercontent.com/u/17?v=4',
      name: 'Chris Van Pelt',
      blog: 'vandev.com',
      location:'San Francisco',
  },
  {   key:'9',
      login: 'wayneeseguin',
      avatar_url: 'https://avatars0.githubusercontent.com/u/18?v=4',
      name: 'wayne E. Seguin',
      blog: '',
      location:'Buffalo, NY',
  },  
  {   key:'10',
      login: 'brynary',
      avatar_url: 'https://avatars0.githubusercontent.com/u/19?v=4',
      name: 'Bryan Helmkamp',
      blog: 'http://codeclimate.com',
      location:'New York City',
  },
  {   key:'11',
      login: 'kevinclark',
      avatar_url: 'https://avatars0.githubusercontent.com/u/20?v=4',
      name: 'Kevin Clark',
      blog: 'http://glu.ttono.com',
      location: null,
  },
]

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={data:users,text:'',isSelect:-1}
  }
  itemTap=(index)=>{
    let select=index;
    if(this.state.isSelect===index){
      select=-1;
    }
  LayoutAnimation.easeInEaseOut();
  this.setState({
    isSelect:select
  })
}
     change=(index,text,f)=>{
      let cc=[...this.state.data]
      if(f===1)
        cc[index].name=text;
      else if(f===2)
        cc[index].blog=text;
      else if(f==3)
        cc[index].location=text;
      else
        cc[index].login=text;
      this.setState({data:cc})
     }

      render(){
        return(
          <View style={styles.view}>
             <FlatList
                  data={this.state.data}
                  renderItem={this._renderItem}
                  onEndReachedThreshold={0.1}
                  onEndReached={this._onload}
                  onRefresh={this.refreshing}
                  refreshing={false}
                  getItemLayout={(data,index)=>({length: 100, offset: (100+2) * index, index})}
                  ItemSeparatorComponent={()=><View style={{width:Dimensions.get('window').width,height:2,backgroundColor:'black'}}></View>}>
              </FlatList>
          </View>
          );
      }
_renderItem = (item) => {
        return (
 <View style={styles.container}>
  <SwipeRow>
    <TouchableOpacity style={styles.delTextContainer} onPress={()=>{Alert.alert ('Warnning:','Do you want to delete it?',
                [
                      {text:'No'},
                      {text:'Yes',onPress:()=>{
                          this.state.data.splice(parseInt(item.index),1);
                          for(let i=0;i<this.state.data.length;i++)
                            this.state.data[i].key=(i+1).toString();
                          this.setState(
                            {data:this.state.data});
                            ToastAndroid.show('Delete.',ToastAndroid.SHORT);
                          }
                      }
                ])}}> 
                  <Text style={styles.text}>DELETE</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'column',width:Dimensions.get('window').width,backgroundColor:'white'}}>    
        <View style={styles.view}>
          <Image style={styles.image} source={{uri:item.item.avatar_url}}/>
            <View style={styles.text}>
              <Text style={styles.text}>{item.item.login}</Text> 
            </View>
            <View style={flex=2}>
              <TouchableOpacity style={{height:120,backgroundColor:'black'}} onPress={()=>{this.itemTap(item.index)}}>
                <Text style={[styles.text,{color:'white'}]}> More</Text>
              </TouchableOpacity>
            </View>
         </View>
      
      {this.state.isSelect === item.index ?
        <View style={styles.textbox}>
          <TextInput style={styles.textinput} placeholder={'Name: '+item.item.name} onEndEditing={(event)=> this.change(item.index,event.nativeEvent.text,1)}></TextInput>
          <TextInput style={styles.textinput} placeholder={'Blog: '+item.item.blog} onEndEditing={(event)=> this.change(item.index,event.nativeEvent.text,2)}></TextInput>
          <TextInput style={styles.textinput} placeholder={'Location: '+item.item.location} onEndEditing={(event)=> this.change(item.index,event.nativeEvent.text,3)}></TextInput>
          <TextInput style={styles.textinput} placeholder={'Login: '+item.item.login} onEndEditing={(event)=> this.change(item.index,event.nativeEvent.text,4)}></TextInput>
          
        </View>:null
      }
      
      </View>
    </SwipeRow>
  </View>
        );
    }

    
    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
        },1500)
    }
    refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            ToastAndroid.show('refreshed',ToastAndroid.SHORT);
        },1500)
    }
}
  const styles=  StyleSheet.create({

    text: {
        flex:1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize:20
    },

    view:{
        flex:1,
        flexWrap:'wrap',
        flexDirection:'row',
        backgroundColor:'white',
    },

    image:{
        flex:1,
        width:150,
        flexWrap:'wrap',
    },

　　textbox:{
        flexDirection: 'column',
        alignItems:'center',
        width:Dimensions.get('window').width,
        borderRadius:5,
        height:80,
        flex:1,
    },

    textinput:{
        height:20,
        padding:0,
    },

    delTextContainer:{
        width: 100,
        height:120,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },

    container:{
      width:Dimensions.get('window').width,
      backgroundColor:'pink',
    },
})
