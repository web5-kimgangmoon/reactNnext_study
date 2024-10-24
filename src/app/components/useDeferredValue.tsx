// useDeferredValue는 UI 일부 업데이트를 지연시킬 수 있는 React Hook입니다.

export function SearchResults({ query }: { query: string }) {
  return (
    <div>
      <b>실행결과 출력합니다!</b>
      <span>{query}</span>
    </div>
  );
}

import { Suspense, useDeferredValue, useEffect, useState } from "react";

export function SuspenseSearch() {
  const [query, setQuery] = useState("");
  return (
    <>
      <label>
        Search albums:
        <input
          value={query}
          onChange={(e) => {
            const now = performance.now();
            while (performance.now() - now < 1000) {
              console.log("아아아");
            }
            // const now = performance.now();
            // while (now < performance.now() + 50) {}
            setQuery(e.target.value);
            // const s = setTimeout(() => {
            //   setQuery(e.target.value);
            //   clearTimeout(s);
            // }, 50);
          }}
        />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={query} />
      </Suspense>
    </>
  );
}

export default function DeferredSuspenseSearch() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}

// 내가 이해한 내용
// 이 방식의 한계는 결국 이전 결과를 띄워주지 않고, loading 컴포넌트를 렌더링해준다는 점이다.
// 이 경우, 새로운 검색을 하기 전에, 이전의 결과를 보여주길 원한다면 좋지 않은 방식이다.
