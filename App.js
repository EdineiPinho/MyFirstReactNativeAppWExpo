import react, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* CÓDIGO JS */
export default function App() {
  const [estado, setEstado] = react.useState('leitura');
  const [anotacao, setAnotacao] = react.useState('');

  useEffect(() => {
    (
      async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if (value !== null) {
            setAnotacao(value);
          }
        } catch (e) {
        }
      }
    )();
  }, [])

  const setData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', anotacao)
      setEstado('leitura');
    } catch (e) {
      console.error(error, 'Algo deu errado ao ler o histórico.')
    }
  }

  function atualizarTexto() {
    setData();
  }

  function handlePress() {
    setEstado('atualizando');
  }

  /* RENDERIZAÇÃO */
  if (estado == 'leitura') {
    return (
      <View style={{ width: '100%', flex: 1 }}>
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18
          }}>
            Aplicativo Anotação
          </Text>
        </View>
        <Text style={{ marginTop: 8, marginLeft: 8 }}>Sua anotação: </Text>
        {(anotacao !== '') ? (
          <View style={{ padding: 20 }}>
            <Text style={{ ...styles.anotacao, opacity: 0.7 }}>
              {anotacao}
            </Text>
          </View>
        ) : (
          <View style={{ padding: 20 }}>
            <Text style={{ ...styles.anotacao, opacity: 0.3 }}>
              Nenhuma anotação até o momento.
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.btnAnotacao}
          onPress={handlePress}
        >
          <Text style={styles.btnAnotacaoTexto}>+</Text>
        </TouchableOpacity>
        <StatusBar style="auto" hidden />
      </View>
    );
  }

  if (estado === 'atualizando') {
    return (
      <View style={{ width: '100%', flex: 1 }}>
        <View style={styles.header}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18
          }}>
            Aplicativo Anotação
          </Text>
        </View>
        <Text style={{ marginTop: 8, marginLeft: 8 }}>Em edição: </Text>
        <TextInput
          autoFocus={true}
          onChangeText={(text) => setAnotacao(text)}
          multiline={true}
          numberOfLines={5}
          value={anotacao}
          style={{
            padding: 8,
            marginBottom: 16,
            margin: 8,
            textAlignVertical: 'top',
            borderWidth: 1,
            borderColor: '#ccc'
          }}
        >
        </TextInput>
        <TouchableOpacity
          style={styles.btnSalvar}
          onPress={() => atualizarTexto()}
        >
          <Text style={styles.btnAnotacaoTexto}>
            Salvar
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" hidden />
      </View >
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