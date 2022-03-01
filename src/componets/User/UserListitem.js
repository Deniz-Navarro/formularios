import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Divider
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 2,
    margin: 2,
    fontSize: 12
  },
});

export default function UserListItem({user}){
  return <View><Text style={styles.item}>{user.accountNumber} | {user.name} | {user.age} </Text></View>
}