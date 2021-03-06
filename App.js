import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import UserListItem from './src/componets/User/UserListitem';

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

  header: {
    fontSize: 20,
    textAlign: 'center',
    padding: 2,
    margin : 20,
  },
  separador: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
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
    .then(response => alert('Infromacion actualiazda'))
    .catch(error => console.error('Error:', error));
};

const App = () => {
  const [users,setUser] = useState([]);
  const [accountNumber, setAccountNumber] = useState();
  const [phone, setPhone] = useState();
  const [hobby, setHobby] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');
  const [bornCity, setBornCity] = useState('');
  //UseEffect consulta API
  useEffect(() =>{
    const request = async () => {
      const resp = await fetch("https://calculadora-server.herokuapp.com/alumns");
      const data = await resp.json();
      console.log(data)
      setUser(data);
  };
  request()
  },[]);
  return (
    <View style={{height: "100%"}}>
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
      <FlatList 
        data={users}
        renderItem={({item}) => <UserListItem user={item}/>}
        keyExtractor={item => item._id}
        ListHeaderComponent = {() => <Text style={styles.header}>Lista de usuarios</Text>}
        ItemSeparatorComponent = {() => <View style={styles.separador}></View>}
      />
    </View>
  );
};

export default App;
