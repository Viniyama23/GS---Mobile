import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function TempoInterrupcao({ navigation }) {
  const [tempo, setTempo] = useState('');
  const [tempos, setTempos] = useState([]);

  useEffect(() => {
    carregarTempos();
  }, []);

  const carregarTempos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tempos');
      if (jsonValue != null) {
        setTempos(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro ao carregar tempos');
    }
  };

  const salvarTempos = async (novosTempos) => {
    try {
      const jsonValue = JSON.stringify(novosTempos);
      await AsyncStorage.setItem('@tempos', jsonValue);
    } catch (e) {
      Alert.alert('Erro ao salvar tempos');
    }
  };

  const adicionarTempo = () => {
    if (!tempo.trim()) {
      Alert.alert('Informe o tempo de interrupção');
      return;
    }

    const novoTempo = {
      id: Date.now().toString(),
      duracao: tempo,
    };

    const novosTempos = [novoTempo, ...tempos];
    setTempos(novosTempos);
    salvarTempos(novosTempos);
    setTempo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Tempo de Interrupção</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 2 horas, 30 minutos"
        value={tempo}
        onChangeText={setTempo}
      />

      <Button title="Adicionar Tempo" onPress={adicionarTempo} />

      <FlatList
        data={tempos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.duracao}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />

      <Button
        title="Próxima: Prejuízos Causados"
        onPress={() => navigation.navigate('PrejuizosCausados')}
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
