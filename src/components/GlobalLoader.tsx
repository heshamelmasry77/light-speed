import { Spin } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const GlobalLoader = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoader;
