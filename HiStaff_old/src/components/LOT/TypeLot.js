
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Picker
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const window = Dimensions.get('window');

const TypeLot = ({
  value,
  data,
  title,
  onChange = value
}) => (
  <View style={css.container}>
    <Text style={css.txt}>{title}</Text>
    <Picker
      style={css.selectOption}
      selectedValue={value}
      onValueChange={(value) => onChange(value)}
    >
      {
        data.map((item, index) => {
          return (
            <Picker.Item key={index} label={item.title} value={item.value} />
          )
        })
      }
    </Picker>
  </View>
)

{/* <ModalDropdown 
        defaultValue='Chọn'
        textStyle={{fontSize: 15, color: '#1f2a35'}}
        dropdownTextStyle={{fontSize: 15,}}
        options={data}
      /> */}

const css = StyleSheet.create({
  selectOption: {
    // backgroundColor: 'red',
    padding: 0
  },
  txt: {
    fontSize: 13,
    marginRight: 10,
    color: '#c2c4ca'
  },
  container: {
    // flexDirection: 'row', 
    // alignItems: 'center'
  },
  ctTypeLOT: {
    // borderWidth:  1,
    padding: 10,
    // flex: 1
  },
})

export default TypeLot;
  