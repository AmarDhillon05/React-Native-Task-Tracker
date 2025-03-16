import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Calendar } from "react-native-calendars";

export default ({ tasks, setTasks, navigation }) => {

  //States for keeping track of input values
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [descr, setDescr] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity className = "opacity-50 italic text-blue-600"
      onPress={() => {
        navigation.goBack()
      }}
      >Go back</TouchableOpacity>
      <Text className="text-2xl font-bold text-blue-600 mb-4">Add New Task</Text>

      <View className="mb-4">
        <Text className="font-bold italic text-blue-500">Task Title:</Text>
        <TextInput
          className="border border-blue-300 p-2 rounded mt-1"
          onChangeText={setTitle}
        />
      </View>

      <View className="mb-4">
        <Text className="font-bold italic text-blue-500 mb-2">Due Date: {dueDate}</Text>
        <TouchableOpacity
          className="bg-blue-500 p-2 rounded mb-2 items-center"
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Text className="text-white font-bold">{showCalendar ? "Hide Calendar" : "Pick a Date"}</Text>
        </TouchableOpacity>
        {showCalendar && (
          <Calendar
            onDayPress={(day) => {
              setDueDate(day.dateString);
              setShowCalendar(false);
            }}
            theme={{
              selectedDayBackgroundColor: "#3b82f6",
              todayTextColor: "#3b82f6",
              arrowColor: "#3b82f6",
            }}
          />
        )}
      </View>

      <View className="mb-4">
        <Text className="font-bold italic text-blue-500">Description:</Text>
        <TextInput
          className="border border-blue-300 p-2 rounded mt-1"
          onChangeText={setDescr}
          multiline
        />
      </View>

      <TouchableOpacity
        className="bg-blue-600 p-3 rounded-xl items-center"
        onPress={() => {
          //Updating state with the new task
          let new_task = { 'title' : title, 'dueDate' : dueDate, 'description' : descr, 'completed' : false };
          let tasks_copy = [...tasks]
          tasks_copy.push(new_task)
          setTasks(tasks_copy)

          //Going back to tasks
          navigation.navigate("Tasks");
        }}
      >
        <Text className="text-white font-bold">Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};
