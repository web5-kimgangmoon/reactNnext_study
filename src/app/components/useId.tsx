import { useId } from "react";

// function PasswordField() {
//   const passwordHintId = useId();
//   return (
//     <>
//       <label>
//         Password:
//         <input type="password" aria-describedby={passwordHintId} />
//       </label>
//       <p id={passwordHintId}>
//         The password should contain at least 18 characters
//       </p>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <>
//       <h2>Choose password</h2>
//       <PasswordField />
//       <h2>Confirm password</h2>
//       <PasswordField />
//     </>
//   );
// }

// export default function Form() {
//   const id = useId();
//   return (
//     <form>
//       <label htmlFor={id + "-firstName"}>First Name:</label>
//       <input id={id + "-firstName"} type="text" />
//       <hr />
//       <label htmlFor={id + "-lastName"}>Last Name:</label>
//       <input id={id + "-lastName"} type="text" />
//     </form>
//   );
// }

// import { renderToPipeableStream } from "react-dom/server";
// import App from "next/app";

// const { pipe } = renderToPipeableStream(<App />, {
//   identifierPrefix: "react-app1",
// });

export const TestUseId = () => {
  const a = useId();
  return (
    <>
      <label htmlFor={a}>화살</label>
      <input id={a} />
    </>
  );
};

// 개인적으로 이해한 내용
// useId는 그냥 매번 중복되지 않도록 새로운 ID를 생성해준다.
