import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Persona {
  nombre: string;
  edad: string;
}

const Personas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [personaMayor, setPersonaMayor] = useState<Persona | undefined>(undefined);

  const agregarPersona = () => {
    if (nombre && edad) {
      const nuevaPersona: Persona = { nombre, edad };
      setPersonas([...personas, nuevaPersona]);

      if (!personaMayor || parseInt(nuevaPersona.edad) > parseInt(personaMayor.edad)) {
        setPersonaMayor(nuevaPersona);
      }

      setNombre('');
      setEdad('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personas</Text>
      <FlatList
        data={personas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.nombre} ({item.edad} años)</Text>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={edad}
          onChangeText={(text) => setEdad(text)}
        />
        <Button title="Agregar Persona" onPress={agregarPersona} />
      </View>

      <Text style={styles.mayorPersona}>
        Persona más mayor: {personaMayor ? `${personaMayor.nombre} (${personaMayor.edad} años)` : ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  mayorPersona: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Personas;
