import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import react from 'react';

export default function App() {
  const [estado, setEstado] = react.useState('leitura');
  const [anotacao, setAnotacao] = react.useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, a commodi voluptas vel error, dolorum ratione natus, totam et est placeat optio? Laudantium tempora sequi sit optio omnis adipisci blanditiis.');

  function handlePress() {

  }

  if (estado == 'leitura') {
    return (
      <View style={{ width: '100%' }}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18
          }}>
            Aplicativo Anotação
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={styles.anotacao}>
            {anotacao}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnAnotacao}
          onPress={() => setEstado('atualizando')}
        >
          <Text style={styles.btnAnotacaoTexto}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }

  else if (estado == 'atualizando') {
    return (
      <View style={{ width: '100%' }}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18
          }}>
            Aplicativo Anotação
          </Text>
        </View>
        <Text>Atualizando...</Text>
        <TouchableOpacity
          style={styles.btnSalvar}
          onPress={() => setEstado('leitura')}
        >
          <Text style={styles.btnAnotacaoTexto}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },
  anotacao: {
    fontSize: 13
  },
  btnAnotacao: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },
  btnAnotacaoTexto: {
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30
  },
  btnSalvar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#069',
  },
});