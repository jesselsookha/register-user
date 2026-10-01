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
  onDelete: () => void;
  onEdit: () => void;
};

function UserCard({fn, sn, em, pn, ag, onDelete, onEdit} : UserProps) {
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
      <View style={styles.cardActions}>
        <TouchableHighlight 
          style={styles.editButton} 
          onPress={onEdit}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.deleteButton} 
          onPress={onDelete}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableHighlight>
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

  const [errMsg, setErrMsg] = useState<string>('');

  // This state tells us whether we are editing an existing user.
  // null      = we are adding a new user
  // "value"   = we are editing the user whose id is "value"
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Small helper so the same form-reset logic is not duplicated
  const clearForm = () => {
    setFirstName('');
    setSurname('');
    setEmail('');
    setPhoneNumber('');
    setAge('');
  };

  const handleSave = () => {
    // Initial Validation
    if (
      firstName.trim() === '' ||
      surname.trim() === '' ||
      email.trim() === '' ||
      phoneNumber.trim() === '' ||
      age.trim() === ''
    ) {
      setErrMsg('Please complete all fields');
      return;
    }

    // More validation of data needs to be performed

    // Clear any previous error now that the data is valid
    setErrMsg('');

    if (editingUserId !== null) {
      // Edit mode: replace the matching user with an updated object
      setRegisteredUsers(prevUsers =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? {
                ...user,
                firstName: firstName.trim(),
                surname: surname.trim(),
                email: email.trim(),
                phoneNumber: phoneNumber.trim(),
                age: age.trim(),
              }
            : user
        )
      );

      setEditingUserId(null);
      clearForm();
    } else {
      // Add mode: create a new user object and append it
      const newUser: Registration = {
        id: Date.now().toString(),
        firstName: firstName.trim(),
        surname: surname.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        age: age.trim(),
      };

      setRegisteredUsers(prevUsers => [...prevUsers, newUser]);
      clearForm();
    }
  };

  const handleDelete = (id: string) => {
    setRegisteredUsers(prevUsers =>
      prevUsers.filter((user) => user.id !== id)
    );
  };

  const handleEdit = (user : Registration) => {
    setFirstName(user.firstName); 
    setSurname(user.surname); 
    setEmail(user.email); 
    setPhoneNumber(user.phoneNumber); 
    setAge(user.age); 
    
    setEditingUserId(user.id);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    clearForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingUserId !== null ? 'Edit Registration' : 'Registration'}
      </Text>
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

      <TouchableHighlight style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingUserId !== null ? 'Update' : 'Submit'}
        </Text>
      </TouchableHighlight>

      <Text style={styles.errMessage}>{errMsg}</Text>

      {editingUserId !== null && (
        <TouchableHighlight 
          style={styles.button} 
          onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
      )}

      <Text style={styles.title}>Users</Text>

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
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)}
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
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    height: 35,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#1976D2',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deleteButton: {
    flex: 1,
    height: 35,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#D32F2F',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});