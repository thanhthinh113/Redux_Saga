// src/components/DataView.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddUserModal from './AddUserModal';

const DataView = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
  }, [dispatch]);

  const handleEdit = (item) => {
    // Thực hiện các hành động để sửa item
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_ITEM_REQUEST', payload: id }); // Gửi yêu cầu xóa item
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or title"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <TouchableOpacity style={styles.addUserButton} onPress={openModal}>
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>Name: {item.name}</Text>
            <Text style={styles.itemTitle}>Title: {item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <AddUserModal visible={modalVisible} onClose={closeModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemTitle: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  addUserButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default DataView;
