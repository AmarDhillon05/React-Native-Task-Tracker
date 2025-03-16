import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default ({ tasks, setTasks, navigation }) => {
  // State to show description separately for Completed and Incomplete
  const [showDescr, setShowDescr] = useState({});

  useEffect(() => {
    // Initialize showDescr based on filtered tasks
    setShowDescr({
      Completed: tasks.filter((task) => task.completed).map(() => false),
      Incomplete: tasks.filter((task) => !task.completed).map(() => false),
    });
  }, [tasks]);

  // Category labels
  const categories = [
    { title: "Completed", filter: true },
    { title: "Incomplete", filter: false },
  ];

  return (
    <View className="bg-white p-6 flex">
      <Text className="text-2xl font-bold text-blue-600 mb-4">All Tasks</Text>

      {
        //Showing in case there's no tasks
        tasks.length == 0 && 
        <Text className = "italic text-blue-500 text-xl">You currently don't have any tasks, make some!</Text>
      }

      {tasks.length > 0 && (
        <View className="flex-row justify-between">
          {categories.map((category, categoryIdx) => {
            const filteredTasks = tasks.filter((task) => task.completed === category.filter);
            return (
              <View key={categoryIdx} className="flex-1 px-4">
                <Text className="text-4xl font-bold italic mb-4">{category.title}</Text>
                {filteredTasks.length === 0 && (
                  <Text className="text-blue-500 opacity-50 text-lg italic">
                    No tasks in this category
                  </Text>
                )}
                {filteredTasks.map((task, idx) => (
                  <View
                    key={idx}
                    className={`mb-4 border-b-4 border-blue-800 rounded-xl border-opacity-50 
                      transition-all duration-500 ease-in-out 
                      ${showDescr[category.title]?.[idx] ? "max-h-96 min-h-36 h-fit" : "max-h-36 h-36"} w-full`}
                  >
                    <View className="flex-row justify-between items-center">
                      <View className="mx-4 flex-col">
                        <Text className="font-bold text-blue-600 text-xl">{task.title}</Text>
                        <Text
                          className={`font-bold ${
                            new Date() > new Date(task.dueDate) && !task.completed
                              ? "text-red-500"
                              : "text-blue-500"
                          } text-md italic ${task.completed ? "opacity-25" : "opacity-100"}`}
                        >
                          Due {task.dueDate}
                        </Text>

                        <TouchableOpacity
                          onPress={() => {
                            // Toggle description visibility
                            setShowDescr((prev) => {
                              const newState = { ...prev };
                              newState[category.title] = [...prev[category.title]];
                              newState[category.title][idx] = !newState[category.title][idx];
                              return newState;
                            });
                          }}
                          className="italic text-md font-bold text-blue-500 opacity-25"
                        >
                          {showDescr[category.title]?.[idx] ? "Hide Description" : "Show Description"}
                        </TouchableOpacity>
                      </View>

                      <View className="flex-col">
                        <TouchableOpacity
                          className="bg-red-400 bg-opacity-25 p-2 border-red-600 text-red-600 border-t-2 border-l-2 italic text-md text-center h-12 w-28 my-2"
                          onPress={() => {
                            // Remove task
                            let newTasks = tasks.filter((_, taskIdx) => taskIdx !== idx);
                            setTasks(newTasks);

                            setShowDescr((prev) => {
                              const newState = { ...prev };
                              newState[category.title] = prev[category.title].filter((_, i) => i !== idx);
                              return newState;
                            });
                          }}
                        >
                          Remove Task
                        </TouchableOpacity>

                        {!task.completed && (
                          <TouchableOpacity
                            className="bg-blue-400 bg-opacity-25 p-2 border-blue-600 text-blue-600 border-t-2 border-l-2 italic text-sm text-center h-12 w-28 my-2"
                            onPress={() => {
                              // Mark task complete
                              let updatedTasks = tasks.map((t) =>
                                t === task ? { ...t, completed: true } : t
                              );
                              setTasks(updatedTasks);
                            }}
                          >
                            Mark Complete
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>

                    {showDescr[category.title]?.[idx] && (
                      <View className="mx-4">
                        <Text className="font-bold text-blue-500 italic text-lg">
                          Description:{" "}
                        </Text>
                        <Text className="text-lg">{task.description}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      )}

      <TouchableOpacity
        className="w-full py-3 bg-blue-600 rounded-xl items-center mt-6"
        onPress={() => {
          // Navigate to the Add Task screen
          navigation.navigate("AddTask");
        }}
      >
        <Text className="text-white font-bold">Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};
