import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, status, error, currentPage, hasMore } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers(1));
    }
  }, [status, dispatch]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom &&
      status !== 'loading' &&
      hasMore &&
      status === 'succeeded'
    ) {
      dispatch(fetchUsers(currentPage + 1));
    }
  };

  return (
    <View style={styles.container}>
      {status === 'loading' && items.length === 0 && (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Cargando usuarios...</Text>
        </View>
      )}

      {status === 'failed' && (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {status === 'succeeded' && items.length === 0 && (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>No hay usuarios</Text>
        </View>
      )}

      {items.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.listContent}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          {items.map((item, index) => (
            <View key={index} style={styles.userCard}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            </View>
          ))}

          {status === 'loading' && items.length > 0 && (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" color="#6200EE" />
              <Text style={styles.loadingMoreText}>Cargando más...</Text>
            </View>
          )}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateUser')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#B00020',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 15,
  },
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingMoreText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});

