import react, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';

/* CÓDIGO JS */
export default function App() {
  const [estado, setEstado] = react.useState('leitura');
  const [anotacao, setAnotacao] = react.useState('');

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('anotacao');
        if (value !== null) setAnotacao(value)
      } catch (error) {
        console.log(error, 'Error!');
      }
    })();
  }, [])

  async function setData() {
    try {
      await AsyncStorage.setItem('anotacao', anotacao);
      setEstado('leitura');
    } catch (error) {
      alert('Não foi possível salvar a edição.');
    }
    alert('Anotação salva.');
  }

  function atualizarTexto() {
    setEstado('leitura');
    setData();
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
        {(anotacao) ? (
          <View style={{ padding: 20 }}>
            <Text style={styles.anotacao}>
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
          style={anotacao === '' ? styles.btnAnotacao : styles.btnSalvar}
          onPress={() => setEstado('atualizando')}
        >
          {
            (anotacao === '') ? (
              <Text style={styles.btnAnotacaoTexto}>+</Text>
            ) : (
              <Text style={styles.btnAnotacaoTexto}>Editar</Text>
            )
          }
        </TouchableOpacity>
        <StatusBar style="auto" hidden />
      </View>
    );
  }

  else if (estado == 'atualizando') {
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
        <TextInput
          autoFocus={true}
          onChangeText={(text) => setAnotacao(text)}
          multiline={true}
          numberOfLines={5}
          value={anotacao}
          style={{
            padding: 8,
            marginBottom: 16,
            textAlignVertical: 'top'
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
        <Text>Atualizando...</Text>
        <StatusBar style="auto" hidden />
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