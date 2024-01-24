import { useEffect, useReducer } from "react";

const choices = ["rock", "paper", "scissors"];

const initialState = {
  userPoints: 0,
  computerPoints: 0,
  turnResult: "Let's Play",
  userChoice: "",
  computerChoice: "",
  disabled: false,
  result: "Let's see who win ?",
  gameOver: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "play":
      return {
        ...state,
        userChoice: action.payload,
        computerChoice: choices[Math.floor(Math.random() * choices.length)],
      };
    case "userwin":
      return {
        ...state,
        userPoints: state.userPoints + 1,
        turnResult: "You get 1 point",
      };
    case "computerwin":
      return {
        ...state,
        computerPoints: state.computerPoints + 1,
        turnResult: "Computer get 1 point",
      };
    case "draw":
      return { ...state, turnResult: "Oops, It's a Tie" };
    case "winner":
      return {
        ...state,
        result: action.payload,
        disabled: true,
        gameOver: true,
      };
    case "playAgain":
      return {
        ...state,
        disabled: false,
        gameOver: false,
        userPoints: 0,
        computerPoints: 0,
        computerChoice: "",
        userChoice: "",
        turnResult: "Let's Play",
        result: "Let's see who win ?",
      };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    {
      userPoints,
      computerPoints,
      turnResult,
      computerChoice,
      userChoice,
      disabled,
      result,
      gameOver,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    if (userPoints === 5) {
      dispatch({ type: "winner", payload: "You Win !!!" });
    }
    if (computerPoints === 5) {
      dispatch({ type: "winner", payload: "You Win !!!" });
    }
  }, [userPoints, computerPoints]);

  useEffect(() => {
    const comboMove = userChoice + computerChoice;
    if (
      comboMove === "scissorspaper" ||
      comboMove === "rockscissors" ||
      comboMove === "paperrock"
    ) {
      dispatch({ type: "userwin" });
    }
    if (
      comboMove === "paperscissors" ||
      comboMove === "scissorsrock" ||
      comboMove === "rockpaper"
    ) {
      dispatch({ type: "computerwin" });
    }
    if (
      comboMove === "paperpaper" ||
      comboMove === "scissorsscissors" ||
      comboMove === "rockrock"
    ) {
      dispatch({ type: "draw" });
    }
  }, [userChoice, computerChoice]);

  return (
    <div className="App">
      <h1 className="heading">Rock-Paper-Scissors</h1>
      <div className="score">
        <h1>User Points:{userPoints}</h1>
        <h1>Computer Points:{computerPoints}</h1>
      </div>

      <div className="choice">
        <div className="choice-user">
          <img
            className="user-hand"
            src={`../images/${userChoice}.png`}
            alt=""
          ></img>
        </div>
        <div className="choice-computer">
          <img
            className="computer-hand"
            src={`../images/${computerChoice}.png`}
            alt=""
          ></img>
        </div>
      </div>

      <div className="button-div">
        {choices.map((choice, i) => (
          <button
            className="button"
            key={i}
            onClick={() => dispatch({ type: "play", payload: choice })}
            disabled={disabled}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="result">
        <h1>Turn Result: {turnResult}</h1>
        <h1>Final Result: {result}</h1>
      </div>

      <div className="button-div">
        {gameOver && (
          <button
            className="button"
            onClick={() => dispatch({ type: "playAgain" })}
          >
            Restart Game?
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
