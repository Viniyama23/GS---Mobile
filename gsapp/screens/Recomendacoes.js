import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default function Recomendacoes({ navigation }) {
  const orientacoes = [
    "Mantenha lanternas e baterias sempre carregadas.",
    "Evite abrir a geladeira ou freezer para conservar alimentos.",
    "Desligue equipamentos elétricos para evitar danos quando a energia voltar.",
    "Tenha um kit de emergência com água, alimentos não perecíveis e medicamentos.",
    "Informe imediatamente as autoridades sobre cabos caídos ou situações perigosas.",
    "Em caso de enchentes, evite contato com a rede elétrica.",
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Recomendações e Boas Práticas</Text>

      {orientacoes.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text>{index + 1}. {item}</Text>
        </View>
      ))}

      <Button
        title="Voltar"
        onPress={() => navigation.goBack()}
        color="#888"
      />

      <Button
        title="Voltar ao Início"
        onPress={() => navigation.navigate('PanoramaGeral')}
        color="#2196F3"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
});
