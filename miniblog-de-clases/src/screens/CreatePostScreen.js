// src/screens/CreatePostScreen.js
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
import { addPost } from '../features/posts/postsSlice';

export default function CreatePostScreen({ navigation }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.posts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const isLoading = status === 'loading';

  const handlePublish = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      await dispatch(
        addPost({
          title: title.trim(),
          body: body.trim(),
          userId: 1,
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
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa el título del post"
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
          />

          <Text style={styles.label}>Contenido *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe el contenido del post"
            value={body}
            onChangeText={setBody}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            editable={!isLoading}
          />

          <TouchableOpacity
            style={[
              styles.publishButton,
              isLoading && styles.publishButtonDisabled,
            ]}
            onPress={handlePublish}
            disabled={isLoading}
          >
            <Text style={styles.publishButtonText}>
              {isLoading ? 'Publicando...' : 'Publicar'}
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
  textArea: {
    height: 150,
    paddingTop: 15,
  },
  publishButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  publishButtonDisabled: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

