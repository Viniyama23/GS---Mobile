import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function PrejuizosCausados({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [prejuizos, setPrejuizos] = useState([]);

  useEffect(() => {
    carregarPrejuizos();
  }, []);

  const carregarPrejuizos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@prejuizos');
      if (jsonValue != null) {
        setPrejuizos(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro ao carregar prejuízos');
    }
  };

  const salvarPrejuizos = async (novosPrejuizos) => {
    try {
      const jsonValue = JSON.stringify(novosPrejuizos);
      await AsyncStorage.setItem('@prejuizos', jsonValue);
    } catch (e) {
      Alert.alert('Erro ao salvar prejuízos');
    }
  };

  const adicionarPrejuizo = () => {
    if (!descricao.trim()) {
      Alert.alert('Descreva o prejuízo observado');
      return;
    }

    const novoPrejuizo = {
      id: Date.now().toString(),
      texto: descricao,
    };

    const novosPrejuizos = [novoPrejuizo, ...prejuizos];
    setPrejuizos(novosPrejuizos);
    salvarPrejuizos(novosPrejuizos);
    setDescricao('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Descrição de Prejuízos Causados</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: Comércio fechado, alimentos perdidos, etc."
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <Button title="Adicionar Prejuízo" onPress={adicionarPrejuizo} />

      <FlatList
        data={prejuizos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.texto}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />

      <Button
        title="Próxima: Recomendações"
        onPress={() => navigation.navigate('Recomendacoes')}
        color="#2196F3"
      />

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        color="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    minHeight: 60,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
