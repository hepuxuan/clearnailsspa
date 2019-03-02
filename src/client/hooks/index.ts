import * as React from "react";

function useDataFetch<T>(
  func: (...params: any) => Promise<T>
): [T | null, (...params: any) => void] {
  const [data, setData] = React.useState(null);
  const fetchData = (...params: any) => {
    func.apply(this, params).then(data => {
      setData(data);
    });
  };

  return [data, fetchData];
}

export { useDataFetch };
