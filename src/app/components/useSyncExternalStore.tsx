// useSyncExternalStore는 외부 store를 구독할 수 있는 React Hook입니다.

// 비권장 사항
// const LazyProductDetailPage = lazy(() => import('./ProductDetailPage.js'));

// function ShoppingApp() {
//   const selectedProductId = useSyncExternalStore(...);

//   // ❌ `selectedProductId`에 종속된 Promise로 `use`를 호출하는 것
//   const data = use(fetchItem(selectedProductId))

//   // ❌ `selectedProductId`를 기반으로 지연 컴포넌트를 조건부로 렌더링하는 것
//   return selectedProductId != null ? <LazyProductDetailPage /> : <FeaturedProducts />;
// }

// 이것은 third-party store의 예시입니다.
// 해당 store를 사용하는 경우 React와 통합할 필요가 있을 수 있습니다.

// 앱이 React로 완전히 빌드된 경우,
// React State를 사용하는 것을 추천드립니다.

type Listener = () => void;

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: Listener[] = [];

export const todoStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
    emitChange();
  },
  subscribe(listener: Listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  },
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

import { useSyncExternalStore } from "react";

export default function TodosApp() {
  const todos = useSyncExternalStore(
    todoStore.subscribe,
    todoStore.getSnapshot
  );
  return (
    <>
      <button onClick={() => todoStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

// 추가적인 코드

// export function ChatIndicator() {
//   const isOnline = useSyncExternalStore(subscribe, getSnapshot);
//   //   subscribe(() => console.log("접속중?"));
//   return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
// }

// function getSnapshot() {
//   return navigator.onLine;
// }

// function subscribe(callback: () => void) {
//   window.addEventListener("online", callback); // 네트워크 접속이 가능한 경우, 네트워크에 처음 접근할 때의 이벤트
//   window.addEventListener("offline", callback); // 네트워크 접속이 불가능한 경우, 네트워크에 처음 접근할 때의 이벤트
//   return () => {
//     window.removeEventListener("online", callback);
//     window.removeEventListener("offline", callback);
//   };
// }

// 추가적인 코드2

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "✅ Online" : "❌ Disconnected"}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log("✅ Progress saved");
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? "Save  progress" : "Reconnecting..."}
    </button>
  );
}

export function ConnectCheckContainer() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}

// 내가 이해한 내용, chatGPT 답변
// 외부 저장소와 원활히 소통하기 위한 옵저버 패턴의 useState다.
// 옵저버 패턴은 객체의 확장과 유연성이 중요할 경우 유용하다.
// 옵저버 패턴 구현을 위해 이용할 수 있다. 단, 그 경우 용도를 명확히 하도록
// 커스텀 훅으로 이용하거나 주석이나 문서를 명확히 작성해주자.
