import { useState, useEffect } from "react";

const useIdGenerate = (taskid) => {
  const [id, setId] = useState(0);
  useEffect(() => {
    const lastId = parseInt(localStorage.getItem("lastId"), 10);
    if (!isNaN(lastId)) {
      setId(lastId);
    }
  }, []);

  const generateId = () => {
    const newId = id + 1;
    setId(newId);
    return `${newId}`;
  };
  return generateId;
};
export default useIdGenerate;
