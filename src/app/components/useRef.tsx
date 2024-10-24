// useRef는 렌더링에 필요하지 않은 값을 참조할 수 있는 React Hook입니다.

// 팁: ref를 변경해도 리렌더링을 촉발하지 않습니다.

import { useRef, useState } from "react";

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current += 1;
    alert("You clicked " + ref.current + " times!");
  }

  return <button onClick={handleClick}>Click me!</button>;
}

// 렌더링 중에는 ref.current를 쓰거나 읽지 마세요.
// React는 컴포넌트의 본문이 순수 함수처럼 동작하기를 기대합니다:
//   - 입력값들(props, state, context)이  동일하면 완전히 동일한  JSX를 반환해야 합니다.
//   - 다른 순서나 다른 인수를 사용하여 호출해도 다른 호출의 결과에 영향을 미치지 않아야 합니다.

// 렌더링 중에 ref를 읽거나 쓰면 이러한 기대가 깨집니다.

// function MyComponent(){
//
// // 렌더링 중에 ref를 쓰지 마세요.
// myRef.current = 123;
// ...
// // 렌더링 중에  ref를 읽지 마세요
// return <h1>{myOtherRef.current}</h1>
// }

// 대신 이벤트 핸들러나 Effect에서 ref를 읽거나 쓸 수 있습니다.

// function MyComponent(){
//     // ...
//     useEffect(() => {
//         // 당신은 effects 안에서 ref들을 쓰거나 읽을 수 있습니다.
//         myRef.current = 123;
//     });
//     // ...
//     function handleClick(){
//         // 이벤트 핸들러  안에서 ref들을 쓰거나 읽을 수 있습니다.
//         doSomething(myOtherRef.current);
//     }
//     // ...
// }

// 렌더링 중에 무언가를 읽거나 써야만 하는 경우, 대신 state를 사용하세요.

// 컴포넌트는 이러한 규칙을 어기더라도 여전히 작동할 수도 있지만, React에 추가되는 대부분의 새로운 기능들은 이러한 기대에 의존합니다.

// ref로 DOM 조작하기

// ref를 사용하여 DOM을 조작하는 것은 특히 일반적입니다. React에는 이를 위한 기본 지원잉 ㅣㅆ습니다.

export function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  );
}

export function CatFriends() {
  const listRef = useRef(null);
}

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);

    if (nextIsPlaying) {
      ref.current?.play();
    } else {
      ref.current?.pause();
    }
  }

  return (
    <>
      <button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</button>
      <video
        width="250"
        ref={ref}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}

// function Video(){
//     const playerRef = useRef(null);

//     function getPlayer(){
//         if(playerRef.current !== null){
//             return playerRef.current;
//         }
//         const player = new VideoPlayer();
//         playerRef.current = player;
//         return player;
//     }
// }

// 내가 이해한 내용,  chatGPT 답변
// ref의 값은 변경해도 리렌더링이 없기 때문에, 리렌더링을 원치 않은 경우 유용하다.
// 게다가 useState처럼  setter와 getter 패턴을 쓰지 않기 때문에 외부 API나 라이브러리를 활용할 때도 유용하다.
// 렌더링 중에 ref를 쓰거나 읽지 말자.
// ref 상위 컴포넌트에 노출되지 않으므로, 매개변수(props)에 ref를 추가해주자.
// ref는 초기에 ref값을 한 번 저장하고  다음 렌더링부터는 무시하지만, 호출은 지속적으로 이루어지므로(ref에 값을 저장하기 위해 객체나 값을 생성하는 경우) 이를  피하기 위해
