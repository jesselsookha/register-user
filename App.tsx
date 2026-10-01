import { useState } from 'react'; 
import { 
  FlatList,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  View 
} from 'react-native';

// ---------------------------------------
// creating a user-defined component

type UserProps = { 
  fn: string; // abbrerviated to help differentiate variable names
  sn: string; 
  em: string; 
  pn: string; 
  ag: string;
};

function UserCard({fn, sn, em, pn, ag} : UserProps) {
  return(
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{fn} {sn}</Text>
        <Text style={styles.cardAge}>{ag}</Text>
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.cardText}>{em}</Text>
        <Text style={styles.cardLabel}>Phone</Text>
        <Text style={styles.cardText}>{pn}</Text>
      </View>
    </View>
  );
}
// ---------------------------------------

// structure for the user object 
type Registration = {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  age: string;
};

export default function App() {
  const [firstName, setFirstName] = useState<string>(''); 
  const [surname, setSurname] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [phoneNumber, setPhoneNumber] = useState<string>(''); 
  const [age, setAge] = useState<string>('');

  // array of objects ("registered users") 
  const [registeredUsers, setRegisteredUsers] = useState<Registration[]>([]);

  const handleSave = () => {
    // Initial Validation
    if (
      firstName.trim() === '' ||
      surname.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() === '' ||
      age.trim() === ''
    ) {
      console.log('Please complete all fields');
      return;
    }

    // More validation of data needs to be performed

    // Create new registration object
    const newUser: Registration = {
      id: Date.now().toString(),
      firstName: firstName.trim(),
      surname: surname.trim(),
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      age: age.trim(),
    };

    // Add object to array
    setRegisteredUsers(prevUsers => [...prevUsers, newUser]);

    //console.log('Registration saved:', registeredUsers);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
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

      <FlatList 
        data={registeredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({item} : {item : Registration}) => 
          <UserCard
            fn={item.firstName}
            sn={item.surname}
            em={item.email}
            pn={item.phoneNumber}
            ag={item.age}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#fff', 
    padding: 10, 
    alignItems: 'center', 
  }, 
  errMessage: { 
    fontSize: 12, 
    color: '#ff0000', 
    fontWeight: 'bold', 
    height: 20, 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
  }, 
  input: { 
    height: 35, 
    margin: 12, 
    borderWidth: 1, 
    padding: 10, 
  }, 
  button: { 
    height: 40, 
    margin: 10, 
    padding: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5, 
    backgroundColor: '#333', 
  }, 
  buttonText: { 
    fontSize: 18, 
    color: '#fefefe', 
  }, 
  card: { 
    width: '95%', 
    backgroundColor: '#EAF4FF', 
    borderRadius: 8, 
    marginVertical: 5, 
    padding: 10, 
    borderLeftWidth: 5, 
    borderLeftColor: '#1976D2', 
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 6, 
  },
  cardName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1A1A1A', 
    flex: 1, 
  },
  cardAge: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#1976D2', 
    backgroundColor: '#D6EBFF', 
    paddingHorizontal: 8, 
    paddingVertical: 3, 
    borderRadius: 10, 
  },
  cardDetails: { 
    borderTopWidth: 1, 
    borderTopColor: '#C9DFF5', 
    paddingTop: 6, 
  },
  cardLabel: { 
    fontSize: 10, 
    fontWeight: 'bold', 
    color: '#1976D2', 
    marginTop: 2, 
  },
  cardText: { 
    fontSize: 13, 
    color: '#333', 
    marginBottom: 3, 
  },
});