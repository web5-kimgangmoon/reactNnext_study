//  useTransition은 UI를 차단하지 않고 상태를 업데이트할 수 있는 React Hook입니다.

// const [isPending, startTransition] = useTransition();

export function AboutTab() {
  return <p>Welcome to my profile!</p>;
}

export function ContactTab() {
  return (
    <>
      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}

import { memo, ReactNode, useState } from "react";

export const PostsTab = memo(function PostsTab() {
  // 한 번 로깅 합니다. 실제 속도 저하는 slowPost 컴포넌트 내부에 있습니다.
  console.log("[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />");

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
});

function SlowPost({ index }: { index: number }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // 항목당 1 ms 아무것도 하지 않음으로써 매우 느린 코드를 대리 실행합니다.
  }

  return <li className="item">Post #{index + 1}</li>;
}

import { useTransition } from "react";

export function TabButton({
  children,
  isActive,
  onClick,
}: {
  children: string | ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  if (isActive) {
    return <b>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
}

export default function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<string>("about");

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  if (isPending) return <div>대기중!</div>;
  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}

// 내가 이해한 내용
// useTransition은 기본적으로 실행속도와 메모리 절약을 위해 비동기 실행을 지향하는 리액트에서 동기 실행을 위한 hook이다.
// 마치 tanstack/reack-query에서 쓰는 동기식 통신처럼, isPending을 이용하여 다른 화면을 렌더링할 수 있다.
// useTransition은 useState보다 우선순위가 낮으며, useState들의 실행이 모두 종료된 이후에 실행된다. 그러므로 만약 위의 경우처럼 useTransition으로 1초 지연되는 setState를 실행시키고,
// 지연이 없는 setState 실행하면 useTransition의 작업은 중단된다.
