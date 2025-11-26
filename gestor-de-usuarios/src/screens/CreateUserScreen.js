// src/screens/CreateUserScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/users/usersSlice';

export default function CreateUserScreen({ navigation }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.users);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const isLoading = status === 'loading';

  const handleCreate = async () => {
    // Validación
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !role.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      await dispatch(
        createUser({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          role: role.trim(),
        })
      ).unwrap();

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el nombre"
          value={firstName}
          onChangeText={setFirstName}
          editable={!isLoading}
        />

        <Text style={styles.label}>Apellido *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa el apellido"
          value={lastName}
          onChangeText={setLastName}
          editable={!isLoading}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <Text style={styles.label}>Rol/Puesto *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Desarrollador, Gerente, etc."
          value={role}
          onChangeText={setRole}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[
            styles.createButton,
            isLoading && styles.createButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.createButtonText}>
            {isLoading ? 'Creando...' : 'Crear'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  createButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

