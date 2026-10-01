import { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  View 
} from 'react-native';

export default function App() {
  const [firstName, setFirstName] = useState<string>(''); 
  const [surname, setSurname] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [phoneNumber, setPhoneNumber] = useState<string>(''); 
  const [age, setAge] = useState<string>('');

  const handleSave = () => {

  };

  return (
    <View style={styles.container}>
      <Text>Registration</Text>
      <TextInput 
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        placeholder='First name'
        maxLength={30}
        inputMode='text'
      />

      <TextInput 
        value={surname}
        onChangeText={setSurname}        
        style={styles.input}
        placeholder='Surname'
        maxLength={30}
        inputMode='text'
      />

      <TextInput 
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='Email'
        maxLength={60}
        inputMode='email'
      />

      <TextInput 
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholder='Phone Number'
        maxLength={15}
        inputMode='tel'
      />

      <TextInput 
        value={age}
        onChangeText={setAge}
        style={styles.input}
        placeholder='Age'
        maxLength={3}
        inputMode='numeric'
      />

      <TouchableHighlight onPress={handleSave}>
        <Text>Submit</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});