import React, { useState } from "react";
import ContactItem from "../components/ContactItem";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newName, setNewName] = useState(""); // Nome do contato
  const [newPhone, setNewPhone] = useState(""); // Telefone do contato
  const [newCategory, setNewCategory] = useState(""); // Categoria do contato
  const [editIndex, setEditIndex] = useState(null); // Índice do contato em edição

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newName || !newPhone || !newCategory) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }

    const updatedContacts = [...contacts];

    if (editIndex === null) {
      // Adiciona um novo contato
      updatedContacts.push({ name: newName, phone: newPhone, category: newCategory });
    } else {
      // Edita um contato existente
      updatedContacts[editIndex] = { name: newName, phone: newPhone, category: newCategory };
      setEditIndex(null); // Limpa o índice de edição
    }

    setContacts(updatedContacts); // Atualiza a lista de contatos
    setNewName(""); // Limpa o campo de nome
    setNewPhone(""); // Limpa o campo de telefone
    setNewCategory(""); // Limpa o campo de categoria
    setModalVisible(false); // Fecha o modal
  }

  // Função para confirmar exclusão de contato
  function confirmDelete(index) {
    Alert.alert("Excluir contato?", `Deseja remover "${contacts[index].name}"?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const updatedContacts = [...contacts];
          updatedContacts.splice(index, 1); // Remove o contato
          setContacts(updatedContacts); // Atualiza a lista de contatos
        },
      },
    ]);
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    const contact = contacts[index];
    setNewName(contact.name); // Carrega o nome do contato
    setNewPhone(contact.phone); // Carrega o telefone do contato
    setNewCategory(contact.category); // Carrega a categoria do contato
    setEditIndex(index); // Define o índice do contato a ser editado
    setModalVisible(true); // Abre o modal
  }

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <Pressable
        onPress={() => {
          setNewName("");
          setNewPhone("");
          setNewCategory("");
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Contato</Text>
      </Pressable>

      {/* Lista de contatos */}
      <FlatList
  data={contacts}
  keyExtractor={(_, i) => String(i)} // Identificador único para cada item
  renderItem={({ item, index }) => (
    <ContactItem
      contact={item} // Passa o contato atual
      index={index} // Passa o índice do contato
      onEdit={(i) => openEditModal(i)} // Função para editar o contato
      onDelete={(i) => {
        const updatedContacts = [...contacts];
        updatedContacts.splice(i, 1); // Remove o contato
        setContacts(updatedContacts); // Atualiza a lista de contatos
      }} // Função para excluir o contato
    />
  )}
  ListEmptyComponent={
    <Text style={styles.emptyText}>Nenhum contato ainda!</Text>
  }
/>

      {/* Modal para adicionar ou editar contato */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null
                ? "Adicione seu contato:"
                : "Edite o contato:"}
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Nome do contato"
              style={styles.input}
            />
            <TextInput
              value={newPhone}
              onChangeText={setNewPhone}
              placeholder="Telefone do contato"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <TextInput
              value={newCategory}
              onChangeText={setNewCategory}
              placeholder="Categoria (trabalho/pessoal/família)"
              style={styles.input}
            />
            <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
              <Text style={{ color: "#6200ee", textAlign: "center" }}>
                {editIndex === null ? "Adicionar" : "Salvar alterações"}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: "#999", textAlign: "center" }}>
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#e30613",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  contactItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
  },
  contactItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactItemDetails: {
    fontSize: 14,
    color: "#666",
  },
  contactButtons: {
    flexDirection: "row",
  },
  contactButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: "#ffca28",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: "#666",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});