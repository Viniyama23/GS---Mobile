import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function LocalizacaoAtingida({ navigation }) {
  const [local, setLocal] = useState('');
  const [locais, setLocais] = useState([]);

  useEffect(() => {
    carregarLocais();
  }, []);

  const carregarLocais = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@locais');
      if (jsonValue != null) {
        setLocais(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro ao carregar locais');
    }
  };

  const salvarLocais = async (novosLocais) => {
    try {
      const jsonValue = JSON.stringify(novosLocais);
      await AsyncStorage.setItem('@locais', jsonValue);
    } catch (e) {
      Alert.alert('Erro ao salvar locais');
    }
  };

  const adicionarLocal = () => {
    if (!local.trim()) {
      Alert.alert('Informe um bairro, cidade ou CEP');
      return;
    }

    const novoLocal = {
      id: Date.now().toString(),
      nome: local,
    };

    const novosLocais = [novoLocal, ...locais];
    setLocais(novosLocais);
    salvarLocais(novosLocais);
    setLocal('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Localização Atingida</Text>

      <TextInput
        style={styles.input}
        placeholder="Bairro, cidade ou CEP"
        value={local}
        onChangeText={setLocal}
      />

      <Button title="Adicionar Local" onPress={adicionarLocal} />

      <FlatList
        data={locais}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />

      <Button
        title="Próxima: Tempo de Interrupção"
        onPress={() => navigation.navigate('TempoInterrupcao')}
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
    marginBottom: 10,
    borderRadius: 8,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
