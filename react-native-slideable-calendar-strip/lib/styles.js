import { StyleSheet, Platform, Dimensions } from 'react-native';

// eslint-disable-next-line prefer-destructuring
const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  ctNext: {
    paddingHorizontal: 10
  },
  ctCalendar: {
    flexDirection: 'row',
  },
  container: {
    width,
    height: 30 + 30 + 50,
  },
  header: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerDate: {
    color: 'gray',
    fontSize: 13,
  },
  headerDateWeek: {
    color: '#3D6DCF',
    fontSize: 14,
  },
  headerGoTodayButton: {
    borderRadius: 10,
    width: 20,
    height: 20,
    backgroundColor: '#3D6DCF',
    position: 'absolute',
    top: 5,
    right: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 12,
    color: 'white',
  },
  itemContainer: {
    width: width / 7,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.1)',
  },
  itemWrapButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  itemDateText: {
    fontSize: 15,
    lineHeight: Platform.OS === 'ios' ? 19 : 15,
  },
  itemLunarText: {
    fontSize: 10,
  },
  itemBottomDot: {
    width: 4,
    left: 20,
    height: 4,
    bottom: 4,
    borderRadius: 2,
    position: 'absolute',
  },
});
