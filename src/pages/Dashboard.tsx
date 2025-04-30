import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Typography, Spin, message } from "antd";

import { fetchAcquisitions } from "../api/acquisitions";
import AcquisitionsChart from "../components/AcquisitionsChart";
import { RootState } from "../store";
import { setAcquisitions, setLoading, setError } from "../store/acquisitionsSlice";

const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.acquisitions);
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetchAcquisitions();
        dispatch(setAcquisitions(res));
      } catch {
        dispatch(setError("Failed to load acquisitions"));
        message.error("Failed to load acquisitions");
      }
    };

    loadData().then(() => {});
  }, [dispatch]);

  const totalSites = data.reduce((sum, a) => sum + a.ore_sites, 0);

  return (
    <div className="p-6">
      <Title level={2}>Welcome back, {userId} 👋</Title>

      {loading ? (
        <Spin />
      ) : (
        <>
          <Row gutter={16} className="mt-8">
            <Col span={8}>
              <Card title="Total Acquisitions">
                <Title level={3}>{data.length}</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Ore Sites">
                <Title level={3}>{totalSites}</Title>
              </Card>
            </Col>
          </Row>

          <Card title="Ore Sites Detected Over Time" className="mt-8">
            <AcquisitionsChart data={data} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
