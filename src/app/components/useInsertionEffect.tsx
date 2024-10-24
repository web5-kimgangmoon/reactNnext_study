// useInsertionEffect는 CSS-in-JS 라이브러리 작성자를 위한 것입니다. CSS-in-JS 라이브러리 작업 중에 스타일을 주입할 위치가 필요한 것이 아니라면, useEffect 또는 useLayoutEffect를 사용하세요

// useInsertionEffect는 layout Effects 가 실행되기 전에 전체 요소를 DOM 에 주입 할 수 있습니다.

import { useInsertionEffect } from "react";

function useCSS(rule: string) {
  useInsertionEffect(() => {
    // <style> 태그를 여기에서 주입하세요...
  });
  return rule;
}

//  CSS-in-JS 라이브러리 안에서
// let isInserted = new Set();
// function useCSS(rule: string) {
//   useInsertionEffect(() => {
//     // 앞서 설명했듯이 <style> 태그의 런타임 주입은  권장하지 않습니다.
//     // 하지만 꼭 주입해야 한다면 useInsertionEffect에서 주입하는 것이 중요합니다.
//     if (!isInserted.has(rule)) {
//       isInserted.add(rule);
//     }
//   });
//   return rule;
// }

// function Button() {
//   const className = useCSS("...");
//   return <div className={className} />;
// }

// chatGPG 예시
// const MyComponent = () => {
//   useInsertionEffect(() => {
//     const style = document.createElement("style");
//     style.textContent = `
//         .myClass {
//             color: red;
//             font-weight: bold;
//         }
//         `;
//     document.head.appendChild(style);

//     // 정리 함수
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   return <div className="myClass">Hello, World</div>;
// };

// export default MyComponent;
