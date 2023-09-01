import { useRef, useState } from "react";
import { useTimer } from "../../Utils/Time";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Dimension } from "../../Constants/Styles";
import ButtonPlay from "../../Components/ButtonPlay";
import Timer from "../../Components/Timer";
import ButtonRefresh from "../../Components/ButtonRefresh";
import EditButton from "../../Components/EditButton";
import Icon from "react-native-vector-icons/MaterialIcons";
interface ButtonPlayRef {
  changeTypeToPlay: () => void;
}

function Home() {
  const { formattedTime, startTimer, pauseTimer, resetTimer, incrementTime, decrementTime } = useTimer(8);
  const [isRunning, setIsRunning] = useState(false);
  const widthHome = isRunning ? {width: Dimension.WIDTH - 50} : null;
  const buttonPlayRef = useRef<ButtonPlayRef>(null);
  const [type, setType] = useState('');
  const color = 'white';

  const handlePlay = () => {
    setIsRunning(true);
    startTimer();
    setType('start');
  };

  const handlePause = () => {
    pauseTimer();
    setType('pause');
  }

  const handleRefresh = () => {
    resetTimer();

    if(buttonPlayRef.current)
      buttonPlayRef.current.changeTypeToPlay();

    setIsRunning(false);
    setType('restart');
  };

  // TO DO: Create counter before start.
  // TO DO: adapt component to restart after timeout.
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Icon name="settings" size={Dimension.WIDTH / 10} color={Colors.WHITE} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.timerComponent}>
          <Timer time={formattedTime} color={color} functionality={type} />
        </View>

        <View style={[styles.actionsButtons, widthHome]}>
          <ButtonPlay color={color} onPressPlay={handlePlay} onPressPause={handlePause} ref={buttonPlayRef} />

          {isRunning && <ButtonRefresh color={color} onPressRefresh={handleRefresh} /> }
        </View>
      </View>

      <EditButton onPressAdd={incrementTime} onPressRemove={decrementTime}  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.BACKGROUND_YELLOW
  },
  iconButton: {
    flex: 0.18,
    alignSelf: 'flex-start',
    margin: 8
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.92
  },
  timerComponent: {
    flex: 0.63
  },
  actionsButtons: {
    flexDirection: 'row',
    justifyContent:'space-between',
    flex: 0.38
  }
});

export default Home;
