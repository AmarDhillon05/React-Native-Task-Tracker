import './global.css';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tasks from 'components/Tasks';
import AddTask from 'components/AddTask';
import { useState } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {

  //State to hold tasks
  const [tasks, setTasks] = useState([])
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
       
      <Stack.Screen 
          name="Tasks"
          children={(props) => <Tasks {...props} tasks={tasks} setTasks={setTasks} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddTask"
          children={(props) => <AddTask {...props} tasks={tasks} setTasks={setTasks} />}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
