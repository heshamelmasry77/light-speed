import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Spin, Card } from "antd";

import { fetchAcquisitions } from "../api/acquisitions";
import { setAcquisitions, setLoading, setError } from "../store/acquisitionsSlice";
import { RootState } from "../store";
import WeeklySitesChart from "../components/charts/WeeklySitesChart";
import SiteDistributionChart from "../components/charts/SiteDistributionChart";
import { hideLoader, showLoader } from "../store/loadingSlice.ts";

const { Title } = Typography;

const AcquisitionsPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.acquisitions);

  useEffect(() => {
    const loadData = async () => {
      dispatch(showLoader());
      dispatch(setLoading(true));
      try {
        const res = await fetchAcquisitions();
        dispatch(setAcquisitions(res));
      } catch {
        dispatch(setError("Failed to load acquisitions"));
      } finally {
        dispatch(hideLoader());
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="p-6">
      <Title level={2}>📊 Acquisitions Analytics</Title>

      {loading ? (
        <Spin />
      ) : (
        <>
          <div className="mb-6">
            <Card title="Weekly Average Sites">
              <WeeklySitesChart data={data} />
            </Card>
          </div>
          <div className="my-6">
            <Card title="Ore Site Distribution">
              <SiteDistributionChart data={data} />
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AcquisitionsPage;
