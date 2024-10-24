"use client";

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
      {/* <TodoApp /> */}
      {/* {<TestUseId />} */}
      {/* {<Form />} */}
      {/* <ToolBox /> */}
      {/* {<TabContainer />} */}
      {/* {<TodosApp />} */}
      {/* <ChatIndicator /> */}
      {/* {<ConnectCheckContainer />} */}
      {/* <Counter /> */}
      {/* <VideoPlayer /> */}
      <SuspenseSearch />
      <DeferredSuspenseSearch />
      <div>리액트 훅에 대해 공부합시다</div>
    </div>
  );
}
