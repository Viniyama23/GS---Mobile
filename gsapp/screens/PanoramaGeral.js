import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function PanoramaGeral({ navigation }) {
  const [eventos, setEventos] = useState([]);

  // Carregar eventos armazenados ao iniciar
  useEffect(() => {
    carregarEventos();
  }, []);

  const carregarEventos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@eventos');
      if (jsonValue != null) {
        setEventos(JSON.parse(jsonValue));
      }
    } catch (e) {
      Alert.alert('Erro ao carregar eventos');
    }
  };

  const salvarEventos = async (novosEventos) => {
    try {
      const jsonValue = JSON.stringify(novosEventos);
      await AsyncStorage.setItem('@eventos', jsonValue);
    } catch (e) {
      Alert.alert('Erro ao salvar eventos');
    }
  };

  const adicionarEvento = () => {
    const novoEvento = {
      id: Date.now().toString(),
      data: new Date().toLocaleString(),
      duracao: `${Math.floor(Math.random() * 3) + 1} horas`,
    };
    const novosEventos = [novoEvento, ...eventos];
    setEventos(novosEventos);
    salvarEventos(novosEventos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo de Faltas de Energia</Text>

      <Button title="Registrar Falta de Energia" onPress={adicionarEvento} />

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.evento}>
            <Text style={styles.data}>Data: {item.data}</Text>
            <Text>Duração: {item.duracao}</Text>
          </View>
        )}
        style={{ marginTop: 20 }}
      />

      <Button
        title="Ir para Localização Atingida"
        onPress={() => navigation.navigate('LocalizacaoAtingida')}
        color="#2196F3"
      />

      <StatusBar style="auto" />
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
  evento: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  data: {
    fontWeight: 'bold',
  },
});
