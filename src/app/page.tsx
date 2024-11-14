"use client";

// import StatusBar from "./components/useDebugValue";
import DeferredSuspenseSearch from "./components/useDeferredValue";
import SuspenseSearch from "./components/useDeferredValue";
import { TestUseId } from "./components/useId";
import { Form } from "./components/useImperativeHandle";
import ToolBox from "./components/useLayoutEffect";
import Counter, { VideoPlayer } from "./components/useRef";
import TodosApp, {
  ConnectCheckContainer,
} from "./components/useSyncExternalStore";
import TabContainer from "./components/useTransition";

export default function Page() {
  return (
    <div className="h-[100rem]">
      {/* <div className="useOnlineStatus">
        <StatusBar />
      </div> */}
      <TodosApp />
      <TodosApp />
      {/* {<TestUseId />} */}
      {/* {<Form />} */}
      {/* <ToolBox /> */}
      {/* {<TabContainer />} */}
      {/* {<TodosApp />} */}
      {/* <ChatIndicator /> */}
      {<ConnectCheckContainer />}
      {/* <Counter /> */}
      {/* <VideoPlayer /> */}
      <SuspenseSearch />
      <DeferredSuspenseSearch />
      {/* <StatusBar/> */}
      <div>리액트 훅에 대해 공부합시다</div>
    </div>
  );
}
