import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Spin, Card } from "antd";

import { fetchAcquisitions } from "../api/acquisitions";
import { setAcquisitions, setLoading, setError } from "../store/acquisitionsSlice";
import { RootState } from "../store";
import WeeklySitesChart from "../components/WeeklySitesChart";
import SiteDistributionChart from "../components/SiteDistributionChart";
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
          <Card title="Weekly Average Sites" className="mb-6">
            <WeeklySitesChart data={data} />
          </Card>

          <Card title="Ore Site Distribution" className="mb-6">
            <SiteDistributionChart data={data} />
          </Card>
        </>
      )}
    </div>
  );
};

export default AcquisitionsPage;
