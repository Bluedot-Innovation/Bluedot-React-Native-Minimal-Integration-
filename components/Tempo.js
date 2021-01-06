import React, { Fragment, useState, useEffect } from "react";
import BluedotPointSdk from "@bluedot-innovation/bluedot-react-native";
import { Text, View, Button, TextInput } from "react-native";
import { useHistory } from "react-router-native"
import styles from "../styles";

export default function Tempo({ hasStarted }) {
  const [destinationId, setDestinationId] = useState("");
  const [isTempoRunning, setIsTempoRunning] = useState(false)
  const history = useHistory()

  useEffect(() => {
    BluedotPointSdk.isTempoRunning().then(setIsTempoRunning)
  }, [])

  function handleStartTempo() {
    function onStartTempoSuccess() {
        console.log('Tempo has started successfuly')
        BluedotPointSdk.isTempoRunning().then(setIsTempoRunning)
      }
    
      function onStartTempoFailed(error) {
        console.error('Error starting Tempo: ', error);
      }

      BluedotPointSdk.startTempoTrackingWithCallbacks(
        destinationId.trim(),
        onStartTempoSuccess,
        onStartTempoFailed
      )
  }

  function handleStopTempo() {
    function onStopTempoSuccess() {
        console.log('Tempo has stopped successfuly')
        BluedotPointSdk.isTempoRunning().then(setIsTempoRunning)
      }
    
      function onStopTempoFailed(error) {
        console.error('Error Stopping Tempo: ', error);
      }

      BluedotPointSdk.stopTempoTrackingWithCallbacks(
        onStopTempoSuccess,
        onStopTempoFailed
      )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Tempo</Text>
      <View style={styles.tempoWrapper}>
        {hasStarted ? (
          <Text>Destination ID: {destinationId}</Text>
        ) : (
          <Fragment>
            <Text style={styles.eventTitle}>Destination ID:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setDestinationId}
              value={destinationId}
              placeholder="Destination ID"
              editable={!isTempoRunning}
            />
          </Fragment>
        )}
        { isTempoRunning ? (
          <Button
            title="Stop Tempo"
            onPress={handleStopTempo}
          />
        ) : (
          <Button
            title="Start Tempo"
            onPress={handleStartTempo}
          />
        )}
        <Button title="Back" onPress={() => history.push('/main')}/>
      </View>
    </View>
  );
}
