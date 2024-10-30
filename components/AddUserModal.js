// src/components/AddUserModal.js
import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddUserModal = ({ visible, onClose }) => {
  const [name, setName] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleAddUser = () => {
    // Thực hiện hành động thêm người dùng
    onClose(); // Đóng modal sau khi thêm
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Add User</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <Button title="Add" onPress={handleAddUser} />
        <Button title="Cancel" onPress={onClose} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
});

export default AddUserModal;
