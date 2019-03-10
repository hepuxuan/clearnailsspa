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

function useModalState(): [boolean, () => void, () => void] {
  const [isOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return [isOpen, openModal, closeModal];
}

export { useDataFetch, useModalState };
