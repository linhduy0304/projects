import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff'
  },
  pickerHeader: {
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    height: 38,
    paddingHorizontal: 60
  },
  pickerHeaderButton: {
    flex: 1,
    justifyContent: 'center'
  },
  pickerTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000'
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  datePickerIOS: {
    flex: 1
  },
  picker1: {
    flex: 5,
    justifyContent: 'center',
  },
  picker1Item: {
    textAlign: 'left'
  },
  picker2: {
    flex: 3.5,
    justifyContent: 'center'
  },
  picker3: {
    flex: 2,
    justifyContent: 'center',
  },
  picker3Item: {
    textAlign: 'center'
  }
});
