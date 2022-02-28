import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  title: {
    fontSize: 25,
    textAlign: 'center',
  },
});

const onSubmit = (accountNumber, phone, hobby, favoriteFood, bornCity) => {
  const url = 'https://calculadora-server.herokuapp.com/alumns';
  const data = {
    accountNumber: parseInt(accountNumber),
    phone: parseInt(phone),
    hobby,
    favoriteFood,
    bornCity,
  };
  return fetch(url, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));
};

const App = () => {
  const [accountNumber, setAccountNumber] = useState();
  const [phone, setPhone] = useState();
  const [hobby, setHobby] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [bornCity, setBornCity] = useState('');
  return (
    <View>
      <Text style={styles.title}>Formulario</Text>
      <TextInput
        style={styles.input}
        value={accountNumber}
        onChangeText={a => {
          setAccountNumber(a);
        }}
        placeholder="Account Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={a => {
          setPhone(a);
        }}
        placeholder="Phone"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={hobby}
        onChangeText={a => {
          setHobby(a);
        }}
        placeholder="Hobby"
      />
      <TextInput
        style={styles.input}
        value={favoriteFood}
        onChangeText={a => {
          setFavoriteFood(a);
        }}
        placeholder="Favorite Food"
      />
      <TextInput
        style={styles.input}
        value={bornCity}
        onChangeText={a => {
          setBornCity(a);
        }}
        placeholder="Born city"
      />
      <Button
        title="Enviar datos"
        onPress={() => {
          onSubmit(accountNumber, phone, hobby, favoriteFood, bornCity);
        }}
      />
    </View>
  );
};

export default App;
