import React, { useState, useEffect } from 'react';
import './App.css';

// Define a type for your exercises
type Exercise = {
  name: string;
  duration: number; // Duration in seconds
};

// Special "exercise" for rest periods
const restPeriod: Exercise = { name: "Rest", duration: 5 };

// Example exercises array
const exercises: Exercise[] = [
  { name: "Plank", duration: 30 },
  { name: "Reverse crunch", duration: 30 },
  { name: "Push ups", duration: 30 },
  { name: "Push-ups", duration: 30 },
  { name: "Jumping Jacks", duration: 30 },
  // Add more exercises as needed
];

const App: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);

  // Function to select a random exercise
  const getRandomExercise = () => {
    let nextExercise = exercises[Math.floor(Math.random() * exercises.length)];
    // Ensure the next exercise is different when possible
    if (exercises.length > 1) {
      while (nextExercise.name === currentExercise?.name) {
        nextExercise = exercises[Math.floor(Math.random() * exercises.length)];
      }
    }
    return nextExercise;
  };

  // Set up a timer for the current exercise or rest period
  useEffect(() => {
    if (currentExercise) {
      // Set the timer for the current exercise's or rest period's duration
      setTimer(currentExercise.duration);

      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000); // Update timer every second

      // Cleanup interval on component unmount
      return () => clearInterval(countdown);
    }
  }, [currentExercise]);

  // Automatically move to the next exercise or rest period when the timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      if (isResting) {
        // After rest, select the next exercise
        setCurrentExercise(getRandomExercise());
        setIsResting(false);
      } else {
        // Rest before the next exercise
        setCurrentExercise(restPeriod);
        setIsResting(true);
      }
    }
  }, [timer, isResting]);

  return (
    <div className="App">
      <header className="App-header">
        {currentExercise && (
          <div>
            <p>Now doing: {currentExercise.name}</p>
            <p>Duration: {timer} seconds left</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
